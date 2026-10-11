let currentLang = 'uz';
let activeCase = null;

function toggleLang() {
  currentLang = currentLang === 'uz' ? 'en' : 'uz';
  document.querySelectorAll('.lang-indicator').forEach(el => el.innerText = currentLang.toUpperCase());
  
  const t = i18nData[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.innerText = t[key];
  });

  renderCases();
  updateDuelUI();
}

function switchTab(tabId) {
  ['cases', 'battle', 'board'].forEach(t => {
    document.getElementById(`view-${t}`).classList.add('hidden');
    document.getElementById(`tab-${t}`).className = 'px-4 py-2.5 rounded-xl font-bold text-slate-300 hover:text-white whitespace-nowrap transition';
  });

  document.getElementById(`view-${tabId}`).classList.remove('hidden');
  document.getElementById(`tab-${tabId}`).className = 'px-4 py-2.5 rounded-xl font-extrabold bg-amber-500 text-slate-950 whitespace-nowrap shadow-md';

  if (tabId === 'cases') renderCases();
}

function renderCases() {
  const container = document.getElementById('cases-grid');
  if (!container) return;
  const t = i18nData[currentLang];

  container.innerHTML = caseBank.map(c => `
    <div class="bg-slate-900 border-2 border-slate-800 hover:border-amber-500/50 p-5 lg:p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-xl transition transform hover:-translate-y-1">
      <div>
        <div class="flex justify-between items-center mb-2">
          <span class="text-xs font-bold font-mono px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">${c.num}</span>
          <span class="text-xs text-slate-400 font-mono font-semibold">${c.exercise}</span>
        </div>
        <h4 class="text-base lg:text-lg font-black text-white mt-1">${c.name[currentLang]}</h4>
        <div class="text-xs text-emerald-400 font-semibold mt-1 flex items-center">
          <i class="fa-solid fa-bullseye mr-1.5"></i> ${c.focus[currentLang]}
        </div>
        <p class="text-sm text-slate-300 leading-relaxed mt-3 line-clamp-4">${c.sit[currentLang]}</p>
      </div>
      <button onclick="openCaseModal(${c.id})" class="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-black transition flex items-center justify-center gap-2 shadow-lg">
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
      <label class="text-sm text-slate-200 block mb-2 font-bold">${activeCase.inputLabel[currentLang]}</label>
      <input type="number" id="cm-input-field" placeholder="${activeCase.hint}" class="w-full bg-slate-900 border-2 border-slate-700 rounded-xl p-3 text-white font-mono text-base focus:border-amber-500 focus:outline-none">
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
    scoreTxt.className = "font-mono font-black text-emerald-400 text-base";
    fbTxt.innerText = activeCase.success[currentLang];
  } else {
    scoreTxt.innerText = currentLang === 'uz' ? "30 / 100 (Xato hisoblandi)" : "30 / 100 (Incorrect)";
    scoreTxt.className = "font-mono font-black text-rose-400 text-base";
    fbTxt.innerText = activeCase.fail[currentLang];
  }
  resBox.classList.remove('hidden');
}

function updateDuelUI() {
  const t = i18nData[currentLang];
  const pA = parseInt(document.getElementById('c_a_p').value);
  const pB = parseInt(document.getElementById('c_b_p').value);
  document.getElementById('v_a_p').innerText = pA.toLocaleString() + ' ' + t.currency;
  document.getElementById('v_b_p').innerText = pB.toLocaleString() + ' ' + t.currency;
}

function runDuelAction() {
  const pA = parseInt(document.getElementById('c_a_p').value);
  const pB = parseInt(document.getElementById('c_b_p').value);
  const t = i18nData[currentLang];

  let shareA = pA < pB ? 62 : (pA > pB ? 38 : 50);
  let shareB = 100 - shareA;
  let profitA = shareA * 650000;
  let profitB = shareB * 650000;

  document.getElementById('duel-res-box').innerHTML = `
    <div class="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-2">
      <div class="font-black text-emerald-400 text-base">
        ${pA < pB ? (currentLang==='uz'?'Uzum Express yutdi!':'Uzum Express Won!') : (pA > pB ? (currentLang==='uz'?'Yandex yutdi!':'Yandex Won!') : (currentLang==='uz'?'Durang natija!':'Tie / Draw!'))}
      </div>
      <div class="grid grid-cols-2 gap-4 text-sm pt-1">
        <div><strong>Uzum Express:</strong> ${shareA}% bozor ulushi (+${(profitA/1000000).toFixed(1)} ${t.mln_unit})</div>
        <div><strong>Yandex Express:</strong> ${shareB}% bozor ulushi (+${(profitB/1000000).toFixed(1)} ${t.mln_unit})</div>
      </div>
    </div>
  `;
}

window.onload = () => {
  renderCases();
  updateDuelUI();
};
