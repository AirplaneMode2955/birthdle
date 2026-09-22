const COLOR_ORDER = ['yellow','green','blue','purple'];
const COLOR_EMOJI = { yellow:'🟨', green:'🟩', blue:'🟦', purple:'🟪' };

const CATEGORIES = [
  { color:'yellow', name:'\ud83d\ude97 Car Insurance', bank: [
    'A Fender Bender','A Flat Tire on the Highway','Your Car Gets Stolen','A Cracked Windshield',
    'Hitting a Deer','A Hit-and-Run','A Speeding Ticket','Your Car Gets Towed',
    'A Rental Car After an Accident','Hail Damage to Your Car','Backing Into a Mailbox','Running Out of Gas on the Freeway'
  ]},
  { color:'green', name:'\ud83c\udfe0 Home Insurance', bank: [
    'A House Fire','A Burst Pipe','A Break-In','A Fallen Tree on Your Roof',
    'A Leaky Roof','Your Neighbor\u2019s Kid Gets Hurt in Your Yard','A Broken Window','A Flooded Basement',
    'Your Dog Bites a Guest','A Stolen Bike From Your Garage','Storm Damage to Your Fence','A Kitchen Fire'
  ]},
  { color:'blue', name:'\u2764\ufe0f Health Insurance', bank: [
    'A Doctor\u2019s Visit','A Broken Arm','A Hospital Stay','A Prescription',
    'Getting Stitches','An Annual Checkup','An X-Ray','A Surgery',
    'An Emergency Room Visit','A Flu Shot','Physical Therapy','A Blood Test'
  ]},
  { color:'purple', name:'\ud83d\udc6a Life Insurance', bank: [
    'Paying Off the Mortgage','Covering Funeral Costs','Replacing Lost Income for Your Family','Leaving Money to Your Kids',
    'Paying Off Debt After You\u2019re Gone','Supporting a Spouse Who Doesn\u2019t Work','A Business Partner Buyout','Paying for College Later',
    'A Death Benefit Payout','Naming a Beneficiary','Continuing Your Family\u2019s Lifestyle','Covering Final Medical Bills'
  ]}
];

const MAX_MISTAKES = 4;

function hashStr(str){
  let h = 0;
  for (let i=0;i<str.length;i++){ h = (h*31 + str.charCodeAt(i)) >>> 0; }
  return h;
}
function todayKey(){
  const d = new Date();
  return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
}
function puzzleNumber(){
  const epoch = new Date(2026,8,15);
  const now = new Date();
  const diffDays = Math.floor((new Date(now.getFullYear(),now.getMonth(),now.getDate()) - epoch) / 86400000);
  return Math.max(1, diffDays + 1);
}

// Deterministic per-category shuffle so everyone gets the same 4-of-12
// picks on a given day, without repeating the same 16 tiles every day.
function seededPick4(bank, seedStr){
  let seed = hashStr(seedStr);
  function rand(){ seed = (seed * 1103515245 + 12345) >>> 0; return seed / 4294967296; }
  const arr = bank.slice();
  for (let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, 4);
}

const puzzle = {
  title: 'Sort the Situation',
  groups: CATEGORIES.map(cat => ({
    color: cat.color,
    name: cat.name,
    items: seededPick4(cat.bank, 'conn-' + todayKey() + '-' + cat.color)
  }))
};
const canon = [];
puzzle.groups.forEach((g, gi) => g.items.forEach(name => canon.push({ name, groupIdx: gi })));

const stateKey = 'ticconn_state_' + todayKey();
const statsKey = 'ticconn_stats';

function shuffle(arr){
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function freshState(){
  return {
    order: shuffle(canon.map((_, i) => i)),
    solvedGroupIdxs: [],
    revealedGroupIdxs: [],
    mistakes: 0,
    guessHistory: [],
    guessedSets: [],
    finished: false,
    won: false
  };
}

let state = JSON.parse(localStorage.getItem(stateKey) || 'null') || freshState();
let selected = new Set();

function saveState(){ localStorage.setItem(stateKey, JSON.stringify(state)); }
function loadStats(){
  return JSON.parse(localStorage.getItem(statsKey) || 'null') || { played:0, wins:0, streak:0, maxStreak:0, lastPuzzle:null, lastWon:false };
}
function saveStats(s){ localStorage.setItem(statsKey, JSON.stringify(s)); }

document.getElementById('puzzleNum').textContent = '#' + puzzleNumber();

const legendGridEl = document.getElementById('legendGrid');
CATEGORIES.forEach(cat => {
  const chip = document.createElement('div');
  chip.className = 'legend-chip ' + cat.color;
  chip.textContent = cat.name;
  legendGridEl.appendChild(chip);
});

const gridEl = document.getElementById('grid');
const solvedBarsEl = document.getElementById('solvedBars');
const mistakesDotsEl = document.getElementById('mistakesDots');
const toastEl = document.getElementById('toast');
const submitBtn = document.getElementById('submitBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const deselectBtn = document.getElementById('deselectBtn');

for (let i=0;i<MAX_MISTAKES;i++){
  const dot = document.createElement('div');
  dot.className = 'dot';
  mistakesDotsEl.appendChild(dot);
}

function showToast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  setTimeout(() => toastEl.classList.remove('show'), 1400);
}

// Full rebuild — only for moments the grid's actual contents change
// (load, a correct solve removing tiles, or an explicit shuffle).
// Plain tile taps use updateControls()/toggling a single element's class
// instead, so selecting a tile doesn't replay every tile's entrance
// animation and flash the whole board.
function render(){
  solvedBarsEl.innerHTML = '';
  const allSolvedOrRevealed = state.solvedGroupIdxs.concat(state.revealedGroupIdxs);
  state.solvedGroupIdxs.forEach(gi => {
    const g = puzzle.groups[gi];
    const bar = document.createElement('div');
    bar.className = 'solved-bar ' + g.color;
    bar.innerHTML = '<div class="cat-name">' + g.name + '</div><div class="cat-items">' + g.items.join(' · ') + '</div>';
    solvedBarsEl.appendChild(bar);
  });
  state.revealedGroupIdxs.forEach(gi => {
    const g = puzzle.groups[gi];
    const bar = document.createElement('div');
    bar.className = 'solved-bar revealed ' + g.color;
    bar.innerHTML = '<div class="cat-name">' + g.name + '</div><div class="cat-items">' + g.items.join(' · ') + '</div>';
    solvedBarsEl.appendChild(bar);
  });

  gridEl.innerHTML = '';
  state.order
    .filter(idx => !allSolvedOrRevealed.includes(canon[idx].groupIdx))
    .forEach(idx => {
      const tile = document.createElement('div');
      tile.className = 'tile' + (selected.has(idx) ? ' selected' : '');
      tile.textContent = canon[idx].name;
      tile.dataset.idx = idx;
      if (!state.finished) tile.addEventListener('click', () => onTileClick(idx));
      gridEl.appendChild(tile);
    });

  updateControls();
}

function updateControls(){
  const dots = mistakesDotsEl.querySelectorAll('.dot');
  dots.forEach((dot,i) => dot.classList.toggle('used', i < state.mistakes));

  submitBtn.disabled = state.finished || selected.size !== 4;
  shuffleBtn.disabled = state.finished;
  deselectBtn.disabled = state.finished || selected.size === 0;
}

function onTileClick(idx){
  if (state.finished) return;
  if (selected.has(idx)) selected.delete(idx);
  else if (selected.size < 4) selected.add(idx);
  const el = gridEl.querySelector('[data-idx="' + idx + '"]');
  if (el) el.classList.toggle('selected', selected.has(idx));
  updateControls();
}

function endGame(won){
  state.finished = true;
  state.won = won;
  if (!won){
    for (let gi = 0; gi < puzzle.groups.length; gi++){
      if (!state.solvedGroupIdxs.includes(gi)) state.revealedGroupIdxs.push(gi);
    }
  }
  saveState();
  selected.clear();
  render();

  const stats = loadStats();
  const pNum = puzzleNumber();
  if (stats.lastPuzzle !== pNum){
    stats.played += 1;
    if (won){
      stats.wins += 1;
      stats.streak = (stats.lastPuzzle === pNum - 1 && stats.lastWon) ? stats.streak + 1 : 1;
    } else {
      stats.streak = 0;
    }
    stats.maxStreak = Math.max(stats.maxStreak, stats.streak);
    stats.lastPuzzle = pNum;
    stats.lastWon = won;
    saveStats(stats);
  }

  applyResultText();
  document.getElementById('statsResultSection').style.display = 'block';
  showShareCard();
  renderStats();
  openModal('statsOverlay');
}

function applyResultText(){
  const resultHeadline = document.getElementById('resultHeadline');
  const resultAnswer = document.getElementById('resultAnswer');
  const shareCardHeadline = document.getElementById('shareCardHeadline');
  let headline, answer;
  if (state.won){
    headline = state.mistakes === 0 ? 'Perfect solve!' : 'Nice work!';
    answer = state.mistakes === 0
      ? 'You found all four groups with zero mistakes.'
      : 'You found all four groups with ' + state.mistakes + ' mistake' + (state.mistakes === 1 ? '' : 's') + '.';
  } else {
    headline = 'So close — try again tomorrow';
    answer = "Here's today's " + '"' + puzzle.title + '"' + ' puzzle, fully solved above.';
  }
  resultHeadline.textContent = headline;
  resultAnswer.textContent = answer;
  shareCardHeadline.textContent = headline;
}

function showShareCard(){
  document.getElementById('shareCard').style.display = 'block';
}

function submitGuess(){
  if (selected.size !== 4 || state.finished) return;
  const idxs = [...selected];
  const groupIdxs = idxs.map(i => canon[i].groupIdx);
  const colors = idxs.map(i => puzzle.groups[canon[i].groupIdx].color);
  const namesKey = idxs.map(i => canon[i].name).sort().join('|');

  if (state.guessedSets.includes(namesKey)){
    showToast('Already tried that one');
    idxs.forEach(idx => {
      const el = gridEl.querySelector('[data-idx="' + idx + '"]');
      if (el) el.classList.remove('selected');
    });
    selected.clear();
    updateControls();
    return;
  }
  state.guessedSets.push(namesKey);
  state.guessHistory.push(colors);

  const allSame = groupIdxs.every(g => g === groupIdxs[0]);
  if (allSame && !state.solvedGroupIdxs.includes(groupIdxs[0])){
    state.solvedGroupIdxs.push(groupIdxs[0]);
    state.solvedGroupIdxs.sort((a,b) => a - b);
    selected.clear();
    saveState();
    render();
    if (state.solvedGroupIdxs.length === puzzle.groups.length) endGame(true);
  } else {
    const counts = {};
    groupIdxs.forEach(g => counts[g] = (counts[g] || 0) + 1);
    const oneAway = Object.values(counts).some(c => c === 3);
    state.mistakes += 1;
    saveState();
    if (oneAway) showToast('One away…');
    selected.clear();
    idxs.forEach(idx => {
      const el = gridEl.querySelector('[data-idx="' + idx + '"]');
      if (el){
        el.classList.remove('selected');
        el.classList.add('shake');
        setTimeout(() => el.classList.remove('shake'), 400);
      }
    });
    updateControls();
    if (state.mistakes >= MAX_MISTAKES) endGame(false);
  }
}

function renderStats(){
  const stats = loadStats();
  const winPct = stats.played ? Math.round(100*stats.wins/stats.played) : 0;
  document.getElementById('statPlayed').textContent = stats.played;
  document.getElementById('statWinPct').textContent = winPct + '%';
  document.getElementById('statStreak').textContent = stats.streak;
  document.getElementById('statMaxStreak').textContent = stats.maxStreak;
}

submitBtn.addEventListener('click', submitGuess);
shuffleBtn.addEventListener('click', () => { state.order = shuffle(state.order); saveState(); render(); });
deselectBtn.addEventListener('click', () => {
  gridEl.querySelectorAll('.tile.selected').forEach(el => el.classList.remove('selected'));
  selected.clear();
  updateControls();
});

function buildShareText(){
  const rows = state.guessHistory.map(colors => colors.map(c => COLOR_EMOJI[c]).join('')).join('\n');
  const url = location.origin + location.pathname;
  return 'Coverage Connections #' + puzzleNumber() + ' ' + (state.won ? state.mistakes + ' mistake' + (state.mistakes === 1 ? '' : 's') : 'X') +
    '\n' + rows + '\n\nCan you find all four groups? Play at ' + url + '\nThe Insurance Center · (801) 622-2626 #TheInsuranceCenter';
}

function copyShareText(msgEl){
  const text = buildShareText();
  function fallbackCopy(str){
    const ta = document.createElement('textarea');
    ta.value = str; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch(e) {}
    document.body.removeChild(ta);
  }
  function showCopied(){ msgEl.textContent = 'Copied to clipboard!'; setTimeout(() => msgEl.textContent = '', 2000); }
  if (navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(showCopied).catch(() => { fallbackCopy(text); showCopied(); });
  } else { fallbackCopy(text); showCopied(); }
}

document.getElementById('shareBtn').addEventListener('click', () => copyShareText(document.getElementById('copiedMsg')));
document.getElementById('shareBtnMain').addEventListener('click', () => copyShareText(document.getElementById('copiedMsgMain')));

function openModal(id){ document.getElementById(id).classList.add('open'); }
function closeModal(id){ document.getElementById(id).classList.remove('open'); }

document.getElementById('helpBtn').addEventListener('click', () => openModal('helpOverlay'));
document.getElementById('helpClose').addEventListener('click', () => closeModal('helpOverlay'));
document.getElementById('helpOverlay').addEventListener('click', (e) => { if (e.target.id === 'helpOverlay') closeModal('helpOverlay'); });

document.getElementById('statsBtn').addEventListener('click', () => { renderStats(); openModal('statsOverlay'); });
document.getElementById('statsClose').addEventListener('click', () => closeModal('statsOverlay'));
document.getElementById('statsOverlay').addEventListener('click', (e) => { if (e.target.id === 'statsOverlay') closeModal('statsOverlay'); });

render();
renderStats();
if (state.finished){
  document.getElementById('statsResultSection').style.display = 'block';
  applyResultText();
  showShareCard();
} else if (state.guessHistory.length === 0 && state.solvedGroupIdxs.length === 0){
  openModal('helpOverlay');
}
