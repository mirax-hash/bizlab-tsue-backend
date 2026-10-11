let currentLang = 'uz';
let duelRound = 1;
let treasuryA = 250000000;
let treasuryB = 250000000;
let duelPieInst = null;
let duelBarInst = null;
let eoqChartInst = null;
let boardChartInst = null;

let missions = [];
let activeMission = null;
let activeShock = null;
let classicBarInst = null;
let classicPieInst = null;
let chatHistory = [];
let labRound = 1;
let activeCase = null;

window.lastMetrics = {
  battle_profit: 25000000.0,
  forensic_cash_flow: 15000000.0,
  eoq_annual_cost: 12000000.0,
  pricing_profit_delta: 8000000.0,
  survival_score: 78
};

function toggleLang() {
  currentLang = currentLang === 'uz' ? 'en' : 'uz';
  document.querySelectorAll('.lang-indicator').forEach(el => el.innerText = currentLang.toUpperCase());
  
  const t = i18nData[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.innerText = t[key];
  });

  renderCases();
  updateDuelSlider('v_a_p', document.getElementById('c_a_p').value);
  updateDuelSlider('v_a_m', document.getElementById('c_a_m').value);
  updateDuelSlider('v_a_q', document.getElementById('c_a_q').value);
  updateDuelSlider('v_b_p', document.getElementById('c_b_p').value);
  updateDuelSlider('v_b_m', document.getElementById('c_b_m').value);
  updateDuelSlider('v_b_q', document.getElementById('c_b_q').value);
  document.getElementById('treasury-a').innerText = treasuryA.toLocaleString() + ' ' + t.currency;
  document.getElementById('treasury-b').innerText = treasuryB.toLocaleString() + ' ' + t.currency;

  if (activeMission) selectMission(activeMission);
  if (!document.getElementById('view-forensic').classList.contains('hidden')) runForensicAction();
  if (!document.getElementById('view-eoq').classList.contains('hidden')) runEOQAction();
  if (!document.getElementById('view-pricing').classList.contains('hidden')) runPricingAction();
  if (!document.getElementById('view-security').classList.contains('hidden')) runSecurityAction();
  if (!document.getElementById('view-board').classList.contains('hidden')) runBoardEvaluationAction();
}

function switchView(tab) {
  const tabs = ['cases', 'battle', 'lab', 'forensic', 'eoq', 'pricing', 'security', 'board'];
  tabs.forEach(k => {
    const v = document.getElementById(`view-${k}`);
    const b = document.getElementById(`tab-${k}`);
    if (v) v.classList.add('hidden');
    if (b) b.className = 'px-3 py-2 rounded-lg font-bold text-slate-300 hover:text-white whitespace-nowrap transition';
  });

  const activeV = document.getElementById(`view-${tab}`);
  if (activeV) activeV.classList.remove('hidden');

  const activeB = document.getElementById(`tab-${tab}`);
  if (activeB) {
    if (tab === 'cases') {
      activeB.className = 'px-3.5 py-2 rounded-lg font-black bg-amber-500 text-slate-950 whitespace-nowrap shadow';
    } else {
      activeB.className = 'px-3.5 py-2 rounded-lg font-black bg-rose-600 text-white whitespace-nowrap shadow';
    }
  }

  if (tab === 'cases') renderCases();
  if (tab === 'lab' && missions.length === 0) loadMissionsData();
  if (tab === 'forensic') runForensicAction();
  if (tab === 'eoq') runEOQAction();
  if (tab === 'pricing') runPricingAction();
  if (tab === 'security') runSecurityAction();
  if (tab === 'board') runBoardEvaluationAction();
}

function renderCases() {
  const container = document.getElementById('cases-grid-container');
  if (!container) return;
  const t = i18nData[currentLang];

  container.innerHTML = caseBank.map(c => `
    <div class="bg-slate-900 border-2 border-slate-800 hover:border-amber-500/50 p-5 rounded-2xl flex flex-col justify-between space-y-4 shadow-xl transition">
      <div>
        <div class="flex justify-between items-center mb-1.5">
          <span class="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">${c.num}</span>
          <span class="text-xs text-slate-400 font-mono font-medium">${c.exercise}</span>
        </div>
        <h4 class="text-base font-extrabold text-white mt-1">${c.name[currentLang]}</h4>
        <div class="text-xs text-emerald-400 font-medium mt-1"><i class="fa-solid fa-bullseye mr-1"></i>${c.focus[currentLang]}</div>
        <p class="text-sm text-slate-300 leading-relaxed mt-2 line-clamp-4">${c.sit[currentLang]}</p>
      </div>
      <button onclick="openCaseModal(${c.id})" class="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-black transition flex items-center justify-center gap-2">
        <span>${t.btn_solve}</span> <i class="fa-solid fa-arrow-right text-xs"></i>
      </button>
    </div>
  `).join('');
}

function openCaseModal(id) {
  activeCase = caseBank.find(x => x.id === id);
  if (!activeCase) return;

  document.getElementById('cm-badge').innerText = `${activeCase.num} : ${activeCase.exercise}`;
  document.getElementById('cm-title').innerText = activeCase.name[currentLang];
  document.getElementById('cm-sit').innerText = activeCase.sit[currentLang];
  document.getElementById('cm-prompt').innerText = activeCase.prompt[currentLang];

  document.getElementById('cm-inputs').innerHTML = `
    <div>
      <label class="text-sm text-slate-300 block mb-1 font-medium">${activeCase.inputLabel[currentLang]}</label>
      <input type="number" id="cm-input-field" placeholder="${activeCase.hint}" class="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-mono text-sm focus:border-amber-500 focus:outline-none">
    </div>
  `;

  document.getElementById('cm-res').classList.add('hidden');
  document.getElementById('case-modal').classList.remove('hidden');
}

function closeCaseModal() {
  document.getElementById('case-modal').classList.add('hidden');
}

function checkCaseAnswer() {
  if (!activeCase) return;
  const val = parseFloat(document.getElementById('cm-input-field').value);
  const resBox = document.getElementById('cm-res');
  const scoreTxt = document.getElementById('cm-score');
  const fbTxt = document.getElementById('cm-feedback');

  if (val === activeCase.val) {
    scoreTxt.innerText = currentLang === 'uz' ? "100 / 100 (To'g'ri!)" : "100 / 100 (Correct!)";
    scoreTxt.className = "font-mono font-bold text-emerald-400 text-sm sm:text-base";
    fbTxt.innerText = activeCase.success[currentLang];
  } else {
    scoreTxt.innerText = currentLang === 'uz' ? "30 / 100 (Xato hisoblandi)" : "30 / 100 (Incorrect)";
    scoreTxt.className = "font-mono font-bold text-rose-400 text-sm sm:text-base";
    fbTxt.innerText = activeCase.fail[currentLang];
  }
  resBox.classList.remove('hidden');
}

function updateDuelSlider(id, val) {
  const el = document.getElementById(id);
  if (el) el.innerText = parseInt(val).toLocaleString() + ' ' + i18nData[currentLang].currency;
}

async function runDuelAction() {
  const payload = {
    round_number: duelRound,
    team_a: { name: "Uzum Express", price: parseInt(document.getElementById('c_a_p').value), marketing: parseInt(document.getElementById('c_a_m').value), quality: parseInt(document.getElementById('c_a_q').value) },
    team_b: { name: "Yandex / Express24", price: parseInt(document.getElementById('c_b_p').value), marketing: parseInt(document.getElementById('c_b_m').value), quality: parseInt(document.getElementById('c_b_q').value) }
  };

  const res = await fetch('/api/v1/battle/play-round', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
  const d = await res.json();
  const t = i18nData[currentLang];

  window.lastMetrics.battle_profit = d.team_a.net_profit;
  document.getElementById('res-a-share').innerText = d.team_a.market_share + '%';
  document.getElementById('res-a-orders').innerText = d.team_a.orders.toLocaleString() + ' ' + t.orders_unit;
  document.getElementById('res-a-profit').innerText = (d.team_a.net_profit >= 0 ? '+' : '') + (d.team_a.net_profit / 1000000).toFixed(1) + ' ' + t.mln_unit;

  document.getElementById('res-b-share').innerText = d.team_b.market_share + '%';
  document.getElementById('res-b-orders').innerText = d.team_b.orders.toLocaleString() + ' ' + t.orders_unit;
  document.getElementById('res-b-profit').innerText = (d.team_b.net_profit >= 0 ? '+' : '') + (d.team_b.net_profit / 1000000).toFixed(1) + ' ' + t.mln_unit;

  document.getElementById('duel-analysis-text').innerText = d.analysis;
  const badge = document.getElementById('duel-winner-badge');
  badge.innerText = d.winner === 'team_a' ? "Uzum Express" : (d.winner === 'team_b' ? "Yandex" : "Tie");

  treasuryA += d.team_a.net_profit;
  treasuryB += d.team_b.net_profit;
  document.getElementById('treasury-a').innerText = treasuryA.toLocaleString() + ' ' + t.currency;
  document.getElementById('treasury-b').innerText = treasuryB.toLocaleString() + ' ' + t.currency;

  updateDuelCharts(d.team_a, d.team_b);
}

function updateDuelCharts(a, b) {
  const pCtx = document.getElementById('duelPieChart').getContext('2d');
  if (duelPieInst) duelPieInst.destroy();
  duelPieInst = new Chart(pCtx, {
    type: 'doughnut',
    data: { labels: ['Uzum Express', 'Yandex'], datasets: [{ data: [a.market_share, b.market_share], backgroundColor: ['#10b981', '#f43f5e'] }] },
    options: { responsive: true, maintainAspectRatio: false }
  });

  const bCtx = document.getElementById('duelBarChart').getContext('2d');
  if (duelBarInst) duelBarInst.destroy();
  duelBarInst = new Chart(bCtx, {
    type: 'bar',
    data: { labels: ['Uzum Express', 'Yandex'], datasets: [{ data: [a.net_profit, b.net_profit], backgroundColor: ['#10b981', '#f43f5e'] }] },
    options: { responsive: true, maintainAspectRatio: false }
  });
}

async function loadMissionsData() {
  const res = await fetch('/api/v1/missions');
  missions = await res.json();
  const list = document.getElementById('missions-list');
  list.innerHTML = '';

  missions.forEach(m => {
    const item = document.createElement('div');
    item.className = 'p-3 rounded-xl border bg-slate-950 hover:bg-slate-900 border-slate-800 cursor-pointer';
    item.onclick = () => selectMission(m);
    item.innerHTML = `<span class="text-xs font-bold text-emerald-400 uppercase">${m.company}</span><h4 class="text-sm font-bold text-white">${m.title}</h4>`;
    list.appendChild(item);
  });
  if (missions.length > 0) selectMission(missions[0]);
}

function selectMission(m) {
  activeMission = m;
  document.getElementById('active-title').innerText = m.title;
  document.getElementById('active-desc').innerText = m.theory_brief;
  document.getElementById('theory-text').innerText = m.theory_brief;
  document.getElementById('video-frame').src = m.video_url;

  const qContainer = document.getElementById('quiz-container');
  qContainer.innerHTML = '';
  m.quiz.forEach((q, idx) => {
    qContainer.innerHTML += `
      <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 text-sm space-y-1.5">
        <div class="font-bold text-white">${idx + 1}. ${q.question}</div>
        ${q.options.map((opt, oIdx) => `
          <label class="flex items-center space-x-2 text-slate-300"><input type="radio" name="${q.id}" value="${oIdx}"> <span>${opt}</span></label>
        `).join('')}
      </div>`;
  });

  renderClassicControls(m.type);
}

function renderClassicControls(type) {
  const c = document.getElementById('lab-dynamic-controls');
  const t = i18nData[currentLang];
  c.innerHTML = `
    <div><div class="flex justify-between font-bold text-sm mb-1"><span>${currentLang==='uz'?'Asosiy parametr:':'Core Lever:'}</span><span id="vc1" class="text-emerald-400 font-mono">2 ${t.qty_unit}</span></div><input type="range" id="c_hubs" min="1" max="5" value="2" oninput="document.getElementById('vc1').innerText=this.value+' ${t.qty_unit}'; runClassicSim()" class="w-full accent-emerald-500"></div>
    <div><div class="flex justify-between font-bold text-sm mb-1"><span>Marketing:</span><span id="vc2" class="text-emerald-400 font-mono">15,000,000 ${t.currency}</span></div><input type="range" id="c_mkt" min="5000000" max="40000000" step="2500000" value="15000000" oninput="document.getElementById('vc2').innerText=parseInt(this.value).toLocaleString()+' ${t.currency}'; runClassicSim()" class="w-full accent-emerald-500"></div>
  `;
}

function gotoLabStep(num) {
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`lab-step-${i}`).classList.add('hidden');
    document.getElementById(`lab-step-btn-${i}`).className = 'py-2 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 flex flex-col items-center';
  }
  document.getElementById(`lab-step-${num}`).classList.remove('hidden');
  document.getElementById(`lab-step-btn-${num}`).className = 'py-2 rounded-xl border border-emerald-500 bg-emerald-500/10 text-emerald-400 flex flex-col items-center';
  if (num === 3) runClassicSim();
}

async function runClassicSim() {
  const payload = { mission_id: activeMission ? activeMission.id : 1, hub_count: 2, marketing_budget: 15000000 };
  const res = await fetch('/api/v1/missions/simulate-advanced', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
  const d = await res.json();
  const kpiBox = document.getElementById('lab-dynamic-kpis');
  kpiBox.innerHTML = (d.kpis || []).map(k => `<div><div class="text-xs text-slate-400">${k.label}</div><div class="font-bold text-${k.color}-400 text-sm mt-0.5">${k.val}</div></div>`).join('');
}

async function submitQuizAction() {
  const answers = {};
  activeMission.quiz.forEach(q => {
    const chk = document.querySelector(`input[name="${q.id}"]:checked`);
    if (chk) answers[q.id] = parseInt(chk.value);
  });
  const res = await fetch('/api/v1/missions/quiz-check', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ mission_id: activeMission.id, answers: answers }) });
  const data = await res.json();
  const div = document.getElementById('quiz-result-box');
  div.classList.remove('hidden');
  div.className = data.passed ? 'p-3.5 rounded-xl text-sm bg-emerald-950 text-emerald-300' : 'p-3.5 rounded-xl text-sm bg-red-950 text-red-300';
  div.innerHTML = `<strong>${currentLang==='uz'?'Natija:':'Score:'} ${data.score_percent}%</strong> — ${data.message} <button onclick="gotoLabStep(3)" class="ml-2 font-bold underline">Simulyator →</button>`;
}

async function sendChatMsg() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  const cBox = document.getElementById('chat-box');
  cBox.innerHTML += `<div class="p-2.5 rounded-xl bg-emerald-600 text-white text-right text-sm">${text}</div>`;
  input.value = '';
  cBox.scrollTop = cBox.scrollHeight;

  const res = await fetch('/api/v1/missions/ai-debate', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ mission_id: activeMission ? activeMission.id : 1, history: chatHistory, decision_summary: "Simulyatsiya", round_index: labRound })
  });
  const data = await res.json();
  cBox.innerHTML += `<div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm"><strong>SI Professor:</strong> ${data.reply}</div>`;
  cBox.scrollTop = cBox.scrollHeight;

  if (data.is_ready_for_certificate && data.certificate_data) {
    document.getElementById('certificate-card').classList.remove('hidden');
  }
}

async function runForensicAction() {
  const payload = { cut_admin_expenses_pct: 20, restructure_debt_months: 12, layoff_redundant_staff_pct: 15, discount_slow_inventory_pct: 25 };
  const res = await fetch('/api/v1/lab/forensic-audit', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
  const d = await res.json();
  const t = i18nData[currentLang];
  document.getElementById('fa_saved').innerText = (d.monthly_burn_rate_saved / 1000000).toFixed(1) + ' ' + t.mln_unit;
  document.getElementById('fa_cf').innerText = (d.final_cash_flow / 1000000).toFixed(1) + ' ' + t.mln_unit;
  document.getElementById('fa_verdict').innerText = d.verdict;
}

async function runEOQAction() {
  const payload = { annual_demand: 24000, order_cost: 250000, holding_cost_unit: 12000, lead_time_days: 5, safety_factor_z: 1.65 };
  const res = await fetch('/api/v1/lab/supply-chain-eoq', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
  const d = await res.json();
  const t = i18nData[currentLang];
  document.getElementById('eoq_val').innerText = d.eoq_units.toLocaleString() + ' ' + t.qty_unit;
  document.getElementById('eoq_orders').innerText = d.orders_per_year + ' ' + t.times_unit;
  document.getElementById('eoq_cost').innerText = (d.total_annual_inventory_cost / 1000000).toFixed(1) + ' ' + t.mln_unit;
}

async function runPricingAction() {
  const payload = { base_price: 50000.0, price_change_pct: 10, elasticity_coefficient: -1.6, unit_cost: 32000.0 };
  const res = await fetch('/api/v1/lab/dynamic-pricing', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
  const d = await res.json();
  const t = i18nData[currentLang];
  document.getElementById('pr_price').innerText = d.new_price.toLocaleString() + ' ' + t.currency;
  document.getElementById('pr_profit').innerText = (d.profit_delta / 1000000).toFixed(1) + ' ' + t.mln_unit;
}

async function runSecurityAction() {
  const payload = { fx_devaluation_pct: 20, customs_tariff_pct: 15, compliance_reserve_fund: 50000000 };
  const res = await fetch('/api/v1/lab/security-stress-test', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
  const d = await res.json();
  const t = i18nData[currentLang];
  document.getElementById('sec_risk').innerText = (d.total_risk_exposure / 1000000).toFixed(1) + ' ' + t.mln_unit;
  document.getElementById('sec_score').innerText = d.survival_score + " / 100";
}

async function runBoardEvaluationAction() {
  const payload = { battle_profit: 25000000, forensic_cash_flow: 15000000, eoq_annual_cost: 12000000, pricing_profit_delta: 8000000, survival_score: 78, student_name: "Mirzarakhim B." };
  const res = await fetch('/api/v1/board/evaluate-pitch', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
  const d = await res.json();
  const t = i18nData[currentLang];
  document.getElementById('board-ebitda').innerText = (d.annual_ebitda / 1000000).toFixed(1) + ' ' + t.mln_unit;
  document.getElementById('board-valuation').innerText = (d.company_valuation / 1000000).toFixed(1) + ' ' + t.mln_unit;
  document.getElementById('board-score').innerText = d.board_score + " / 100";
  document.getElementById('board-verdict').innerText = d.board_decision;

  const c = document.getElementById('board-reviews-container');
  c.innerHTML = d.reviews.map(r => `
    <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 text-sm space-y-1">
      <div class="flex justify-between font-bold text-white"><span>${r.role} (${r.name})</span><span class="text-${r.color}-400 font-mono">${r.status}</span></div>
      <p class="text-slate-300 text-xs">${r.comment}</p>
    </div>
  `).join('');
}

window.onload = () => {
  renderCases();
  updateDuelCharts({ market_share: 50, net_profit: 25000000 }, { market_share: 50, net_profit: 25000000 });
};
