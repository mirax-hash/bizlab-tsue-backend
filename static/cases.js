const caseBank = [
  {
    id: 1,
    num: "№ 1",
    name: { uz: "Imkoniyatni aniqlash", en: "Opportunity Recognition" },
    focus: { uz: "Bozordagi muammo va ehtiyojni topish", en: "Uncovering market dislocations & unmet needs" },
    exercise: "Opportunity Recognition Challenge",
    sit: {
      uz: "AgroTech logistikasi: O'zbekiston viloyatlarida yetishtirilgan 300,000 tonna sarxil meva-sabzavotning 28%i sovutkichli transport infratuzilmasi yo'qligi sababli nobud bo'lmoqda. Dehqonlar hosilini arzon narxda sotishga yoki tashlab yuborishga majbur bo'lmoqda.",
      en: "Cold-chain Logistics: 28% of 300,000 tons of harvested produce in provincial Uzbekistan spoils due to lack of refrigerated fleets, forcing farmers into distressed fire sales."
    },
    prompt: {
      uz: "Umumiy salohiyatli bozor hajmi (TAM) tahlili: Agar 1 tonna mahsulotning o'rtacha ulgurji narxi 6,000,000 so'm bo'lsa, logistika yetishmasligi sababli bir yilda yo'qotilayotgan umumiy bozor hajmi (TAM) necha milliard so'mni tashkil etadi?",
      en: "Total Addressable Market (TAM): If wholesale price is 6,000,000 UZS/ton, calculate total annual spoiled market value in billions of UZS:"
    },
    inputLabel: { uz: "Yo'qotilgan bozor qiymati (mlrd so'mda):", en: "Lost Market Value (in bln UZS):" },
    val: 504,
    hint: "300,000 * 0.28 * 6,000,000 / 1,000,000,000",
    success: { uz: "To'g'ri! Yillik yo'qotish 504 milliard so'm. Bu logistika startapi uchun ulkan bozor imkoniyatidir.", en: "Correct! The annual market gap stands at 504 bln UZS, presenting massive opportunity." },
    fail: { uz: "Xato hisoblandi: 300,000 tonna * 28% * 6,000,000 so'm = 504 mlrd so'm.", en: "Incorrect: 300,000 * 28% * 6,000,000 = 504 bln UZS." }
  },
  {
    id: 2,
    num: "№ 2",
    name: { uz: "Innovatsion fikrlash", en: "Innovative Thinking" },
    focus: { uz: "Yangi yechim ishlab chiqish", en: "Synthesizing novel value solutions" },
    exercise: "Design Thinking Sprint",
    sit: {
      uz: "FinTech skoring: An'anaviy banklar mikrokredit berish uchun kichik tadbirkorlardan 14 kun davomida 12 xil qog'oz ma'lumotnoma talab qilmoqda. Har bir arizani tekshirish bankka 450,000 so'm operatsion xarajat keltirmoqda.",
      en: "FinTech Scoring: Traditional lenders mandate 14 days and 12 paper filings to evaluate merchant loans, costing 450,000 UZS in operating expenses per applicant."
    },
    prompt: {
      uz: "Operatsion xarajatlar tejamkorligi: Fiskal QR-cheklar orqali 3 daqiqada baholovchi AI-skoring joriy etilib, xarajat 90,000 so'mga tushirildi. Bank oyiga 2,000 ta arizani ko'rib chiqsa, innovatsiya hisobiga bir oyda qancha million so'm tejaladi?",
      en: "Operating Cost Reduction: Automated QR-receipt scoring slashes evaluation costs to 90,000 UZS. For 2,000 monthly applications, compute monthly savings in million UZS:"
    },
    inputLabel: { uz: "Oylik tejamkorlik (mln so'mda):", en: "Monthly Cost Savings (in mln UZS):" },
    val: 720,
    hint: "(450,000 - 90,000) * 2,000 / 1,000,000",
    success: { uz: "Mukammal! Oyiga 720 mln so'm operatsion xarajat tejaladi va kutish vaqti 3 daqiqaga qisqaradi.", en: "Superb! Saves 720m UZS monthly and compresses turnaround to 3 minutes." },
    fail: { uz: "Xato hisoblandi: (450,000 - 90,000) * 2,000 = 720 mln so'm.", en: "Incorrect: (450,000 - 90,000) * 2,000 = 720m UZS." }
  },
  {
    id: 3,
    num: "№ 3",
    name: { uz: "Biznes-model tuzish", en: "Business Model Canvas" },
    focus: { uz: "Qiymat taklifi, mijoz, daromad modeli", en: "Value proposition, customers, recurring revenue" },
    exercise: "Business Model Canvas",
    sit: {
      uz: "Quyosh energetikasi (BaaS obunasi): Korxonalar $20,000 to'lab uskuna sotib ololmayapti. Kompaniya BMC modelini o'zgartirib, panellarni bepul o'rnatib, tejangan elektr hisobidan har bir korxonadan oyiga $350 obuna to'lovi olishga o'tdi.",
      en: "CleanTech BaaS: Small enterprises lack $20,000 upfront capex. Restructuring the BMC model, the firm installs arrays for free and bills $350 monthly per subscriber."
    },
    prompt: {
      uz: "Yillik doimiy tushum (ARR): Dastlabki bosqichda 120 ta korxona ushbu obunaga ulandi. Kompaniyaning yillik doimiy takrorlanuvchi tushumi (ARR) necha ming dollarni tashkil etadi?",
      en: "Annual Recurring Revenue (ARR): 120 workshops enroll. Calculate total annual recurring revenue (ARR) in thousands of USD ($k):"
    },
    inputLabel: { uz: "Yillik ARR ($ mingda):", en: "Annual ARR (in $k):" },
    val: 504,
    hint: "120 * 350 * 12 / 1000",
    success: { uz: "To'g'ri! Yillik barqaror kassa oqimi $504,000 ni tashkil etadi.", en: "Correct! Generates $504,000 in predictable annual recurring cash flows." },
    fail: { uz: "Xato hisoblandi: 120 korxona * $350 * 12 oy = $504,000.", en: "Incorrect: 120 * $350 * 12 = $504k." }
  },
  {
    id: 4,
    num: "№ 4",
    name: { uz: "Moliyaviy kompetensiya", en: "Financial Competency" },
    focus: { uz: "Xarajat, cash-flow, BEP, ROI", en: "Cost structures, cash conversion & break-even" },
    exercise: "Startup Finance Case",
    sit: {
      uz: "Zararsizlik nuqtasi (BEP) hisobi: Yangi ishlab chiqarish sexining oylik doimiy xarajatlari 36,000,000 so'm. 1 dona mahsulotning sotuv narxi 80,000 so'm, o'zgaruvchan birlik tannarxi 50,000 so'm.",
      en: "Break-Even Analytics: Monthly fixed costs total 36,000,000 UZS. Retail price per unit is 80,000 UZS against 50,000 UZS variable manufacturing cost."
    },
    prompt: {
      uz: "Zararsizlik hajmini aniqlash: Korxona oylik xarajatlarini to'liq qoplab, zararsiz ishlashi uchun bir oyda kamida necha dona mahsulot sotishi zarur?",
      en: "Compute BEP Volume: Calculate the minimum monthly units required to reach operational break-even:"
    },
    inputLabel: { uz: "Zararsizlik hajmi (dona):", en: "Break-Even Volume (units):" },
    val: 1200,
    hint: "36,000,000 / (80,000 - 50,000)",
    success: { uz: "A'lo! 1,200 dona sotilganda korxona xarajatlari to'liq qoplanadi va sof foyda nolga teng bo'ladi.", en: "Excellent! 1,200 units fully absorbs overheads." },
    fail: { uz: "Xato hisoblandi: 36,000,000 / (80,000 - 50,000) = 1,200 dona.", en: "Incorrect: 36,000,000 / 30,000 = 1,200 units." }
  },
  {
    id: 5,
    num: "№ 5",
    name: { uz: "Riskni boshqarish", en: "Risk Management" },
    focus: { uz: "Riskni aniqlash va qaror qabul qilish", en: "Risk identification, mitigation & hedging" },
    exercise: "Business Simulation",
    sit: {
      uz: "Valyuta devalvatsiyasi va xedjirlash: Korxona chetdan $200,000 lik xomashyo import qiladi (to'lov 90 kundan keyin). Joriy kurs 12,800 so'm, kutilayotgan devalvatsiya 13,500 so'm. Moliya bo'limi bank bilan 13,000 so'mdan forvard shartnomasini imzoladi.",
      en: "Currency Risk Hedging: An enterprise imports $200,000 payable in 90 days. Spot is 12,800, expected spike is 13,500. The CFO hedges via a forward contract at 13,000."
    },
    prompt: {
      uz: "Xatarni pasaytirish samarasi: Forvard xedjirlash orqali korxona valyuta kursining keskin o'sishidan qancha million so'm potensial zarardan saqlanib qoldi?",
      en: "Capital Shielded: How much foreign exchange loss was neutralized via forward execution (in million UZS)?"
    },
    inputLabel: { uz: "Tejalgan mablag' (mln so'mda):", en: "Capital Shielded (in mln UZS):" },
    val: 100,
    hint: "(13,500 - 13,000) * 200,000 / 1,000,000",
    success: { uz: "To'g'ri! 100 million so'm potensial valyuta yo'qotishi to'liq bartaraf etildi.", en: "Correct! Neutralized 100 million UZS in foreign exchange exposure." },
    fail: { uz: "Xato hisoblandi: (13,500 - 13,000) * $200,000 = 100 mln so'm.", en: "Incorrect: (13,500 - 13,000) * 200k = 100m UZS." }
  },
  {
    id: 6,
    num: "№ 6",
    name: { uz: "Marketing va sotuv", en: "Marketing & Sales" },
    focus: { uz: "Segmentlash, narx, sotuv kanallari", en: "Unit economics, CAC to LTV optimization" },
    exercise: "Go-to-Market Challenge",
    sit: {
      uz: "Unit-iqtisodiyot: B2B startapi bitta mijoz jalb qilish uchun $180 sarflamoqda (CAC). Bitta mijoz o'rtacha 24 oy xizmatdan foydalanib, har oy $30 sof foyda keltiradi (LTV).",
      en: "Acquisition Economics: A venture spends $180 to acquire a corporate customer (CAC). Average customer lifespan spans 24 months, generating $30 monthly net margin (LTV)."
    },
    prompt: {
      uz: "LTV/CAC nisbati: Mijozning butun davrdagi sof qiymati (LTV) jalb qilish tannarxidan (CAC) necha barobar yuqori (karra ko'rsatkichi)?",
      en: "LTV/CAC Multiplier: Determine the multiple ratio comparing customer lifetime value to acquisition cost (X):"
    },
    inputLabel: { uz: "LTV/CAC nisbati (karra):", en: "LTV/CAC Multiplier (X):" },
    val: 4,
    hint: "(24 * 30) / 180 = 720 / 180",
    success: { uz: "A'lo! LTV = $720, nisbat esa 4.0 karra. Bu juda sog'lom va foydali ko'rsatkich.", en: "Superb! LTV is $720, yielding an optimal 4.0x ratio." },
    fail: { uz: "Xato hisoblandi: (24 * 30) / 180 = 4.0 karra.", en: "Incorrect: 720 / 180 = 4.0x." }
  },
  {
    id: 7,
    num: "№ 7",
    name: { uz: "Liderlik va muzokara", en: "Leadership & Negotiation" },
    focus: { uz: "Jamoa, konflikt, investor bilan muloqot", en: "Equity structuring, term-sheets & governance" },
    exercise: "Negotiation Role Play",
    sit: {
      uz: "Venchur muzokaralari: Asoschilar korxonaning dastlabki bozor qiymatini $1,500,000 deb baholadi (Pre-Money). Investor loyihaga $500,000 naqd investitsiya kiritdi.",
      en: "Venture Term Sheet: Founders assess pre-money enterprise valuation at $1,500,000. An investor injects $500,000 in equity growth capital."
    },
    prompt: {
      uz: "Nazorat ulushi: Investitsiya kiritilgach (Post-Money), ta'sischilar jamoasida korxonaning necha foiz nazorat paketi qoladi?",
      en: "Founder Equity Retained: What percentage of total post-financing equity remains under founders control?"
    },
    inputLabel: { uz: "Ta'sischilar ulushi (%):", en: "Founders Equity Stake (%):" },
    val: 75,
    hint: "(1,500,000 / (1,500,000 + 500,000)) * 100",
    success: { uz: "To'g'ri! Post-Money $2.0M bo'lib, ta'sischilar 75% nazorat ulushini saqlab qoladi.", en: "Accurate! Post-money is $2.0M, leaving founders with 75% governing equity." },
    fail: { uz: "Xato hisoblandi: (1.5M / 2.0M) * 100 = 75%.", en: "Incorrect: (1.5M / 2.0M) * 100 = 75%." }
  },
  {
    id: 8,
    num: "№ 8",
    name: { uz: "Amalga oshirish", en: "Execution & Scaling" },
    focus: { uz: "G'oyani MVP va biznesga aylantirish", en: "MVP validation, cash burn & runway governance" },
    exercise: "Startup Capstone Project",
    sit: {
      uz: "Kassa barqarorligi (Runway): Yangi startap hisobida $45,000 miqdorida erkin pul zaxirasi mavjud. Korxonaning oylik sof xarajati (Net Burn Rate) $5,000 ni tashkil etadi.",
      en: "Cash Runway Horizon: A venture maintains $45,000 in treasury reserves. Operational burn rate averages $5,000 net monthly cash outflow."
    },
    prompt: {
      uz: "Runway muddati: Korxona yangi sarmoyasiz o'z hisobidagi pul bilan yana necha oy erkin faoliyat yurita oladi?",
      en: "Compute Runway: How many months can operations continue before zero cash balance?"
    },
    inputLabel: { uz: "Runway muddati (oy):", en: "Cash Runway (months):" },
    val: 9,
    hint: "45,000 / 5,000",
    success: { uz: "To'g'ri! Mavjud kassa zaxirasi 9 oyga yetadi. Bu muddat to'liq o'zini oqlash uchun yetarlidir.", en: "Correct! Liquid reserves sustain the enterprise for 9 months." },
    fail: { uz: "Xato hisoblandi: 45,000 / 5,000 = 9 oy.", en: "Incorrect: 45,000 / 5,000 = 9 months." }
  }
];
