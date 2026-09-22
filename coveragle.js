// Field code -> {Line, Family, Protects, Required(0=Optional,1=Often Required,2=Legally Required)}
const REQ_LABEL = ["Optional", "Often Required", "Legally Required"];

const DATA = [
  {n:"Liability Auto Insurance", line:"Personal", fam:"Auto & Vehicles", prot:"Liability", req:2,
   s:"You run a red light and clip another car, denting their bumper and sending the other driver to urgent care.",
   f:"Almost every state requires drivers to carry at least a minimum amount of this — it pays for the other party's damage and injuries, not yours."},
  {n:"Collision Coverage", line:"Personal", fam:"Auto & Vehicles", prot:"Property", req:1,
   s:"You slide on black ice and crumple your own front bumper against a guardrail.",
   f:"Pays to repair or replace your own car after a crash, no matter who's at fault. Lenders usually require it while you're still making payments."},
  {n:"Comprehensive Coverage", line:"Personal", fam:"Auto & Vehicles", prot:"Property", req:1,
   s:"A hailstorm dents your hood and cracks your windshield overnight in your own driveway.",
   f:"Covers damage from almost anything besides a collision — theft, weather, vandalism, even a deer strike."},
  {n:"Uninsured/Underinsured Motorist Coverage", line:"Personal", fam:"Auto & Vehicles", prot:"Liability", req:0,
   s:"A driver with no insurance runs a stop sign, totals your car, and has nothing to pay you back with.",
   f:"Steps in when the at-fault driver doesn't have enough insurance — or any — to cover what they owe you."},
  {n:"Gap Insurance", line:"Personal", fam:"Auto & Vehicles", prot:"Property", req:0,
   s:"Your brand-new car is totaled six months after you bought it, and you still owe more on the loan than it's worth.",
   f:"Covers the 'gap' between what your car is actually worth and what you still owe the lender."},
  {n:"Motorcycle Insurance", line:"Personal", fam:"Auto & Vehicles", prot:"Liability", req:2,
   s:"You lay your bike down taking a canyon curve too fast.",
   f:"Works like auto insurance, but priced and underwritten specifically for two wheels."},
  {n:"RV Insurance", line:"Personal", fam:"Auto & Vehicles", prot:"Property", req:0,
   s:"A grease fire in the kitchenette damages the inside of your motorhome mid-road-trip.",
   f:"Covers both the vehicle and the 'home' parts inside it — appliances, awnings, and your belongings."},
  {n:"Boat Insurance", line:"Personal", fam:"Auto & Vehicles", prot:"Property", req:0,
   s:"Your boat takes on water and sinks at the marina during a storm.",
   f:"Most marinas and lenders require it, and it can also cover towing, salvage, and fuel-spill liability."},
  {n:"Classic Car Insurance", line:"Personal", fam:"Auto & Vehicles", prot:"Property", req:0,
   s:"Hail dings up the hood of your mint-condition '67 Mustang that only leaves the garage for car shows.",
   f:"Insures a collector car for an agreed value instead of its depreciated market value."},
  {n:"Commercial Auto Insurance", line:"Commercial", fam:"Auto & Vehicles", prot:"Liability", req:2,
   s:"One of your delivery drivers rear-ends someone while running a package to a customer.",
   f:"Covers vehicles owned or used for business — a personal auto policy excludes business use."},
  {n:"ATV Insurance", line:"Personal", fam:"Auto & Vehicles", prot:"Property", req:0,
   s:"You roll your ATV on a mountain trail and it needs major repairs.",
   f:"Covers off-road vehicles that a standard auto policy won't touch."},
  {n:"Snowmobile Insurance", line:"Personal", fam:"Auto & Vehicles", prot:"Property", req:0,
   s:"You hit a rock hidden under fresh powder and crack the frame of your snowmobile.",
   f:"Insures snowmobiles much like ATVs — most homeowners and auto policies exclude them entirely."},

  {n:"Homeowners Insurance (HO-3)", line:"Personal", fam:"Home & Property", prot:"Property", req:1,
   s:"A kitchen fire spreads to the wall and takes out your cabinets before the fire department arrives.",
   f:"Bundles protection for your home's structure, your belongings, and liability if a guest gets hurt on your property."},
  {n:"Renters Insurance", line:"Personal", fam:"Home & Property", prot:"Property", req:1,
   s:"A pipe bursts in the apartment above yours and ruins your couch, laptop, and clothes.",
   f:"Covers your belongings and your liability — your landlord's policy only covers the building itself."},
  {n:"Condo Insurance (HO-6)", line:"Personal", fam:"Home & Property", prot:"Property", req:1,
   s:"A leak from the unit next door soaks your flooring and drywall.",
   f:"Fills the gap between what the condo association's master policy covers and what's actually yours."},
  {n:"Landlord Insurance", line:"Personal", fam:"Home & Property", prot:"Property", req:1,
   s:"Your tenant accidentally starts a small kitchen fire in your rental property.",
   f:"Covers the rental structure and your liability as an owner, plus lost rental income while repairs happen."},
  {n:"Flood Insurance", line:"Personal", fam:"Home & Property", prot:"Property", req:1,
   s:"Spring runoff overwhelms a nearby creek and water seeps into your basement.",
   f:"Standard homeowners policies exclude this — it's a separate policy, often through the National Flood Insurance Program."},
  {n:"Earthquake Insurance", line:"Personal", fam:"Home & Property", prot:"Property", req:0,
   s:"A quake cracks your foundation and knocks everything off the shelves.",
   f:"Like flood, this is excluded from standard homeowners policies and sold as its own add-on — worth a look in Utah."},
  {n:"Mobile Home Insurance", line:"Personal", fam:"Home & Property", prot:"Property", req:1,
   s:"High winds tear the skirting loose and rip shingles off your manufactured home.",
   f:"Written specifically for manufactured homes, which standard homeowners policies typically won't touch."},
  {n:"Scheduled Personal Property", line:"Personal", fam:"Home & Property", prot:"Property", req:0,
   s:"Your grandmother's diamond ring goes missing during a move, and your regular policy caps jewelry claims at $1,500.",
   f:"Lets you insure high-value items — jewelry, art, instruments — above your homeowners policy's built-in limits."},
  {n:"Builders Risk Insurance", line:"Commercial", fam:"Home & Property", prot:"Property", req:1,
   s:"A storm rips the half-finished roof off a house that's still under construction.",
   f:"Covers a structure while it's being built — once it's finished and occupied, it switches to a standard property policy."},
  {n:"Farm & Ranch Insurance", line:"Commercial", fam:"Home & Property", prot:"Property", req:0,
   s:"A barn fire destroys your equipment and half your winter hay supply.",
   f:"Bundles home, land, equipment, livestock, and liability into one policy built for working farms."},

  {n:"Term Life Insurance", line:"Personal", fam:"Life & Health", prot:"Health/Life", req:0,
   s:"A parent passes away unexpectedly, and the mortgage and childcare bills don't stop.",
   f:"Pays a death benefit only if you pass away during a set period — 10, 20, or 30 years. No payout if you outlive the term."},
  {n:"Whole Life Insurance", line:"Personal", fam:"Life & Health", prot:"Health/Life", req:0,
   s:"A retiree wants coverage that lasts their entire life and also builds savings they can borrow against.",
   f:"Never expires as long as premiums are paid, and it builds cash value over time."},
  {n:"Disability Insurance", line:"Personal", fam:"Life & Health", prot:"Income", req:0,
   s:"A construction worker breaks his back on the job and can't earn a paycheck for eight months.",
   f:"Replaces a portion of your income if you can't work due to illness or injury — statistically more likely to be used than life insurance."},
  {n:"Health Insurance", line:"Personal", fam:"Life & Health", prot:"Health/Life", req:0,
   s:"An unexpected appendectomy lands you a five-figure hospital bill.",
   f:"Covers medical costs from routine checkups to emergency surgery."},
  {n:"Dental Insurance", line:"Personal", fam:"Life & Health", prot:"Health/Life", req:0,
   s:"A cracked molar needs a root canal and a crown.",
   f:"Usually sold separately from health insurance, and often caps annual benefits around $1,000-$2,000."},
  {n:"Pet Insurance", line:"Personal", fam:"Life & Health", prot:"Health/Life", req:0,
   s:"Your dog swallows a sock and needs emergency surgery.",
   f:"Works like health insurance for pets — you pay the vet, then get reimbursed based on your plan."},
  {n:"Travel Insurance", line:"Personal", fam:"Life & Health", prot:"Property", req:0,
   s:"A blizzard cancels your connecting flight and strands you two nights before a cruise you already paid for.",
   f:"Can reimburse nonrefundable trip costs and cover emergency medical care outside the country your health plan won't touch."},
  {n:"Identity Theft Protection", line:"Personal", fam:"Life & Health", prot:"Property", req:0,
   s:"Someone opens three credit cards in your name after your info leaks in a data breach.",
   f:"Covers the cost of restoring your identity and reimburses certain losses from fraud."},
  {n:"Long-Term Care Insurance", line:"Personal", fam:"Life & Health", prot:"Health/Life", req:0,
   s:"A parent in their 80s needs full-time nursing home care that costs $8,000 a month.",
   f:"Covers extended custodial or nursing care that regular health insurance and Medicare mostly don't pay for."},
  {n:"Accidental Death & Dismemberment (AD&D)", line:"Personal", fam:"Life & Health", prot:"Health/Life", req:0,
   s:"A workplace accident results in the loss of a limb.",
   f:"Pays a benefit for accidental death or specific serious injuries — narrower than standard life insurance."},

  {n:"General Liability Insurance", line:"Commercial", fam:"Business Liability & Property", prot:"Liability", req:1,
   s:"A customer slips on a wet floor in your store and sues for medical bills.",
   f:"The baseline policy most businesses need — covers third-party injury, property damage, and the legal costs that come with it."},
  {n:"Professional Liability (E&O)", line:"Commercial", fam:"Business Liability & Property", prot:"Liability", req:1,
   s:"A client claims your advice cost them money and sues over the loss.",
   f:"Covers claims that your professional service or advice caused someone financial harm — general liability won't touch this."},
  {n:"Commercial Property Insurance", line:"Commercial", fam:"Business Liability & Property", prot:"Property", req:1,
   s:"A burst pipe floods your office overnight, ruining computers and inventory.",
   f:"Covers the building you own or lease, plus the equipment and inventory inside it."},
  {n:"Business Interruption Insurance", line:"Commercial", fam:"Business Liability & Property", prot:"Income", req:0,
   s:"A fire shuts your restaurant down for four months of repairs, and the bills keep coming with zero revenue.",
   f:"Replaces lost income and covers ongoing expenses — usually only pays out when it's attached to a property claim."},
  {n:"Product Liability Insurance", line:"Commercial", fam:"Business Liability & Property", prot:"Liability", req:0,
   s:"A customer is injured by a defective part in a product your company manufactured.",
   f:"Protects manufacturers, distributors, and retailers if a product they sold causes injury or damage."},
  {n:"Liquor Liability Insurance", line:"Commercial", fam:"Business Liability & Property", prot:"Liability", req:1,
   s:"A visibly intoxicated bar patron you kept serving causes a crash on the way home.",
   f:"Required in most states for any business that sells or serves alcohol — general liability usually excludes this."},
  {n:"Cyber Liability Insurance", line:"Commercial", fam:"Business Liability & Property", prot:"Liability", req:0,
   s:"Ransomware locks your company's files, and the hacker demands payment to unlock them.",
   f:"Covers costs like data recovery, customer notification, and legal fees after a breach or cyberattack."},
  {n:"Directors & Officers (D&O) Insurance", line:"Commercial", fam:"Business Liability & Property", prot:"Liability", req:0,
   s:"A shareholder sues your company's leadership over a decision that lost money.",
   f:"Protects the personal assets of executives and board members from lawsuits over how they ran the company."},
  {n:"Employment Practices Liability (EPLI)", line:"Commercial", fam:"Business Liability & Property", prot:"Liability", req:0,
   s:"A former employee sues your company claiming wrongful termination.",
   f:"Covers claims like discrimination, harassment, and wrongful termination brought by employees."},
  {n:"Inland Marine Insurance", line:"Commercial", fam:"Business Liability & Property", prot:"Property", req:0,
   s:"A contractor's tools are stolen out of a job-site trailer overnight.",
   f:"Despite the nautical name, it covers property that moves — tools, equipment, and goods in transit, not boats."},
  {n:"Workers' Compensation Insurance", line:"Commercial", fam:"Business Liability & Property", prot:"Health/Life", req:2,
   s:"An employee falls off a ladder on the job and breaks their wrist.",
   f:"Required in nearly every state once you have employees — covers medical bills and lost wages, and generally the employee can't sue you over the injury."},
  {n:"Surety Bonds", line:"Commercial", fam:"Business Liability & Property", prot:"Liability", req:1,
   s:"A contractor walks off a job halfway through, leaving the homeowner out thousands of dollars.",
   f:"A three-party guarantee that a business will do what it promised — if it doesn't, the bond pays out and the business repays the bond company."},
  {n:"Key Person Life Insurance", line:"Commercial", fam:"Business Liability & Property", prot:"Health/Life", req:0,
   s:"Your company's top salesperson generates half your revenue — and passes away suddenly.",
   f:"A life insurance policy a business takes out on a critical employee, with the company as beneficiary, to cover the financial hit of losing them."},

  {n:"Personal Umbrella Insurance", line:"Personal", fam:"Umbrella & Excess", prot:"Liability", req:0,
   s:"A guest is seriously injured at your backyard pool party, and the lawsuit exceeds your homeowners liability limit.",
   f:"Kicks in once your home or auto liability limits are maxed out, extending your protection by another $1 million or more."},
  {n:"Commercial Umbrella Insurance", line:"Commercial", fam:"Umbrella & Excess", prot:"Liability", req:0,
   s:"A major lawsuit against your company blows past your general liability policy's limit.",
   f:"Extends liability limits across your business policies once the underlying coverage runs out."}
];

const MAX_GUESSES = 6;
const STOPWORDS = new Set(["your","you","the","and","a","an","in","on","of","to","for","with","is","are","at","by","from","that","this","it","its","while","when","after","before","over","into","up","out","during","who","their","them","he","she","his","her","was","were","has","have","had","but","or","not","no","all","some","still","just","only","own","re-","re"]);

function nameOptions(){ return DATA.map(d => d.n); }

function resolveCoverage(raw){
  if (!raw) return null;
  const key = raw.trim().toLowerCase();
  if (!key) return null;
  const hit = DATA.find(d => d.n.toLowerCase() === key);
  return hit ? hit.n : null;
}

function hashStr(str){
  let h = 0;
  for (let i=0;i<str.length;i++){ h = (h*31 + str.charCodeAt(i)) >>> 0; }
  return h;
}
function todayKey(){
  const d = new Date();
  return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
}
function getDailyIndex(){
  return hashStr(todayKey()) % DATA.length;
}
function puzzleNumber(){
  const epoch = new Date(2026,8,15);
  const now = new Date();
  const diffDays = Math.floor((new Date(now.getFullYear(),now.getMonth(),now.getDate()) - epoch) / 86400000);
  return Math.max(1, diffDays + 1);
}

const answer = DATA[getDailyIndex()];
const stateKey = 'coveragle_state_' + todayKey();
const statsKey = 'coveragle_stats';

let state = JSON.parse(localStorage.getItem(stateKey) || 'null') || { guesses: [], finished: false, won: false };

function loadStats(){
  return JSON.parse(localStorage.getItem(statsKey) || 'null') || { played:0, wins:0, streak:0, maxStreak:0, lastPuzzle:null, lastWon:false };
}
function saveStats(s){ localStorage.setItem(statsKey, JSON.stringify(s)); }
function saveState(){ localStorage.setItem(stateKey, JSON.stringify(state)); }

document.getElementById('puzzleNum').textContent = '#' + puzzleNumber();

const coverageListEl = document.getElementById('coverageList');
nameOptions().sort().forEach(n => {
  const opt = document.createElement('option');
  opt.value = n;
  coverageListEl.appendChild(opt);
});

const scenarioBox = document.getElementById('scenarioBox');
const categoryBadge = document.getElementById('categoryBadge');
const hintBox = document.getElementById('hintBox');
const guessHistory = document.getElementById('guessHistory');
const livesRow = document.getElementById('livesRow');
const resultHeadline = document.getElementById('resultHeadline');
const resultAnswer = document.getElementById('resultAnswer');
const resultFunfact = document.getElementById('resultFunfact');
const statsResultSection = document.getElementById('statsResultSection');
const guessBtn = document.getElementById('guessBtn');
const guessInput = document.getElementById('guessInput');
const gameCard = document.getElementById('gameCard');

function revealGame(){
  gameCard.classList.remove('pending');
  renderScenario();
}

if (state.guesses.length === 0 && !state.finished){
  gameCard.classList.add('pending');
}

// pick up to 3 "giveaway" words to redact until they're earned by guessing
function redactTargets(sentence){
  const words = sentence.split(/\s+/);
  const candidates = words
    .map((w, i) => ({ w, i, clean: w.replace(/[^a-zA-Z]/g,'') }))
    .filter(c => c.clean.length >= 5 && !STOPWORDS.has(c.clean.toLowerCase()));
  candidates.sort((a,b) => b.clean.length - a.clean.length);
  return candidates.slice(0, 3).map(c => c.i).sort((a,b) => a-b);
}

function renderScenario(){
  const words = answer.s.split(/\s+/);
  if (state.finished){
    scenarioBox.textContent = answer.s;
    return;
  }
  const targets = redactTargets(answer.s);
  const revealCount = Math.min(targets.length, state.guesses.length);
  const revealedIdx = new Set(targets.slice(0, revealCount));
  const hiddenIdx = new Set(targets.slice(revealCount));
  scenarioBox.innerHTML = words.map((w, i) => {
    if (hiddenIdx.has(i)){
      const clean = w.replace(/[^a-zA-Z]/g,'');
      const punct = w.slice(clean.length);
      return '<span class="redacted">' + '&nbsp;'.repeat(Math.max(3, clean.length)) + '</span>' + punct;
    }
    return w;
  }).join(' ');
}

for (let i=0;i<MAX_GUESSES;i++){
  const dot = document.createElement('div');
  dot.className = 'dot';
  dot.dataset.i = i;
  livesRow.appendChild(dot);
}
function updateLives(){
  const dots = livesRow.querySelectorAll('.dot');
  dots.forEach((dot,i)=>{
    const used = i < state.guesses.length;
    const wasUsed = dot.classList.contains('used');
    dot.classList.toggle('used', used);
    if (used && !wasUsed){
      dot.classList.add('pop');
      setTimeout(()=>dot.classList.remove('pop'), 400);
    }
  });
}

function lineTile(g){
  return g.line === answer.line ? { cls: 'exact', arrow: '✓' } : { cls: '', arrow: '' };
}
function famTile(g){
  if (g.fam === answer.fam) return { cls: 'exact', arrow: '✓' };
  if (g.line === answer.line) return { cls: 'close', arrow: '~' };
  return { cls: '', arrow: '' };
}
function protTile(g){
  return g.prot === answer.prot ? { cls: 'exact', arrow: '✓' } : { cls: '', arrow: '' };
}
function reqTile(g){
  const diff = g.req - answer.req;
  if (diff === 0) return { cls: 'exact', arrow: '✓' };
  const arrow = diff < 0 ? '▲ more required' : '▼ less required';
  return { cls: Math.abs(diff) === 1 ? 'close' : '', arrow };
}

function renderGuess(g, animate){
  const wrap = document.createElement('div');
  const nameEl = document.createElement('div');
  nameEl.className = 'guess-row-name';
  nameEl.textContent = g.n;
  wrap.appendChild(nameEl);

  const row = document.createElement('div');
  row.className = 'guess-row';
  [
    { label: 'Line', val: g.line, f: lineTile(g) },
    { label: 'Family', val: g.fam, f: famTile(g) },
    { label: 'Protects', val: g.prot, f: protTile(g) },
    { label: 'Required?', val: REQ_LABEL[g.req], f: reqTile(g) }
  ].forEach((item, idx) => {
    const tile = document.createElement('div');
    tile.className = 'tile ' + item.f.cls;
    tile.innerHTML = '<span class="lbl">' + item.label + '</span><span class="val">' + item.val + '</span>' + (item.f.arrow ? '<span class="arrow">' + item.f.arrow + '</span>' : '');
    if (animate) tile.style.animationDelay = (idx * 110) + 'ms';
    else tile.style.animation = 'none';
    row.appendChild(tile);
  });
  wrap.appendChild(row);
  guessHistory.insertBefore(wrap, guessHistory.firstChild);
}

function updateHints(){
  const wrongCount = state.guesses.length;
  if (wrongCount >= 2){ categoryBadge.textContent = answer.fam; categoryBadge.classList.add('show'); }
  if (wrongCount >= 4){ hintBox.textContent = answer.f; }
}

function checkFinish(lastGuess){
  const exact = lastGuess.n === answer.n;
  if (exact || state.guesses.length >= MAX_GUESSES){
    state.finished = true;
    state.won = exact;
    saveState();
    finishGame();
  }
}

function launchConfetti(){
  const layer = document.createElement('div');
  layer.className = 'confetti-layer';
  document.body.appendChild(layer);
  const colors = ['#187012', '#67A63E', '#A1CE67', '#c9942f'];
  for (let i=0;i<32;i++){
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.left = Math.random()*100 + 'vw';
    p.style.background = colors[Math.floor(Math.random()*colors.length)];
    p.style.animationDuration = (1.4 + Math.random()*1.2) + 's';
    p.style.animationDelay = (Math.random()*0.4) + 's';
    p.style.transform = 'rotate(' + Math.floor(Math.random()*360) + 'deg)';
    layer.appendChild(p);
  }
  setTimeout(()=>layer.remove(), 3200);
}

function animateCount(el, target){
  const dur = 500;
  const start = performance.now();
  function tick(now){
    const t = Math.min(1, (now-start)/dur);
    el.textContent = Math.round(target * t);
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

function finishGame(){
  guessBtn.disabled = true;
  guessInput.disabled = true;
  categoryBadge.textContent = answer.fam; categoryBadge.classList.add('show');
  hintBox.textContent = answer.f;
  renderScenario();
  const headline = state.won ? 'Nailed it!' : "So close — try again tomorrow";
  resultHeadline.textContent = headline;
  resultAnswer.textContent = "Today's coverage was " + answer.n + '.';
  resultFunfact.textContent = answer.f;
  statsResultSection.style.display = 'block';
  document.getElementById('shareCardHeadline').textContent = headline;
  document.getElementById('shareCard').style.display = 'block';

  const stats = loadStats();
  const pNum = puzzleNumber();
  if (stats.lastPuzzle !== pNum){
    stats.played += 1;
    if (state.won){
      stats.wins += 1;
      stats.streak = (stats.lastPuzzle === pNum - 1 && stats.lastWon) ? stats.streak + 1 : 1;
    } else {
      stats.streak = 0;
    }
    stats.maxStreak = Math.max(stats.maxStreak, stats.streak);
    stats.lastPuzzle = pNum;
    stats.lastWon = state.won;
    saveStats(stats);
  }
  renderStats(true);
  openModal('statsOverlay');
  if (state.won) setTimeout(launchConfetti, 250);
}

function renderStats(animate){
  const stats = loadStats();
  const playedEl = document.getElementById('statPlayed');
  const winPctEl = document.getElementById('statWinPct');
  const streakEl = document.getElementById('statStreak');
  const maxStreakEl = document.getElementById('statMaxStreak');
  const winPct = stats.played ? Math.round(100*stats.wins/stats.played) : 0;
  if (animate){
    animateCount(playedEl, stats.played);
    animateCount(streakEl, stats.streak);
    animateCount(maxStreakEl, stats.maxStreak);
    const dur = 500, start = performance.now();
    (function tick(now){
      const t = Math.min(1, (now-start)/dur);
      winPctEl.textContent = Math.round(winPct*t) + '%';
      if (t < 1) requestAnimationFrame(tick); else winPctEl.textContent = winPct + '%';
    })(start);
  } else {
    playedEl.textContent = stats.played;
    winPctEl.textContent = winPct + '%';
    streakEl.textContent = stats.streak;
    maxStreakEl.textContent = stats.maxStreak;
  }
}

guessBtn.addEventListener('click', () => {
  const resolved = resolveCoverage(guessInput.value);
  if (!resolved){
    guessInput.classList.add('shake');
    setTimeout(()=>guessInput.classList.remove('shake'), 400);
    guessInput.focus();
    return;
  }
  const entry = DATA.find(d => d.n === resolved);
  const g = { n: entry.n, line: entry.line, fam: entry.fam, prot: entry.prot, req: entry.req };
  state.guesses.push(g);
  saveState();
  renderGuess(g, true);
  updateHints();
  updateLives();
  renderScenario();
  checkFinish(g);
  guessInput.value = '';
});
guessInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') guessBtn.click(); });

function buildShareText(){
  const rows = state.guesses.map(g => {
    const emoji = f => f.cls === 'exact' ? '🟩' : f.cls === 'close' ? '🟨' : '⬜';
    return emoji(lineTile(g)) + emoji(famTile(g)) + emoji(protTile(g)) + emoji(reqTile(g));
  }).join('\n');
  const url = location.origin + location.pathname;
  return 'Coveragle #' + puzzleNumber() + ' ' + (state.won ? state.guesses.length + '/6' : 'X/6') + '\n' + rows +
    '\n\nThink you know your coverage? Play at ' + url + '\nThe Insurance Center · (801) 622-2626 #TheInsuranceCenter';
}

function copyShareText(msgEl){
  const text = buildShareText();
  function fallbackCopy(str){
    const ta = document.createElement('textarea');
    ta.value = str;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch(e) {}
    document.body.removeChild(ta);
  }
  function showCopied(){
    msgEl.textContent = 'Copied to clipboard!';
    setTimeout(() => msgEl.textContent = '', 2000);
  }
  if (navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(showCopied).catch(() => { fallbackCopy(text); showCopied(); });
  } else {
    fallbackCopy(text);
    showCopied();
  }
}

document.getElementById('shareBtn').addEventListener('click', () => copyShareText(document.getElementById('copiedMsg')));
document.getElementById('shareBtnMain').addEventListener('click', () => copyShareText(document.getElementById('copiedMsgMain')));

function openModal(id){ document.getElementById(id).classList.add('open'); }
function closeModal(id){ document.getElementById(id).classList.remove('open'); }

document.getElementById('helpBtn').addEventListener('click', () => openModal('helpOverlay'));
document.getElementById('helpClose').addEventListener('click', () => { closeModal('helpOverlay'); revealGame(); });
document.getElementById('helpOverlay').addEventListener('click', (e) => { if (e.target.id === 'helpOverlay') { closeModal('helpOverlay'); revealGame(); } });

document.getElementById('statsBtn').addEventListener('click', () => { renderStats(false); openModal('statsOverlay'); });
document.getElementById('statsClose').addEventListener('click', () => closeModal('statsOverlay'));
document.getElementById('statsOverlay').addEventListener('click', (e) => { if (e.target.id === 'statsOverlay') closeModal('statsOverlay'); });

renderScenario();
state.guesses.forEach(g => renderGuess(g, false));
updateHints();
updateLives();
renderStats(false);
if (state.finished) finishGame();
else if (state.guesses.length === 0) openModal('helpOverlay');
