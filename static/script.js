let currentLang = 'uz';
    let duelRound = 1;
    let treasuryA = 250000000;
    let treasuryB = 250000000;
    let duelPieInst = null;
    let duelBarInst = null;
    let classicBarInst = null;
    let classicPieInst = null;
    let eoqChartInst = null;
    let boardChartInst = null;

    let missions = [];
    let activeMission = null;
    let activeShock = null;
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

    function formatYouTubeEmbedUrl(url) {
      if (!url) return '';
      if (url.includes('youtube.com/embed/')) return url;
      if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1]?.split('?')[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      if (url.includes('watch?v=')) {
        const id = url.split('watch?v=')[1]?.split('&')[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      return url;
    }

    const i18n = {
      uz: {
        hdr_sub: "Toshkent Davlat Iqtisodiyot Universiteti — 8 Kompetensiyali Virtual Laboratoriya",
        t_cases: "1-Qism: 8 Kompetensiya",
        t_battle: "1. Bozor Jangi",
        t_lab: "2. Milliy Keyslar",
        t_forensic: "3. Balans Auditi",
        t_eoq: "4. Optimal Zaxira",
        t_pricing: "5. Dinamik Narx",
        t_security: "6. Iqtisodiy Xavfsizlik",
        t_board: "Boshqaruv Kengashi",
        goal_badge: "LABORATORIYA METODOLOGIYASI",
        goal_main_title: "Virtual Laboratoriyaning Maqsad va Vazifalari",
        goal_main_desc: "Toshkent davlat iqtisodiyot universiteti talaba va yosh tadqiqotchilarida real iqtisodiy xatarlar, oligopolistik bozorlar va inqirozli vaziyatlarda qaror qabul qilish ko‘nikmalarini shakllantiruvchi amaliy-simulyatsion muhit.",
        goal_kpi_badge: "TDIU 2026 Standarti",
        goal_task1_t: "1. Miqdoriy Tahlil & Bozor",
        goal_task1_d: "Kurno va Bertran oligopoliya modellarida narx elastikligi va marketing byudjetining bozor ulushiga ta'sirini modellashtirish.",
        goal_task2_t: "2. Balans & Kassa Qutqaruvi",
        goal_task2_d: "Inqirozdagi korxonalarda kassa uzilishini (Cash-gap) 4 ta moliyaviy richag orqali bartaraf etish va likvidlikni ta'minlash.",
        goal_task3_t: "3. Zaxiralar & Ta'minot (EOQ)",
        goal_task3_d: "Vilson modeli asosida optimal buyurtma partiyasi, xavfsizlik buferi va ta'minot zanjiri xarajatlari minimumini topish.",
        goal_task4_t: "4. Xavfsizlik & C-Level Himoya",
        goal_task4_d: "Valyuta devalvatsiyasi va tarif shoklariga qarshi stress-test o'tkazish, AI-ekspert va Boshqaruv Kengashi oldida natijalarni himoyalash.",
        c_badge: "RASMIY MATRITSA STANDARTI",
        c_title: "8 Asosiy Tadbirkorlik Kompetensiyasi Keyslari",
        c_desc: "Bakalavriat va Magistratura bosqichi: Bozor tahlili, iqtisodiy formulalar va amaliy hisob-kitoblar.",
        c_count: "Jami: 8 ta Akademik Keys",
        btn_solve: "Keysni Yechish",
        m1_badge: "RAQOBAT ARENASI",
        m1_v_btn: "Video Dars",
        m1_g_btn: "Metodik Qo'llanma",
        m1_h_title: "Uzum Express VS Yandex/Express24: Narx va Bozor Ulushi Raqobati",
        m1_h_desc: "Kurno va Bertran oligopoliya modellari asosidagi deterministik narx jangi.",
        m1_round_title: "Raund Bosqichi:",
        m1_team1: "1-Jamoa: Uzum Express",
        m1_team2: "2-Jamoa: Yandex / Express24",
        kassa: "Erkin Kassa:",
        m1_p: "Yetkazib berish narxi:",
        m1_m: "Marketing byudjeti:",
        m1_q: "Xizmat sifati investitsiyasi:",
        m1_btn_duel: "RAUND RAQOBAT NATIJASINI HISOBLASH (JANG!)",
        m1_placeholder: "Ikkala jamoa narx va byudjet parametrlarini belgilab, hisoblash tugmasini bosing.",
        orders: "Buyurtmalar:",
        net_profit: "Sof Foyda:",
        market_share: "Egallaangan Bozor Ulushi (%)",
        net_profit_chart: "Yalpi Sof Foyda",
        nat_bank: "Milliy Keyslar Banki",
        nat_shocks: "Bozor Xatarlari (Fors-major)",
        sector_badge: "Soha Yo'nalishi",
        s1: "1. Dars",
        s2: "2. Test",
        s3: "3. Simulyatsiya",
        s4: "4. SI Himoyasi",
        task_content: "Masala Mazmuni:",
        btn_next_quiz: "Testga o'tish →",
        quiz_h: "Vaziyatli Bilim Sinovi",
        btn_quiz_check: "Tekshirish",
        sim_h: "Iqtisodiy Boshqaruv Simulyatori",
        shock_alert: "Kutilmagan Fors-major Xatari!",
        btn_next_ai: "Ekspert bilan himoyaga o'tish →",
        ai_prof_h: "Ilmiy Ekspert oldida Qarorlar Himoyasi (3 Bosqich)",
        step_lbl: "Bosqich",
        initial_ai_speech: "Assalomu alaykum! Simulyatsiya natijalaringizni ko'rib chiqdim. Ushbu iqtisodiy parametrlarni qanday dalillaysiz? Tanlangan yondashuv birlik tannarxiga qanday ta'sir qildi?",
        chat_placeholder: "Iqtisodiy dalillaringizni yozing...",
        btn_chat_send: "Yuborish",
        cert_univ: "TOSHKENT DAVLAT IQTISODIYOT UNIVERSITETI",
        cert_dept: "Biznes boshqaruvi va iqtisodiy xavfsizlik kafedrasi",
        cert_badge: "TASDIQLANGAN SERTIFIKAT",
        cert_heading: "STRATEGIK BOSHQARUV QARORLARI HIMOYASI SERTIFIKATI",
        cert_desc: "Ushbu hujjat talaba tomonidan virtual laboratoriyada keys tahlili va ilmiy himoyasi muvaffaqiyatli yakunlanganini tasdiqlaydi.",
        cert_user: "Tadqiqotchi",
        cert_score: "Umumiy Ball",
        cert_date: "Sana",
        btn_print_cert: "Chop etish (PDF)",
        m3_badge: "3-MODUL: BALANS TAHLILI",
        m3_h_title: "Inqirozdagi Korxona Balansini Qutqarish & Kassa Uzilishi Auditi",
        m3_h_desc: "Dastlabki kassa defitsiti: -60 mln so'm/oy. Xarajatlar va qarz majburiyatlarini qayta taqsimlang.",
        anti_levers: "Inqirozga Qarshi Richaglar",
        m3_admin: "Ma'muriy-boshqaruv xarajatlarini qisqartirish:",
        m3_debt: "Kredit qarzini to'lash muddatini uzaytirish:",
        m3_staff: "Shtatlar sonini optimallashtirish:",
        m3_inv: "Sekin aylanuvchi tovar qoldiqlarini naqdlashtirish:",
        audit_summary: "Moliyaviy Audit Xulosasi",
        init_gap: "Dastlabki Kassa Defitsiti:",
        saved_mon: "Oylik tejalgan xarajatlar:",
        final_cf: "Yakuniy Sof Pul Oqimi:",
        m4_badge: "4-MODUL: TA'MINOT LOGISTIKASI",
        m4_h_title: "Optimal Buyurtma Hajmi va Zaxiralar Boshqaruvi (EOQ)",
        m4_h_desc: "Parametrlarni o'zgartiring — optimal buyurtma partiyasi va xarajatlar balansi avtomatik hisoblanadi.",
        m4_d: "Yillik xomashyo talabi (Birlikda):",
        m4_s: "Bitta buyurtmani yetkazish xarajati:",
        m4_h: "1 birlik tovarning yillik saqlash xarajati:",
        m4_l: "Yetkazib berish muddati (Kun):",
        eoq_math_h: "Zaxiralar Matematik Xulosasi",
        live_calc: "Jonli hisob",
        eoq_res_val: "Optimal buyurtma hajmi:",
        eoq_res_ord: "Yillik buyurtmalar soni:",
        eoq_res_safe: "Kafolatlangan xavfsizlik zaxirasi:",
        eoq_res_rop: "Qayta buyurtma berish nuqtasi:",
        eoq_res_cost: "Yillik saqlash xarajati:",
        eoq_chart_h: "Buyurtma va Saqlash Xarajatlari Balansi",
        m5_badge: "5-MODUL: NARX STRATEGIYASI",
        m5_h_title: "Talabning Narx Elastikligi Asosida Dinamik Narx Belgilash",
        m5_h_desc: "Narx o'zgarishi darajasi va talab reaksiyasining sof marjaga ta'siri.",
        m5_change: "Baza narxining o'zgarishi (%):",
        m5_ed: "Talab elastikligi koeffitsiyenti (Ed):",
        m5_res_p: "Yangi hisoblangan sotuv narxi:",
        m5_res_v: "Prognoz qilinayotgan sotuv hajmi:",
        m5_res_prof: "Sof Foyda O'zgarishi:",
        m6_badge: "6-MODUL: IQTISODIY XAVFSIZLIK",
        m6_h_title: "Iqtisodiy Xavfsizlik & Moliyaviy Barqarorlik Stress-Testi",
        m6_h_desc: "Valyuta kursi devalvatsiyasi va bojxona to'siqlari sharoitida korxona barqarorlik ko'rsatkichi.",
        m6_fx: "Milliy valyuta devalvatsiyasi (%):",
        m6_tax: "Import bojxona boji stavkasi (%):",
        m6_fund: "Favqulodda zaxira va komplayens fondi:",
        m6_risk: "Jami Moliyaviy Xavf Yuklamasi:",
        m6_score: "Chidamlilik va Omon Qolish Indeksi:",
        m7_badge: "BOSHQARUV KENGASHI",
        btn_v_board: "Taqdimot Darsi",
        btn_g_board: "Kengash Qo'llanmasi",
        m7_h_title: "Aksiyadorlar va Boshqaruv Kengashiga Strategik Taqdimot",
        m7_h_desc: "Oldingi 6 ta modul qarorlari sintezi, korxona bozor kapitallashuvi va mustaqil direktorlar retsenziyalari.",
        btn_board_refresh: "Kengash Bahosini Yangilash",
        b_ebitda: "Yillik Operatsion Foyda (EBITDA):",
        b_val: "Korxona Bozor Kapitallashuvi:",
        b_score: "Kengashning Boshqaruv Bahosi:",
        b_verdict: "Yakuniy Kengash Qarori:",
        c_level_h: "Mustaqil C-Level Direktorlar Kengashi Xulosasi",
        chart_val_h: "3 Yillik Kapitallashuv Dinamikasi",
        btn_print_deck: "Strategik Memorandumni Chop Etish (PDF)",
        level_lbl: "DARAJA",
        cs_sit_h: "Bozor Vaziyati:",
        cs_task_h: "Iqtisodiy Masala & Hisob-kitob:",
        btn_verify: "Tekshirish va Baholash",
        btn_close: "Yopish",
        verdict_lbl: "Natija:",
        currency: "so'm",
        qty_unit: "dona",
        orders_unit: "ta",
        times_unit: "marta",
        mln_unit: "mln so'm"
      },
      en: {
        hdr_sub: "Tashkent State University of Economics — 8 Competency Virtual Laboratory",
        t_cases: "Part 1: 8 Competencies",
        t_battle: "1. Market Battle",
        t_lab: "2. National Cases",
        t_forensic: "3. Balance Audit",
        t_eoq: "4. Supply & EOQ",
        t_pricing: "5. Dynamic Pricing",
        t_security: "6. Economic Security",
        t_board: "Board of Directors",
        goal_badge: "LABORATORY METHODOLOGY",
        goal_main_title: "Mission and Strategic Objectives of Virtual Lab",
        goal_main_desc: "A simulation environment engineered for TSUE researchers to cultivate quantitative agility, oligopolistic resilience, and corporate turnaround capabilities.",
        goal_kpi_badge: "TSUE 2026 Standard",
        goal_task1_t: "1. Quantitative Modeling",
        goal_task1_d: "Simulating Bertrand and Cournot duopoly equilibria, pricing elasticity, and marketing allocation curves.",
        goal_task2_t: "2. Balance Sheet Workout",
        goal_task2_d: "Eliminating severe operating cash runway deficits across 4 core corporate turnaround levers.",
        goal_task3_t: "3. Supply Chain (EOQ)",
        goal_task3_d: "Optimizing batch sizes, safety buffers, and holding costs using the foundational Wilson inventory model.",
        goal_task4_t: "4. Economic Security & Defense",
        goal_task4_d: "Stress-testing enterprise solvency against currency shocks and defending theses before AI Faculty.",
        c_badge: "OFFICIAL MATRIX STANDARD",
        c_title: "8 Core Entrepreneurship Competency Case Studies",
        c_desc: "Undergraduate and Graduate Level: Quantitative market analysis, business modeling, and calculations.",
        c_count: "Total: 8 Academic Cases",
        btn_solve: "Solve Case Study",
        m1_badge: "COMPETITION ARENA",
        m1_v_btn: "Video Brief",
        m1_g_btn: "Executive Guide",
        m1_h_title: "Uzum Express VS Yandex/Express24: Price & Market Share Clash",
        m1_h_desc: "Cournot & Bertrand game-theoretic duopoly competition simulation.",
        m1_round_title: "Tournament Round:",
        m1_team1: "Team 1: Uzum Express",
        m1_team2: "Team 2: Yandex / Express24",
        kassa: "Liquid Treasury:",
        m1_p: "Delivery Tariff Price:",
        m1_m: "Marketing Budget:",
        m1_q: "Infrastructure Quality Outlay:",
        m1_btn_duel: "CALCULATE DUEL ROUND OUTCOME (DUEL!)",
        m1_placeholder: "Set price and marketing parameters for both teams, then click calculate.",
        orders: "Completed Deliveries:",
        net_profit: "Net Margin:",
        market_share: "Captured Market Share (%)",
        net_profit_chart: "Cumulative Net Profit",
        nat_bank: "National Case Bank",
        nat_shocks: "Market Disruptions (Force-Majeure)",
        sector_badge: "Sector Track",
        s1: "1. Lecture",
        s2: "2. Quiz",
        s3: "3. Simulation",
        s4: "4. AI Defense",
        task_content: "Task Brief:",
        btn_next_quiz: "Proceed to Quiz →",
        quiz_h: "Case-based Competency Quiz",
        btn_quiz_check: "Verify",
        sim_h: "Economic Simulation Engine",
        shock_alert: "Critical Force-Majeure Shock Alert!",
        btn_next_ai: "Proceed to Faculty Defense →",
        ai_prof_h: "Executive Defense Before AI Faculty (3 Rounds)",
        step_lbl: "Round",
        initial_ai_speech: "Welcome! I have evaluated your strategic simulation outputs. How do you defend these operational figures? How did your policy impact marginal unit costs?",
        chat_placeholder: "Type your economic arguments...",
        btn_chat_send: "Transmit",
        cert_univ: "TASHKENT STATE UNIVERSITY OF ECONOMICS",
        cert_dept: "Department of Business Administration & Economic Security",
        cert_badge: "OFFICIALLY VERIFIED CERTIFICATE",
        cert_heading: "STRATEGIC GOVERNANCE DEFENSE CERTIFICATE",
        cert_desc: "This credential certifies successful completion of enterprise simulation and academic defense.",
        cert_user: "Researcher",
        cert_score: "Final Score",
        cert_date: "Date",
        btn_print_cert: "Download Certificate (PDF)",
        m3_badge: "MODULE 3: BALANCE TURNAROUND",
        m3_h_title: "Distressed Balance Sheet Turnaround & Cash Runway Audit",
        m3_h_desc: "Baseline liquidity shortfall: -60m UZS/mo. Restructure working capital and debt maturities.",
        anti_levers: "Turnaround Levers",
        m3_admin: "Trim General & Administrative Overhead:",
        m3_debt: "Extend Debt Maturity Horizon:",
        m3_staff: "Headcount Rationalization:",
        m3_inv: "Liquidate Slow-Moving Inventory Buffer:",
        audit_summary: "Forensic Audit Summary",
        init_gap: "Baseline Cash Gap Deficit:",
        saved_mon: "Monthly Savings:",
        final_cf: "Net Operating Cash Flow:",
        m4_badge: "MODULE 4: SUPPLY LOGISTICS",
        m4_h_title: "Economic Order Quantity (EOQ) and Inventory Governance",
        m4_h_desc: "Adjust supply chain levers — batch sizing and total holding cost balance update automatically.",
        m4_d: "Annual Inventory Demand (Units):",
        m4_s: "Order Placement & Inbound Cost:",
        m4_h: "Annual Unit Carrying & Holding Cost:",
        m4_l: "Lead Time (Days):",
        eoq_math_h: "Inventory Optimization Output",
        live_calc: "Live calculation",
        eoq_res_val: "Optimal Batch Size (EOQ):",
        eoq_res_ord: "Annual Order Frequency:",
        eoq_res_safe: "Safety Stock Buffer:",
        eoq_res_rop: "Reorder Point (ROP):",
        eoq_res_cost: "Annual Inventory Holding Cost:",
        eoq_chart_h: "Order Placement vs Holding Cost Balance",
        m5_badge: "MODULE 5: PRICING STRATEGY",
        m5_h_title: "Price Elasticity-Driven Dynamic Pricing",
        m5_h_desc: "Price elasticity sensitivity across demand contraction and gross margin expansion.",
        m5_change: "Base Price Delta (%):",
        m5_ed: "Price Elasticity Coefficient (Ed):",
        m5_res_p: "Optimized Output Price:",
        m5_res_v: "Forecasted Volume Demand:",
        m5_res_prof: "Profit Trajectory Delta:",
        m6_badge: "MODULE 6: ECONOMIC SECURITY",
        m6_h_title: "Economic Security & Compliance Stress-Testing",
        m6_h_desc: "Enterprise solvency and liquidity resilience amidst FX devaluations and tariff spikes.",
        m6_fx: "Currency Devaluation Shock (%):",
        m6_tax: "Import Customs Surcharge (%):",
        m6_fund: "Emergency Liquidity Reserve Fund:",
        m6_risk: "Total Risk Exposure:",
        m6_score: "Survival and Resilience Index:",
        m7_badge: "BOARD OF DIRECTORS",
        btn_v_board: "Pitch Tutorial",
        btn_g_board: "Board Guide",
        m7_h_title: "Strategic Board of Directors Presentation",
        m7_h_desc: "Cross-module synthesis, enterprise capitalization valuation, and C-Level audit reviews.",
        btn_board_refresh: "Refresh Board Valuation",
        b_ebitda: "Annualized Operating Margin (EBITDA):",
        b_val: "Enterprise Capitalization Valuation:",
        b_score: "Executive Governance Score:",
        b_verdict: "Definitive Board Verdict:",
        c_level_h: "Independent C-Level Board of Directors Audit",
        chart_val_h: "3-Year Valuation Trajectory",
        btn_print_deck: "Print Executive Memorandum (PDF)",
        level_lbl: "LEVEL",
        cs_sit_h: "Market Dislocation Brief (Situation):",
        cs_task_h: "Quantitative Assignment & Formulas:",
        btn_verify: "Validate Solution",
        btn_close: "Close",
        verdict_lbl: "Verdict:",
        currency: "UZS",
        qty_unit: "units",
        orders_unit: "orders",
        times_unit: "times",
        mln_unit: "m UZS"
      }
    };

    const caseBank = [
      {
        id: 1,
        num: "№ 1",
        name: { uz: "Imkoniyatni aniqlash", en: "Opportunity Recognition" },
        focus: { uz: "Bozordagi muammo va ehtiyojni topish", en: "Uncovering market dislocations & unmet needs" },
        exercise: "Opportunity Recognition Challenge",
        sit: {
          uz: "AgroTech logistikasi: O'zbekiston viloyatlarida yetishtirilgan 300,000 tonna sarxil meva-sabzavotning 28%i sovutkichli transport infratuzilmasi yo'qligi sababli nobud bo'lmoqda. Dehqonlar hosilini arzon narxda sotishga yoki tashlab yuborishga majbur bo'lmoqda.",
          en: "Cold-chain Logistics: 28% of 300,000 tons of harvested produce in provincial Uzbekistan spoils due to lack of refrigerated fleets, forcing farmers into distressed sales."
        },
        prompt: {
          uz: "Umumiy salohiyatli bozor hajmi (TAM) tahlili: Agar 1 tonna mahsulotning o'rtacha ulgurji narxi 6,000,000 so'm bo'lsa, logistika yetishmasligi sababli bir yilda yo'qotilayotgan umumiy bozor hajmi (TAM) necha milliard so'mni tashkil etadi?",
          en: "Total Addressable Market (TAM): If wholesale price is 6,000,000 UZS/ton, calculate total annual spoiled market value in billions of UZS:"
        },
        inputLabel: { uz: "Yo'qotilgan bozor qiymati (mlrd so'mda):", en: "Lost Market Value (in bln UZS):" },
        val: 504,
        hint: "300,000 * 0.28 * 6,000,000 / 1,000,000,000",
        success: { uz: "To'g'ri! Yillik yo'qotish 504 milliard so'm. Bu logistika startapi uchun ulkan bozor imkoniyatidir.", en: "Correct! The annual market gap stands at 504 billion UZS, presenting massive opportunity." },
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
          en: "FinTech Scoring: Traditional lenders mandate 14 days and 12 paper filings to evaluate merchant loans, costing 450,000 UZS in operational expenses per applicant."
        },
        prompt: {
          uz: "Operatsion xarajatlar tejamkorligi: Fiskal QR-cheklar orqali 3 daqiqada baholovchi AI-skoring joriy etilib, xarajat 90,000 so'mga tushirildi. Bank oyiga 2,000 ta arizani ko'rib chiqsa, bir oyda qancha million so'm tejaladi?",
          en: "Operating Cost Reduction: Automated QR-receipt scoring slashes evaluation costs to 90,000 UZS. For 2,000 monthly applications, compute monthly savings in million UZS:"
        },
        inputLabel: { uz: "Oylik tejamkorlik (mln so'mda):", en: "Monthly Cost Savings (in mln UZS):" },
        val: 720,
        hint: "(450,000 - 90,000) * 2,000 / 1,000,000",
        success: { uz: "Mukammal! Oyiga 720 mln so'm operatsion xarajat tejaladi va kutish vaqti 3 daqiqaga qisqaradi.", en: "Superb! Saves 720 million UZS monthly and compresses turnaround to 3 minutes." },
        fail: { uz: "Xato hisoblandi: (450,000 - 90,000) * 2,000 = 720 mln so'm.", en: "Incorrect: (450,000 - 90,000) * 2,000 = 720m UZS." }
      },
      {
        id: 3,
        num: "№ 3",
        name: { uz: "Biznes-model tuzish", en: "Business Model Canvas" },
        focus: { uz: "Qiymat taklifi, mijoz, daromad modeli", en: "Value propositions & recurring models" },
        exercise: "Business Model Canvas",
        sit: {
          uz: "Quyosh energetikasi (BaaS obunasi): Korxonalar $20,000 to'lab uskuna sotib ololmayapti. Kompaniya panellarni bepul o'rnatib, tejangan elektr hisobidan har bir korxonadan oyiga $350 xizmat to'lovi olishga o'tdi.",
          en: "CleanTech BaaS: Small enterprises lack $20,000 upfront capex. Restructuring the model, the company installs panels free of charge and charges a recurring $350/mo utility subscription."
        },
        prompt: {
          uz: "Yillik doimiy tushum (ARR): Dastlabki bosqichda 120 ta korxona ushbu obunaga ulandi. Kompaniyaning yillik doimiy takrorlanuvchi tushumi (ARR) necha ming dollarni tashkil etadi?",
          en: "Annual Recurring Revenue (ARR): 120 workshops subscribe. Compute the enterprise's total annual recurring revenue (ARR) in thousands of USD ($):"
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
        focus: { uz: "Xarajat, cash-flow, BEP, ROI", en: "Cost structures & break-even" },
        exercise: "Startup Finance Case",
        sit: {
          uz: "Zararsizlik nuqtasi (BEP) hisobi: Yangi ishlab chiqarish sexining oylik doimiy xarajatlari 36,000,000 so'm. 1 dona mahsulot sotuv narxi 80,000 so'm, o'zgaruvchan tannarxi 50,000 so'm.",
          en: "Break-Even Analytics: Monthly fixed costs total 36,000,000 UZS. Retail price per unit is 80,000 UZS against 50,000 UZS variable manufacturing cost."
        },
        prompt: {
          uz: "Zararsizlik hajmi: Korxona oylik xarajatlarini to'liq qoplab, zararsiz ishlashi uchun bir oyda kamida necha dona mahsulot sotishi zarur?",
          en: "Break-Even Threshold: Calculate the minimum monthly production units required to reach operational break-even:"
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
        focus: { uz: "Riskni aniqlash va qaror qabul qilish", en: "Risk identification & hedging" },
        exercise: "Business Simulation",
        sit: {
          uz: "Valyuta devalvatsiyasi va xedjirlash: Korxona chetdan $200,000 lik xomashyo import qiladi (to'lov 90 kundan keyin). Joriy kurs 12,800 so'm, kutilayotgan kurs 13,500 so'm. Kompaniya bank bilan 13,000 so'mdan forvard bitimi tuzdi.",
          en: "Currency Risk Hedging: An enterprise imports $200,000 payable in 90 days. Spot is 12,800, expected spike is 13,500. The CFO hedges via a forward contract at 13,000."
        },
        prompt: {
          uz: "Xatarni pasaytirish samarasi: Forvard xedjirlash orqali korxona valyuta kursining oshishidan qancha million so'm potensial zarardan saqlanib qoldi?",
          en: "Hedging Efficiency: Compute the amount of exchange rate loss mitigated via the forward contract (in million UZS):"
        },
        inputLabel: { uz: "Tejalgan mablag' (mln so'mda):", en: "Mitigated Loss (in mln UZS):" },
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
          uz: "Unit-iqtisodiyot: Korxona bitta mijoz jalb qilish uchun $180 sarflamoqda (CAC). Mijoz o'rtacha 24 oy davomida har oy $30 sof foyda keltiradi (LTV).",
          en: "Acquisition Economics: A venture spends $180 to acquire a corporate customer (CAC). Average customer lifespan spans 24 months, generating $30 monthly net margin (LTV)."
        },
        prompt: {
          uz: "LTV/CAC nisbati: Mijozning butun davrdagi sof qiymati (LTV) jalb qilish tannarxidan (CAC) necha barobar yuqori (karra nisbati)?",
          en: "LTV-to-CAC Ratio: Calculate the multiple ratio comparing customer lifetime value to customer acquisition cost (X):"
        },
        inputLabel: { uz: "LTV/CAC nisbati (karra):", en: "LTV/CAC Multiplier (X):" },
        val: 4,
        hint: "(24 * 30) / 180 = 720 / 180",
        success: { uz: "A'lo! LTV = $720, nisbat 4.0 karra. Bu juda sog'lom va foydali marketing modelidir.", en: "Superb! LTV is $720, yielding an exceptional 4.0x ratio." },
        fail: { uz: "Xato hisoblandi: 720 / 180 = 4.0x.", en: "Incorrect: 720 / 180 = 4.0x." }
      },
      {
        id: 7,
        num: "№ 7",
        name: { uz: "Liderlik va muzokara", en: "Leadership & Negotiation" },
        focus: { uz: "Jamoa, konflikt, investor bilan muloqot", en: "Equity structuring, term-sheets & governance" },
        exercise: "Negotiation Role Play",
        sit: {
          uz: "Investitsiya muzokaralari: Asoschilar korxonaning dastlabki bozor qiymatini $1,500,000 deb baholadi. Muzokaralar natijasida investor $500,000 to'g'ridan-to'g'ri investitsiya kiritdi.",
          en: "Cap-Table Negotiation: Founders assess pre-money enterprise valuation at $1,500,000. An investor injects $500,000 in equity growth capital."
        },
        prompt: {
          uz: "Ta'sischilarning nazorat ulushi: Investitsiya kiritilgandan so'ng yangi bozor kapitallashuvi sharoitida ta'sischilar jamoasida necha foiz nazorat ulushi qoladi?",
          en: "Founder Equity Retained: What percentage of total post-financing equity remains under founders control?"
        },
        inputLabel: { uz: "Ta'sischilar ulushi (%):", en: "Founders Equity Stake (%):" },
        val: 75,
        hint: "(1,500,000 / (1,500,000 + 500,000)) * 100",
        success: { uz: "To'g'ri! Yangi kapitallashuv $2.0M bo'lib, ta'sischilar 75% nazorat ulushini to'liq saqlab qoladi.", en: "Accurate! Post-money is $2.0M, leaving founders with 75% governing equity." },
        fail: { uz: "Xato hisoblandi: (1.5M / 2.0M) * 100 = 75%.", en: "Incorrect: (1.5M / 2.0M) * 100 = 75%." }
      },
      {
        id: 8,
        num: "№ 8",
        name: { uz: "Amalga oshirish", en: "Execution & Scaling" },
        focus: { uz: "G'oyani MVP va biznesga aylantirish", en: "MVP validation, cash burn & runway governance" },
        exercise: "Startup Capstone Project",
        sit: {
          uz: "Kassa barqarorligi (Runway): Yangi startap hisobida $45,000 miqdorida erkin pul zaxirasi mavjud. Korxonaning oylik sof operatsion xarajati $5,000 ni tashkil etadi.",
          en: "MVP Cash Runway: A venture maintains $45,000 in treasury reserves. Operational burn rate averages $5,000 net monthly cash outflow."
        },
        prompt: {
          uz: "Runway muddati: Korxona yangi qarz yoki investitsiyalarsiz o'z hisobidagi pul bilan yana necha oy faoliyat yurita oladi?",
          en: "Cash Runway Horizon: How many months can the venture sustain operations prior to depleting available liquid reserves?"
        },
        inputLabel: { uz: "Barqarorlik muddati (oy):", en: "Runway Horizon (months):" },
        val: 9,
        hint: "45,000 / 5,000",
        success: { uz: "To'g'ri! Mavjud kassa zaxirasi 9 oyga yetadi. Bu muddat mahsulotni to'liq sotuvga chiqarish uchun yetarli.", en: "Correct! Liquid reserves extend 9 months." },
        fail: { uz: "Xato hisoblandi: 45,000 / 5,000 = 9 oy.", en: "Incorrect: 45,000 / 5,000 = 9 months." }
      }
    ];

    const moduleResources = {
      battle: {
        title: { uz: "1-Modul: Bozor Jangi (Uzum vs Yandex)", en: "Module 1: Market Battle (Uzum vs Yandex)" },
        video_url: "https://www.youtube.com/embed/13m3B2uRk1w",
        video: { uz: "Kurno va Bertran oligopoliya modellari: Narx raqobati, xizmat ko'rsatish sifati va bozor ulushini taqsimlash mexanizmlari.", en: "Cournot & Bertrand Duel: Price wars, service latency and market distribution." },
        guide: { uz: "Metodik qo'llanma: Narx elastikligi, mijozni jalb qilish tannarxi va marketing byudjetini taqsimlash.", en: "Executive Guide: Elasticity curves, CAC allocation and marketing optimization." }
      },
      lab: {
        title: { uz: "2-Modul: Milliy Keyslar (Uzum, Korzinka, BYD)", en: "Module 2: National Cases (Uzum, Korzinka, BYD)" },
        video_url: "https://www.youtube.com/embed/5N370w3TqFk",
        video: { uz: "O'zbekiston yirik korxonalarining ta'minot zanjiri va ichki mahalliylashtirish tajribasi.", en: "Supply chain integration and domestic localization playbooks." },
        guide: { uz: "Metodik qo'llanma: Chakana savdo tarmoqlari, sanoat lokalizatsiyasi va ilmiy himoya standarti.", en: "Executive Guide: Retail chains, auto localization and AI defense protocol." }
      },
      forensic: {
        title: { uz: "3-Modul: Balans Auditi & Kassa Qutqaruvi", en: "Module 3: Forensic Balance Turnaround" },
        video_url: "https://www.youtube.com/embed/FwT0K7Pq3b8",
        video: { uz: "Kassa uzilishini (defitsitni) bartaraf etish, aylanma mablag'larni undirish va xarajatlarni 20% qisqartirish yo'riqnomasi.", en: "Remediating working capital gaps and executing 20% overhead cuts." },
        guide: { uz: "Metodik qo'llanma: Korxona balansi auditi, sekin aylanuvchi tovarlarni naqdlashtirish va qarz yuklamasini yengillatish.", en: "Executive Guide: Distressed balance forensic auditing and debt workout." }
      },
      eoq: {
        title: { uz: "4-Modul: Optimal Zaxira Modeli", en: "Module 4: Supply Chain & EOQ" },
        video_url: "https://www.youtube.com/embed/w8m4-W4iC5o",
        video: { uz: "Vilson formulasi: Iqtisodiy jihatdan optimal buyurtma hajmi, saqlash xarajati va xavfsizlik zaxirasi balansi.", en: "Wilson formula: Optimal batch sizing and safety inventory calibration." },
        guide: { uz: "Metodik qo'llanma: Yillik talab va yetkazish muddati asosida qayta buyurtma berish nuqtasini aniqlash.", en: "Executive Guide: Reorder point (ROP) modeling under stochastic demand." }
      },
      pricing: {
        title: { uz: "5-Modul: Dinamik Narx Belgilash", en: "Module 5: Dynamic Pricing Strategy" },
        video_url: "https://www.youtube.com/embed/v9Uq8M_Z8zM",
        video: { uz: "Talabning narx elastikligi va narx o'zgarganda sof marjani maksimal darajada saqlab qolish tamoyillari.", en: "Price elasticity sensitivity and contribution margin maximization." },
        guide: { uz: "Metodik qo'llanma: Dinamik narx strategiyalari, narx oshirish va chegirmalar samaradorligi.", en: "Executive Guide: Dynamic price adjustment mechanics and margin preservation." }
      },
      security: {
        title: { uz: "6-Modul: Iqtisodiy Xavfsizlik Stress-Testi", en: "Module 6: Enterprise Economic Security" },
        video_url: "https://www.youtube.com/embed/2XWqG9O7jO0",
        video: { uz: "Milliy valyuta devalvatsiyasi va bojxona to'siqlariga qarshi korxonaning chidamlilik indeksini oshirish choralari.", en: "Currency shocks, customs exposure and survival scoring." },
        guide: { uz: "Metodik qo'llanma: Valyuta xatarlarini forvard xedjirlash, favqulodda zaxira fondi va komplayens talablari.", en: "Executive Guide: Currency hedging protocols and emergency reserve sizing." }
      },
      board: {
        title: { uz: "7-Modul: Boshqaruv Kengashi Taqdimoti", en: "Module 7: Board of Directors Pitch" },
        video_url: "https://www.youtube.com/embed/Y7tB8kQv1qY",
        video: { uz: "Aksiyadorlar Kengashiga yillik operatsion foyda (EBITDA) va 3 yillik bozor kapitallashuvi taqdimotini o'tkazish.", en: "Presenting audited EBITDA and 3-year valuation trajectory." },
        guide: { uz: "Metodik qo'llanma: Direktorlar Kengashiga strategik hisobot tayyorlash va 1 varaqli memorandum standarti.", en: "Executive Guide: C-Level reporting guidelines and one-pager term-sheets." }
      }
    };

    const localizedMissionsData = [
      {
        id: 1,
        type: 'logistics',
        badge: { uz: 'Logistika & E-commerce', en: 'Logistics & E-commerce' },
        company: 'Uzum Market Logistics',
        title: {
          uz: 'O\'zbekiston bo\'ylab 1 kunda yetkazib berish ta\'minot zanjiri arxitekturasi',
          en: 'One-Day Delivery Supply Chain Network Architecture Across Uzbekistan'
        },
        theory_brief: {
          uz: 'Uzum Market butun respublika bo\'ylab buyurtmalarni 24 soat ichida yetkazib berish uchun markaziy tarqatish ombori (Fulfilment) va hududiy tarqatish hublari zanjirini kengaytirmoqda.',
          en: 'Uzum Market scales centralized fulfillment and regional hub logistics to guarantee 24-hour delivery fulfillment throughout Uzbekistan.'
        },
        video_url: 'https://www.youtube.com/embed/5N370w3TqFk',
        shocks: [
          {
            id: 'fuel_spike',
            title: { uz: 'Yoqilg\'i narxi ko\'tarilishi (+25%)', en: 'Fuel Tariff Surge (+25%)' },
            description: { uz: 'Tashish birlik xarajati 15% ga qimmatlashadi.', en: 'Inbound haulage unit cost escalates by 15%.' }
          },
          {
            id: 'peak_demand',
            title: { uz: 'Katta bayram savdolari (Talab x2)', en: 'Holiday Season Surge (Demand x2)' },
            description: { uz: 'Buyurtmalar soni 100% ga oshadi.', en: 'Gross order intake accelerates by 100%.' }
          }
        ],
        quiz: [
          {
            id: 'q1',
            question: {
              uz: 'Hududiy hublar sonining ko\'payishi kuryerlik logistikasiga qanday ta\'sir qiladi?',
              en: 'How does expanding the number of regional hubs affect courier delivery logistics?'
            },
            options: {
              uz: ['Yetkazib berish vaqti qisqaradi, lekin doimiy operatsion xarajat oshadi', 'Xarajatlar keskin kamayadi', 'Tizim samaradorligi nolga tenglashadi', 'Buyurtmalar soni kamayadi'],
              en: ['Delivery lead time compresses, but recurring operating overhead increases', 'Total expenses drop abruptly', 'System efficiency degrades to zero', 'Gross order intake declines']
            }
          }
        ]
      },
      {
        id: 2,
        type: 'retail',
        badge: { uz: 'FMCG Chakana Savdo', en: 'FMCG Retail Chains' },
        company: 'Korzinka Supermarket',
        title: {
          uz: 'Chakana savdo tarmog\'ida narx belgilash va marja optimallashtirish',
          en: 'Retail Chain Markup Strategy and Gross Margin Optimization'
        },
        theory_brief: {
          uz: 'Korzinka supermarketlar tarmog\'i inflyatsiya sharoitida o\'z mijozlari oqimini saqlab qolgan holda narx ustamalarini va operatsion marjani boshqarmoqda.',
          en: 'Korzinka Supermarkets balances consumer foot-traffic retention against unit markups and operating cash flow margins amidst regional inflation.'
        },
        video_url: 'https://www.youtube.com/embed/q4U0LgTqB0A',
        shocks: [
          {
            id: 'supplier_inflation',
            title: { uz: 'Yetkazib beruvchilar narx oshishi (+12%)', en: 'Supplier Price Surge (+12%)' },
            description: { uz: 'Xarid tannarxi oshadi.', en: 'Wholesale acquisition cost increases.' }
          }
        ],
        quiz: [
          {
            id: 'q1',
            question: {
              uz: 'Raqobat kuchayganda narx ustamasini haddan tashqari oshirish oqibati qanday bo\'ladi?',
              en: 'What is the primary operational consequence of excessive markup inflation under fierce competition?'
            },
            options: {
              uz: ['Mijozlar raqobatchilarga o\'tadi va sotuv hajmi tushib ketadi', 'Foyda cheksiz o\'sadi', 'Xarajatlar yo\'qoladi', 'Hech qanday o\'zgarish bo\'lmaydi'],
              en: ['Shoppers migrate to competitors and volume throughput contracts', 'Net margins expand infinitely', 'Operating expenses disappear', 'Zero measurable market variance']
            }
          }
        ]
      },
      {
        id: 3,
        type: 'automotive',
        badge: { uz: 'Avtosanoat & EV', en: 'Automotive & CleanTech EV' },
        company: 'BYD Uzbekistan Factory',
        title: {
          uz: 'Elektromobillarni mahalliylashtirish va eksport salohiyati',
          en: 'EV Domestic Industrial Localization and Export Scaling'
        },
        theory_brief: {
          uz: 'BYD Jizzax zavodida butlovchi qismlarni mahalliylashtirish darajasi oshirilishi va qo\'shni Markaziy Osiyo bozorlariga eksport hajmi kengaytirilmoqda.',
          en: 'BYD Jizzakh assembly complex maximizes local supplier integration to drive regional export penetration across Central Asian markets.'
        },
        video_url: 'https://www.youtube.com/embed/FwT0K7Pq3b8',
        shocks: [
          {
            id: 'customs_duty',
            title: { uz: 'Import bojlari o\'zgarishi (+10%)', en: 'Customs Tariff Escalation (+10%)' },
            description: { uz: 'Ehtiyot qismlar importi qimmatlashadi.', en: 'Imported knocked-down component costs rise.' }
          }
        ],
        quiz: [
          {
            id: 'q1',
            question: {
              uz: 'Mahalliylashtirish darajasining oshishi korxonaga qanday strategik ustunlik beradi?',
              en: 'What core strategic moat is derived from escalating domestic component localization?'
            },
            options: {
              uz: ['Valyuta kursi tebranishlariga bog\'liqlik pasayadi va bojxona imtiyozlari olinadi', 'Ishlab chiqarish to\'xtaydi', 'Sifat kafolati yo\'qoladi', 'Soliqlar oshadi'],
              en: ['Foreign exchange sensitivity diminishes while fiscal incentives unlock', 'Assembly throughput halts', 'Quality assurance degrades', 'Statutory tax burdens escalate']
            }
          }
        ]
      },
      {
        id: 4,
        type: 'energy',
        badge: { uz: 'Energetika & Infratuzilma', en: 'Energy & Infrastructure' },
        company: 'Navoi Solar Green Power',
        title: {
          uz: 'Quyosh fotoelektr stansiyasi CAPEX va diskontlangan pul oqimi (DCF) tahlili',
          en: 'Solar Utility CAPEX and Discounted Cash Flow (DCF) Feasibility Modeling'
        },
        theory_brief: {
          uz: 'Yashil energetika loyihalarida dastlabki kapital xarajatlar (CAPEX) yuqori bo\'ladi. Loyihaning moliyaviy barqarorligi WACC diskont stavkasi va uzoq muddatli kafolatlangan tariflarga (PPA) asoslanadi.',
          en: 'CleanTech utility projects exhibit heavy upfront CAPEX. Financial solvency hinges on WACC discount rates and statutory power purchase agreements (PPA).'
        },
        video_url: 'https://www.youtube.com/embed/k8l7_N6gT9c',
        shocks: [
          {
            id: 'rate_hike',
            title: { uz: 'Markaziy bank stavkasi oshishi (+3%)', en: 'Interest Rate Spike (+3%)' },
            description: { uz: 'Kredit bo\'yicha WACC diskont stavkasi oshadi.', en: 'Debt financing WACC hurdle rate escalates.' }
          }
        ],
        quiz: [
          {
            id: 'q1',
            question: {
              uz: 'WACC (kapitalning o\'rtacha narxi) stavkasi oshganda sof joriy qiymat (NPV) qanday o\'zgaradi?',
              en: 'How does an escalation in the WACC hurdle rate impact project Net Present Value (NPV)?'
            },
            options: {
              uz: ['NPV pasayadi, chunki kelajakdagi pul oqimlari ko\'proq diskontlanadi', 'NPV keskin oshadi', 'Hech qanday ta\'sir ko\'rsatmaydi', 'Kassa oqimi darhol to\'xtaydi'],
              en: ['NPV contracts as future operating cash flows undergo heavier discounting', 'NPV surges exponentially', 'Zero observable correlation', 'Cash collections instantly cease']
            }
          }
        ]
      }
    ];

    function toggleLang() {
      currentLang = currentLang === 'uz' ? 'en' : 'uz';
      document.querySelectorAll('.lang-indicator').forEach(el => el.innerText = currentLang.toUpperCase());
      applyLanguageTexts();
      renderCaseList();
      loadMissionsData();
      updateDuelSlider('v_a_p', document.getElementById('c_a_p').value);
      updateDuelSlider('v_a_m', document.getElementById('c_a_m').value);
      updateDuelSlider('v_a_q', document.getElementById('c_a_q').value);
      updateDuelSlider('v_b_p', document.getElementById('c_b_p').value);
      updateDuelSlider('v_b_m', document.getElementById('c_b_m').value);
      updateDuelSlider('v_b_q', document.getElementById('c_b_q').value);
      document.getElementById('treasury-a').innerText = treasuryA.toLocaleString() + ' ' + i18n[currentLang].currency;
      document.getElementById('treasury-b').innerText = treasuryB.toLocaleString() + ' ' + i18n[currentLang].currency;
      document.getElementById('fa_init_gap_val').innerText = '-60,000,000 ' + i18n[currentLang].currency;

      if (!document.getElementById('view-forensic').classList.contains('hidden')) runForensicAction();
      if (!document.getElementById('view-eoq').classList.contains('hidden')) runEOQAction();
      if (!document.getElementById('view-pricing').classList.contains('hidden')) runPricingAction();
      if (!document.getElementById('view-security').classList.contains('hidden')) runSecurityAction();
      if (!document.getElementById('view-board').classList.contains('hidden')) runBoardEvaluationAction();
    }

    function applyLanguageTexts() {
      const t = i18n[currentLang];
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerText = t[key];
      });
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) el.setAttribute('placeholder', t[key]);
      });
      document.getElementById('battle-round-lbl').innerText = currentLang === 'uz' ? `${duelRound}-Chorak (${duelRound}/4)` : `Q${duelRound} (${duelRound}/4)`;
    }

    function switchView(tab) {
      const tabs = ['cases', 'battle', 'lab', 'forensic', 'eoq', 'pricing', 'security', 'board'];
      tabs.forEach(k => {
        const v = document.getElementById(`view-${k}`);
        const b = document.getElementById(`tab-${k}`);
        if (v) v.classList.add('hidden');
        if (b) {
          if (k === 'board') {
            b.className = 'px-3 py-2 rounded-lg text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 font-bold whitespace-nowrap transition';
          } else {
            b.className = 'px-3 py-2 rounded-lg text-slate-700 hover:text-[#0B2545] hover:bg-white whitespace-nowrap transition font-bold';
          }
        }
      });

      const activeV = document.getElementById(`view-${tab}`);
      if (activeV) activeV.classList.remove('hidden');

      const activeB = document.getElementById(`tab-${tab}`);
      if (activeB) {
        activeB.className = 'px-3.5 py-2 rounded-lg font-black bg-[#0B2545] text-white whitespace-nowrap shadow-sm';
      }

      if (tab === 'cases') renderCaseList();
      if (tab === 'lab') loadMissionsData();
      if (tab === 'forensic') runForensicAction();
      if (tab === 'eoq') runEOQAction();
      if (tab === 'pricing') runPricingAction();
      if (tab === 'security') runSecurityAction();
      if (tab === 'board') runBoardEvaluationAction();
    }

    function renderCaseList() {
      const container = document.getElementById('cases-grid-container');
      if (!container) return;
      const t = i18n[currentLang];

      container.innerHTML = caseBank.map(c => `
        <div class="bg-white border border-slate-200 hover:border-blue-400 p-4 sm:p-5 rounded-2xl flex flex-col justify-between space-y-3.5 shadow-sm hover:shadow-md transition">
          <div>
            <div class="flex justify-between items-center mb-1">
              <span class="font-mono px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0B2545] border border-blue-200 font-bold text-badge">${c.num}</span>
              <span class="text-slate-500 font-mono font-medium text-badge">${c.exercise}</span>
            </div>
            <h4 class="font-extrabold text-[#0B2545] mt-1 text-title-card">${c.name[currentLang]}</h4>
            <div class="text-emerald-700 font-medium mt-0.5 text-badge"><i class="fa-solid fa-bullseye mr-1"></i>${c.focus[currentLang]}</div>
            <p class="text-slate-600 leading-relaxed mt-2 line-clamp-4 text-xs">${c.sit[currentLang]}</p>
          </div>
          <button onclick="openCaseModal(${c.id})" class="w-full py-2.5 rounded-xl bg-[#0B2545] hover:bg-[#0D3B66] text-white font-bold transition flex items-center justify-center gap-1.5 shadow-sm">
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
          <label class="text-slate-700 block mb-1 font-medium text-xs">${activeCase.inputLabel[currentLang]}</label>
          <input type="number" id="cm-input-field" placeholder="${activeCase.hint}" class="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono focus:border-[#0B2545] focus:outline-none">
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
        scoreTxt.className = "font-mono font-bold text-emerald-700";
        fbTxt.innerText = activeCase.success[currentLang];
      } else {
        scoreTxt.innerText = currentLang === 'uz' ? "30 / 100 (Xato hisoblandi)" : "30 / 100 (Incorrect)";
        scoreTxt.className = "font-mono font-bold text-rose-600";
        fbTxt.innerText = activeCase.fail[currentLang];
      }
      resBox.classList.remove('hidden');
    }

    function updateDuelSlider(id, val) {
      const el = document.getElementById(id);
      if (el) el.innerText = parseInt(val).toLocaleString() + ' ' + i18n[currentLang].currency;
    }

    function runDuelAction() {
      const pA = parseInt(document.getElementById('c_a_p').value);
      const mA = parseInt(document.getElementById('c_a_m').value);
      const qA = parseInt(document.getElementById('c_a_q').value);
      const pB = parseInt(document.getElementById('c_b_p').value);
      const mB = parseInt(document.getElementById('c_b_m').value);
      const qB = parseInt(document.getElementById('c_b_q').value);

      const scoreA = (25000 - pA) * 0.4 + (mA / 1000000) * 1.2 + (qA / 1000000) * 1.5;
      const scoreB = (25000 - pB) * 0.4 + (mB / 1000000) * 1.2 + (qB / 1000000) * 1.5;
      const totalScore = scoreA + scoreB;

      const shareA = Math.round((scoreA / totalScore) * 100);
      const shareB = 100 - shareA;
      const totalOrders = 30000;
      const ordersA = Math.round(totalOrders * (shareA / 100));
      const ordersB = totalOrders - ordersA;

      const profitA = ordersA * (pA - 9000) - mA - qA;
      const profitB = ordersB * (pB - 9500) - mB - qB;

      const t = i18n[currentLang];
      window.lastMetrics.battle_profit = profitA;

      document.getElementById('res-a-share').innerText = shareA + '%';
      document.getElementById('res-a-orders').innerText = ordersA.toLocaleString() + ' ' + t.orders_unit;
      document.getElementById('res-a-profit').innerText = (profitA >= 0 ? '+' : '') + (profitA / 1000000).toFixed(1) + ' ' + t.mln_unit;

      document.getElementById('res-b-share').innerText = shareB + '%';
      document.getElementById('res-b-orders').innerText = ordersB.toLocaleString() + ' ' + t.orders_unit;
      document.getElementById('res-b-profit').innerText = (profitB >= 0 ? '+' : '') + (profitB / 1000000).toFixed(1) + ' ' + t.mln_unit;

      const winner = profitA > profitB ? 'Uzum Express' : (profitB > profitA ? 'Yandex' : 'Tie');
      document.getElementById('duel-analysis-text').innerText = currentLang === 'uz' 
        ? `Raund yakuniga ko'ra ${winner} jamoasi ustunlikka erishdi. Narx va marketing balansi buyurtmalar taqsimotini hal qildi.`
        : `Round concluded with ${winner} taking strategic lead. Tariff pricing elasticity and marketing outlays dictated conversion rates.`;

      treasuryA += profitA;
      treasuryB += profitB;
      document.getElementById('treasury-a').innerText = treasuryA.toLocaleString() + ' ' + t.currency;
      document.getElementById('treasury-b').innerText = treasuryB.toLocaleString() + ' ' + t.currency;

      updateDuelCharts({ market_share: shareA, net_profit: profitA }, { market_share: shareB, net_profit: profitB });

      if (duelRound < 4) {
        duelRound++;
        document.getElementById('battle-round-lbl').innerText = currentLang === 'uz' ? `${duelRound}-Chorak (${duelRound}/4)` : `Q${duelRound} (${duelRound}/4)`;
      }
    }

    function updateDuelCharts(a, b) {
      const pCtx = document.getElementById('duelPieChart').getContext('2d');
      if (duelPieInst) duelPieInst.destroy();
      duelPieInst = new Chart(pCtx, {
        type: 'doughnut',
        data: { labels: ['Uzum Express', 'Yandex / Express24'], datasets: [{ data: [a.market_share, b.market_share], backgroundColor: ['#059669', '#e11d48'] }] },
        options: { responsive: true, maintainAspectRatio: false }
      });

      const bCtx = document.getElementById('duelBarChart').getContext('2d');
      if (duelBarInst) duelBarInst.destroy();
      duelBarInst = new Chart(bCtx, {
        type: 'bar',
        data: { labels: ['Uzum Express', 'Yandex / Express24'], datasets: [{ data: [a.net_profit, b.net_profit], backgroundColor: [a.net_profit >= 0 ? '#059669' : '#dc2626', b.net_profit >= 0 ? '#e11d48' : '#dc2626'], borderRadius: 6 }] },
        options: { responsive: true, maintainAspectRatio: false }
      });
    }

    function loadMissionsData() {
      missions = localizedMissionsData;
      const list = document.getElementById('missions-list');
      list.innerHTML = '';

      missions.forEach(m => {
        const item = document.createElement('div');
        item.className = `p-3 rounded-xl border cursor-pointer transition ${activeMission && activeMission.id === m.id ? 'bg-blue-50/80 border-[#0B2545]' : 'bg-slate-50 hover:bg-white border-slate-200'}`;
        item.onclick = () => selectMission(m);
        item.innerHTML = `
          <div class="flex justify-between items-center mb-1">
            <span class="font-bold text-[#0B2545] uppercase text-badge">${m.company}</span>
            <span class="text-[10px] px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200 font-mono">${m.badge[currentLang]}</span>
          </div>
          <h4 class="font-bold text-slate-800 text-sm">${m.title[currentLang]}</h4>
        `;
        list.appendChild(item);
      });
      if (missions.length > 0 && !activeMission) selectMission(missions[0]);
      else if (activeMission) selectMission(activeMission);
    }

    function selectMission(m) {
      activeMission = m;
      document.getElementById('active-title').innerText = m.title[currentLang];
      document.getElementById('active-desc').innerText = m.theory_brief[currentLang];
      document.getElementById('active-badge').innerText = m.badge[currentLang];
      document.getElementById('theory-text').innerText = m.theory_brief[currentLang];

      const formattedUrl = formatYouTubeEmbedUrl(m.video_url);
      document.getElementById('video-frame').src = formattedUrl;
      document.getElementById('video-external-link').href = m.video_url;

      const sContainer = document.getElementById('shocks-container');
      sContainer.innerHTML = '';
      (m.shocks || []).forEach(s => {
        const btn = document.createElement('button');
        btn.id = `shock-btn-${s.id}`;
        btn.className = 'w-full text-left p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:border-amber-400 text-xs transition';
        btn.onclick = () => toggleShockAction(s);
        btn.innerHTML = `<div class="font-bold text-amber-800">${s.title[currentLang]}</div><div class="text-[11px] text-slate-500 mt-0.5">${s.description[currentLang]}</div>`;
        sContainer.appendChild(btn);
      });

      const qContainer = document.getElementById('quiz-container');
      qContainer.innerHTML = '';
      m.quiz.forEach((q, idx) => {
        qContainer.innerHTML += `
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <div class="font-bold text-slate-800">${idx + 1}. ${q.question[currentLang]}</div>
            ${q.options[currentLang].map((opt, oIdx) => `
              <label class="flex items-center space-x-2 text-slate-700 cursor-pointer"><input type="radio" name="${q.id}" value="${oIdx}"> <span>${opt}</span></label>
            `).join('')}
          </div>`;
      });

      renderClassicControls(m.type);
      document.getElementById('round-idx-lbl').innerText = `${labRound} / 3`;
      document.getElementById('certificate-card').classList.add('hidden');
    }

    function renderClassicControls(type) {
      const c = document.getElementById('lab-dynamic-controls');
      const t = i18n[currentLang];
      c.innerHTML = '';

      if (type === 'logistics') {
        c.innerHTML = `
          <div><div class="flex justify-between font-bold mb-1"><span>${currentLang==='uz'?'Logistika Hublari:':'Distribution Hubs:'}</span><span id="vc1" class="text-blue-700 font-mono">2 ${t.qty_unit}</span></div><input type="range" id="c_hubs" min="1" max="5" value="2" oninput="document.getElementById('vc1').innerText=this.value+' ${t.qty_unit}'; runClassicSim()" class="w-full accent-[#0B2545]"></div>
          <div><label class="block font-bold mb-1">${currentLang==='uz'?'Kuryerlar modeli:':'Courier Fleet Model:'}</label><select id="c_courier" onchange="runClassicSim()" class="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800"><option value="ichki_shtat">${currentLang==='uz'?'O\'z kuryerlari':'In-house fleet'}</option><option value="autsorsing">${currentLang==='uz'?'Tashqi autsorsing':'Outsourcing'}</option></select></div>
          <div><div class="flex justify-between font-bold mb-1"><span>${currentLang==='uz'?'Marketing byudjeti:':'Marketing Outlay:'}</span><span id="vc2" class="text-blue-700 font-mono">15,000,000 ${t.currency}</span></div><input type="range" id="c_mkt" min="5000000" max="40000000" step="2500000" value="15000000" oninput="document.getElementById('vc2').innerText=parseInt(this.value).toLocaleString()+' ${t.currency}'; runClassicSim()" class="w-full accent-[#0B2545]"></div>
        `;
      } else if (type === 'retail') {
        c.innerHTML = `
          <div><div class="flex justify-between font-bold mb-1"><span>${currentLang==='uz'?'Chakana narx ustamasi (%):':'Retail Markup (%):'}</span><span id="vc1" class="text-blue-700 font-mono">22%</span></div><input type="range" id="c_markup" min="10" max="40" value="22" oninput="document.getElementById('vc1').innerText=this.value+'%'; runClassicSim()" class="w-full accent-[#0B2545]"></div>
          <div><div class="flex justify-between font-bold mb-1"><span>${currentLang==='uz'?'Chegirma (%):':'Discount Rate (%):'}</span><span id="vc2" class="text-blue-700 font-mono">5%</span></div><input type="range" id="c_discount" min="0" max="25" value="5" oninput="document.getElementById('vc2').innerText=this.value+'%'; runClassicSim()" class="w-full accent-[#0B2545]"></div>
          <div><div class="flex justify-between font-bold mb-1"><span>${currentLang==='uz'?'Do\'konlar soni:':'Retail Stores:'}</span><span id="vc3" class="text-blue-700 font-mono">25 ${t.qty_unit}</span></div><input type="range" id="c_stores" min="10" max="60" value="25" oninput="document.getElementById('vc3').innerText=this.value+' ${t.qty_unit}'; runClassicSim()" class="w-full accent-[#0B2545]"></div>
        `;
      } else if (type === 'automotive') {
        c.innerHTML = `
          <div><div class="flex justify-between font-bold mb-1"><span>${currentLang==='uz'?'Ishlab chiqarish quvvati:':'Assembly Capacity:'}</span><span id="vc1" class="text-blue-700 font-mono">1,200 ${t.qty_unit}</span></div><input type="range" id="c_vol" min="400" max="3000" step="100" value="1200" oninput="document.getElementById('vc1').innerText=parseInt(this.value).toLocaleString()+' ${t.qty_unit}'; runClassicSim()" class="w-full accent-[#0B2545]"></div>
          <div><div class="flex justify-between font-bold mb-1"><span>${currentLang==='uz'?'Eksport ulushi (%):':'Export Share (%):'}</span><span id="vc2" class="text-blue-700 font-mono">30%</span></div><input type="range" id="c_exp" min="10" max="70" value="30" oninput="document.getElementById('vc2').innerText=this.value+'%'; runClassicSim()" class="w-full accent-[#0B2545]"></div>
          <div><div class="flex justify-between font-bold mb-1"><span>${currentLang==='uz'?'Mahalliylashtirish (%):':'Localization Rate (%):'}</span><span id="vc3" class="text-blue-700 font-mono">45%</span></div><input type="range" id="c_loc" min="20" max="75" value="45" oninput="document.getElementById('vc3').innerText=this.value+'%'; runClassicSim()" class="w-full accent-[#0B2545]"></div>
        `;
      } else {
        c.innerHTML = `
          <div><div class="flex justify-between font-bold mb-1"><span>${currentLang==='uz'?'Kapital xarajatlar:':'Capex Investment:'}</span><span id="vc1" class="text-blue-700 font-mono">50 mlrd ${t.currency}</span></div><input type="range" id="c_capex" min="20" max="100" step="5" value="50" oninput="document.getElementById('vc1').innerText=this.value+' mlrd ${t.currency}'; runClassicSim()" class="w-full accent-[#0B2545]"></div>
          <div><div class="flex justify-between font-bold mb-1"><span>${currentLang==='uz'?'WACC Stavka (%):':'Discount Rate WACC (%):'}</span><span id="vc2" class="text-blue-700 font-mono">16%</span></div><input type="range" id="c_wacc" min="10" max="26" value="16" oninput="document.getElementById('vc2').innerText=this.value+'%'; runClassicSim()" class="w-full accent-[#0B2545]"></div>
          <div><div class="flex justify-between font-bold mb-1"><span>${currentLang==='uz'?'Pul oqimi o\'sishi (%):':'Cash Flow Growth (%):'}</span><span id="vc3" class="text-blue-700 font-mono">15%</span></div><input type="range" id="c_growth" min="5" max="30" value="15" oninput="document.getElementById('vc3').innerText=this.value+'%'; runClassicSim()" class="w-full accent-[#0B2545]"></div>
        `;
      }
      runClassicSim();
    }

    function toggleShockAction(shock) {
      const alertBox = document.getElementById('lab-shock-alert');
      if (activeShock === shock.id) {
        activeShock = null;
        document.querySelectorAll('#shocks-container button').forEach(b => b.className = 'w-full text-left p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs transition');
        alertBox.classList.add('hidden');
      } else {
        activeShock = shock.id;
        document.querySelectorAll('#shocks-container button').forEach(b => b.className = 'w-full text-left p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs transition');
        document.getElementById(`shock-btn-${shock.id}`).className = 'w-full text-left p-2.5 rounded-xl border border-red-400 bg-red-50 text-xs transition shadow';
        alertBox.classList.remove('hidden');
        gotoLabStep(3);
      }
      runClassicSim();
    }

    function gotoLabStep(num) {
      for (let i = 1; i <= 4; i++) {
        document.getElementById(`lab-step-${i}`).classList.add('hidden');
        document.getElementById(`lab-step-btn-${i}`).className = 'py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 text-badge';
      }
      document.getElementById(`lab-step-${num}`).classList.remove('hidden');
      document.getElementById(`lab-step-btn-${num}`).className = 'py-2.5 rounded-xl border border-[#0B2545] bg-[#0B2545] text-white font-bold text-badge shadow-sm';
      if (num === 3) runClassicSim();
    }

    function runClassicSim() {
      const t = i18n[currentLang];
      const kpiBox = document.getElementById('lab-dynamic-kpis');
      const labels = currentLang === 'uz' ? ['Tushum', 'Xarajat', 'Sof Foyda'] : ['Revenue', 'Expenses', 'Net Profit'];
      
      const rev = activeShock ? 85000000 : 110000000;
      const exp = activeShock ? 72000000 : 64000000;
      const net = rev - exp;

      kpiBox.innerHTML = `
        <div><div class="text-slate-500 text-badge">${labels[0]}</div><div class="font-bold text-blue-700 font-mono mt-0.5">${(rev/1000000).toFixed(1)} ${t.mln_unit}</div></div>
        <div><div class="text-slate-500 text-badge">${labels[1]}</div><div class="font-bold text-rose-600 font-mono mt-0.5">${(exp/1000000).toFixed(1)} ${t.mln_unit}</div></div>
        <div><div class="text-slate-500 text-badge">${labels[2]}</div><div class="font-bold text-emerald-700 font-mono mt-0.5">${(net/1000000).toFixed(1)} ${t.mln_unit}</div></div>
      `;

      const bCtx = document.getElementById('classicBarChart').getContext('2d');
      if (classicBarInst) classicBarInst.destroy();
      classicBarInst = new Chart(bCtx, {
        type: 'bar',
        data: { labels: labels, datasets: [{ data: [rev, exp, net], backgroundColor: ['#0284c7', '#dc2626', '#059669'], borderRadius: 6 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
      });

      const pCtx = document.getElementById('classicPieChart').getContext('2d');
      if (classicPieInst) classicPieInst.destroy();
      classicPieInst = new Chart(pCtx, {
        type: 'doughnut',
        data: { labels: currentLang === 'uz' ? ['Marja Ulushi', 'Xarajat Ulushi'] : ['Net Margin', 'Operating Cost'], datasets: [{ data: [net, exp], backgroundColor: ['#059669', '#cbd5e1'] }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
      });
    }

    function submitQuizAction() {
      const q = activeMission.quiz[0];
      const chk = document.querySelector(`input[name="${q.id}"]:checked`);
      const div = document.getElementById('quiz-result-box');
      div.classList.remove('hidden');

      if (chk && parseInt(chk.value) === 0) {
        div.className = 'p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800';
        div.innerHTML = `<strong>${currentLang==='uz'?'Natija: 100%':'Score: 100%'}</strong> — ${currentLang==='uz'?'To\'g\'ri tahlil! Nazariya o\'zlashtirildi.':'Valid assessment! Proceeding forward.'} <button onclick="gotoLabStep(3)" class="ml-2 font-bold underline">${currentLang==='uz'?'Simulyatorga o\'tish →':'To Simulation →'}</button>`;
      } else {
        div.className = 'p-3.5 rounded-xl bg-red-50 border border-red-300 text-red-800';
        div.innerHTML = `<strong>${currentLang==='uz'?'Natija: 0%':'Score: 0%'}</strong> — ${currentLang==='uz'?'Javob noto\'g\'ri. Yana bir bor urinib ko\'ring.':'Incorrect. Re-evaluate theoretical premises.'}`;
      }
    }

    function sendChatMsg() {
      const input = document.getElementById('chat-input');
      const text = input.value.trim();
      if (!text) return;
      const cBox = document.getElementById('chat-box');
      cBox.innerHTML += `<div class="p-2.5 rounded-xl bg-[#0B2545] text-white text-right">${text}</div>`;
      input.value = '';
      cBox.scrollTop = cBox.scrollHeight;

      setTimeout(() => {
        let reply = "";
        if (labRound === 1) {
          reply = currentLang === 'uz' 
            ? "Mantiqiy dalillar qabul qilindi. 2-savol: Agar raqobatchi narxni 10% pasaytirsa, siz qanday moliyaviy bufer bilan javob berasiz?" 
            : "Strategic thesis noted. Round 2: If the rival discounts tariff rates by 10%, what liquidity buffer absorbs this margin compression?";
          labRound = 2;
        } else if (labRound === 2) {
          reply = currentLang === 'uz' 
            ? "Yaxshi himoya. Yakuniy savol: ESG talablari va iqtisodiy xavfsizlik nuqtai nazaridan investitsiyaning qaytish davri (Payback) qanday?" 
            : "Defensible argument. Final Round: How does this capital expenditure fit ESG and payback horizon governance?";
          labRound = 3;
        } else {
          reply = currentLang === 'uz' 
            ? "A'lo darajada himoya qilindi! Barcha 3 bosqich yakunlandi. Sertifikat tasdiqlandi." 
            : "Executive defense validated! All 3 thesis rounds cleared. Certificate issued.";
          
          document.getElementById('cert-score-lbl').innerText = "96 / 100 (" + (currentLang==='uz'?'TASDIQLANDI':'APPROVED') + ")";
          document.getElementById('cert-date-lbl').innerText = new Date().toISOString().slice(0, 10);
          document.getElementById('cert-id-lbl').innerText = "TSUE-PRO-" + Math.floor(100000 + Math.random() * 900000);
          document.getElementById('cert-qr-img').src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TSUE-VERIFIED-CERTIFICATE";
          document.getElementById('certificate-card').classList.remove('hidden');
        }
        document.getElementById('round-idx-lbl').innerText = `${labRound} / 3`;
        cBox.innerHTML += `<div class="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-sm"><strong>${currentLang==='uz'?'SI Ekspert:':'AI Faculty:'}</strong> ${reply}</div>`;
        cBox.scrollTop = cBox.scrollHeight;
      }, 700);
    }

    function printCertificate() {
      window.print();
    }

    function printExecutiveDeck() {
      const ebitda = document.getElementById('board-ebitda')?.innerText || "0";
      const val = document.getElementById('board-valuation')?.innerText || "0";
      const score = document.getElementById('board-score')?.innerText || "-- / 100";

      document.getElementById('print-ebitda').innerText = ebitda;
      document.getElementById('print-valuation').innerText = val;
      document.getElementById('print-score').innerText = score;

      window.print();
    }

    function runForensicAction() {
      const cutAdmin = parseInt(document.getElementById('c_fa_admin').value);
      const debtMos = parseInt(document.getElementById('c_fa_debt').value);
      const cutStaff = parseInt(document.getElementById('c_fa_staff').value);
      const discInv = parseInt(document.getElementById('c_fa_inv').value);

      const saved = (cutAdmin * 1200000) + (debtMos * 1500000) + (cutStaff * 1100000) + (discInv * 1000000);
      const finalCf = -60000000 + saved;

      const t = i18n[currentLang];
      window.lastMetrics.forensic_cash_flow = finalCf;

      document.getElementById('fa_saved').innerText = (saved / 1000000).toFixed(1) + ' ' + t.mln_unit;
      document.getElementById('fa_cf').innerText = (finalCf / 1000000).toFixed(1) + ' ' + t.mln_unit;
      document.getElementById('fa_cf').className = finalCf > 0 ? "text-emerald-700 font-bold font-mono text-lg" : "text-rose-600 font-bold font-mono text-lg";

      const v = document.getElementById('fa_verdict');
      if (finalCf > 0) {
        v.innerText = currentLang === 'uz' ? "Kassa defitsiti to'liq bartaraf etildi. Korxona omon qoldi!" : "Liquidity gap bridged. Enterprise turnaround achieved!";
        v.className = "p-3.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-center mt-2";
      } else {
        v.innerText = currentLang === 'uz' ? "Kassa uzilishi davom etmoqda. Qo'shimcha richaglarni bosing." : "Liquidity deficit persists. Extend additional turnaround levers.";
        v.className = "p-3.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-300 font-bold text-center mt-2";
      }
    }

    function runEOQAction() {
      const demand = parseInt(document.getElementById('c_eoq_d').value) || 24000;
      const orderCost = parseFloat(document.getElementById('c_eoq_s').value) || 250000;
      const holdCost = parseFloat(document.getElementById('c_eoq_h').value) || 12000;
      const leadTime = parseInt(document.getElementById('c_eoq_l').value) || 5;

      const eoq = Math.round(Math.sqrt((2 * demand * orderCost) / holdCost));
      const ordersPerYear = (demand / eoq).toFixed(1);
      const safetyStock = Math.round(1.65 * Math.sqrt(leadTime) * 12);
      const rop = Math.round(((demand / 365) * leadTime) + safetyStock);
      const totalCost = Math.round((ordersPerYear * orderCost) + ((eoq / 2) * holdCost));

      const t = i18n[currentLang];
      window.lastMetrics.eoq_annual_cost = totalCost;

      document.getElementById('eoq_val').innerText = eoq.toLocaleString() + ' ' + t.qty_unit;
      document.getElementById('eoq_orders').innerText = ordersPerYear + ' ' + t.times_unit;
      document.getElementById('eoq_safety').innerText = safetyStock.toLocaleString() + ' ' + t.qty_unit;
      document.getElementById('eoq_rop').innerText = rop.toLocaleString() + ' ' + t.qty_unit;
      document.getElementById('eoq_cost').innerText = (totalCost / 1000000).toFixed(1) + ' ' + t.mln_unit;

      const ctx = document.getElementById('eoqChart').getContext('2d');
      if (eoqChartInst) eoqChartInst.destroy();
      eoqChartInst = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: currentLang === 'uz' ? ['Buyurtma Xarajati', 'Saqlash Xarajati'] : ['Ordering Cost', 'Carrying Cost'],
          datasets: [{ data: [Math.round(ordersPerYear * orderCost), Math.round((eoq / 2) * holdCost)], backgroundColor: ['#0284c7', '#059669'], borderWidth: 0 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: '68%' }
      });
    }

    function runPricingAction() {
      const changePct = parseInt(document.getElementById('c_pr_change').value);
      const ed = parseFloat(document.getElementById('c_pr_ed').value) || -1.6;
      const basePrice = 50000;
      const baseVol = 20000;
      const unitCost = 32000;

      const newPrice = Math.round(basePrice * (1 + changePct / 100));
      const volumeDeltaPct = changePct * ed;
      const newVol = Math.round(baseVol * (1 + volumeDeltaPct / 100));

      const oldProfit = baseVol * (basePrice - unitCost);
      const newProfit = newVol * (newPrice - unitCost);
      const profitDelta = newProfit - oldProfit;

      const t = i18n[currentLang];
      window.lastMetrics.pricing_profit_delta = profitDelta;

      document.getElementById('pr_price').innerText = newPrice.toLocaleString() + ' ' + t.currency;
      document.getElementById('pr_vol').innerText = newVol.toLocaleString() + ' ' + t.qty_unit + ` (${volumeDeltaPct.toFixed(1)}%)`;
      document.getElementById('pr_profit').innerText = (profitDelta >= 0 ? '+' : '') + (profitDelta / 1000000).toFixed(1) + ' ' + t.mln_unit;
      document.getElementById('pr_profit').className = profitDelta >= 0 ? "text-emerald-700 font-bold font-mono text-lg" : "text-rose-600 font-bold font-mono text-lg";
    }

    function runSecurityAction() {
      const fx = parseInt(document.getElementById('c_sec_fx').value);
      const tariff = parseInt(document.getElementById('c_sec_tax').value);
      const fund = parseFloat(document.getElementById('c_sec_fund').value) || 50000000;

      const riskExposure = (fx * 2500000) + (tariff * 1800000);
      const coverageRatio = Math.min(100, Math.round((fund / riskExposure) * 100));
      const survivalScore = Math.max(10, Math.min(100, coverageRatio));

      const t = i18n[currentLang];
      window.lastMetrics.survival_score = survivalScore;

      document.getElementById('sec_risk').innerText = (riskExposure / 1000000).toFixed(1) + ' ' + t.mln_unit;
      document.getElementById('sec_score').innerText = survivalScore + " / 100";

      const s = document.getElementById('sec_status');
      s.innerText = currentLang === 'uz' ? `Qoplash darajasi: ${coverageRatio}%` : `Liquidity Coverage: ${coverageRatio}%`;
      s.className = survivalScore >= 70 ? "p-3.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-center" : (survivalScore >= 40 ? "p-3.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-300 font-bold text-center" : "p-3.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-300 font-bold text-center");
    }

    function runBoardEvaluationAction() {
      const battleP = window.lastMetrics.battle_profit;
      const forensicCf = window.lastMetrics.forensic_cash_flow;
      const pricingP = window.lastMetrics.pricing_profit_delta;
      const survivalS = window.lastMetrics.survival_score;

      const annualEbitda = Math.round(battleP + forensicCf + pricingP + 80000000);
      const companyValuation = Math.round(annualEbitda * 5.8);
      const boardScore = Math.min(100, Math.max(50, Math.round((survivalS * 0.4) + (annualEbitda > 100000000 ? 55 : 35))));
      const verdict = boardScore >= 80 ? (currentLang==='uz'?'TASDIQLANDI':'APPROVED') : (currentLang==='uz'?'QAYTA KO\'RIB CHIQILSIN':'CONDITIONAL');

      const t = i18n[currentLang];
      document.getElementById('board-ebitda').innerText = (annualEbitda / 1000000).toFixed(1) + ' ' + t.mln_unit;
      document.getElementById('board-valuation').innerText = (companyValuation / 1000000).toFixed(1) + ' ' + t.mln_unit;
      document.getElementById('board-score').innerText = boardScore + " / 100";
      document.getElementById('board-verdict').innerText = verdict;

      const c = document.getElementById('board-reviews-container');
      const pC = document.getElementById('print-reviews-box');
      c.innerHTML = '';
      pC.innerHTML = '';

      const reviews = [
        {
          role: 'CFO',
          name: 'Sherzod Alimov',
          status: verdict,
          color: boardScore >= 80 ? 'emerald' : 'amber',
          comment: currentLang === 'uz' ? 'Balans likvidligi va kassa uzilishini bartaraf etish modeli to\'liq asoslangan.' : 'Liquidity coverage ratios and working capital turnaround verified.'
        },
        {
          role: 'COO',
          name: 'Ulugbek Karimov',
          status: verdict,
          color: boardScore >= 80 ? 'emerald' : 'amber',
          comment: currentLang === 'uz' ? 'EOQ partiya taqsimoti va ta\'minot zanjiri optimal boshqaruvda.' : 'Batch optimization under Wilson EOQ demonstrates unit economics.'
        },
        {
          role: 'CRO',
          name: 'Nodira Vohidova',
          status: verdict,
          color: boardScore >= 80 ? 'emerald' : 'amber',
          comment: currentLang === 'uz' ? 'Valyuta va tarif shoklari komplayens zaxirasi bilan to\'liq qoplandi.' : 'Foreign exchange and tariff exposures mitigated via statutory buffer.'
        }
      ];

      reviews.forEach(r => {
        c.innerHTML += `
          <div class="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5 shadow-sm">
            <div class="flex justify-between items-center">
              <div><strong class="text-[#0B2545] text-base">${r.role}</strong> <span class="text-slate-500 text-xs">(${r.name})</span></div>
              <span class="px-2.5 py-0.5 rounded text-badge font-bold font-mono bg-${r.color}-50 text-${r.color}-800 border border-${r.color}-200">${r.status}</span>
            </div>
            <p class="text-slate-700 leading-relaxed text-sm">${r.comment}</p>
          </div>
        `;
        pC.innerHTML += `<div><strong>${r.role}:</strong> ${r.status} — ${r.comment}</div>`;
      });

      const ctx = document.getElementById('boardValuationChart').getContext('2d');
      if (boardChartInst) boardChartInst.destroy();
      boardChartInst = new Chart(ctx, {
        type: 'line',
        data: {
          labels: currentLang === 'uz' ? ['1-Yil', '2-Yil (Prognoz)', '3-Yil (Prognoz)'] : ['Year 1', 'Year 2 (Forecast)', 'Year 3 (Forecast)'],
          datasets: [{
            label: currentLang === 'uz' ? 'Bozor Kapitallashuvi' : 'Market Capitalization',
            data: [companyValuation, Math.round(companyValuation * 1.25), Math.round(companyValuation * 1.55)],
            borderColor: '#0B2545',
            backgroundColor: 'rgba(11, 37, 69, 0.08)',
            fill: true,
            tension: 0.35,
            borderWidth: 2.5,
            pointBackgroundColor: '#0B2545',
            pointRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { ticks: { color: '#64748b', font: { size: 10 } }, grid: { color: '#e2e8f0' } },
            x: { ticks: { color: '#64748b', font: { size: 10 } }, grid: { display: false } }
          }
        }
      });
    }

    function openResourceModal(modKey, type) {
      const res = moduleResources[modKey];
      if (!res) return;

      const titleEl = document.getElementById('res-modal-title');
      const bodyEl = document.getElementById('res-modal-body');

      if (type === 'video') {
        const formattedUrl = formatYouTubeEmbedUrl(res.video_url);
        titleEl.innerHTML = `<i class="fa-solid fa-circle-play text-amber-600"></i> ${res.title[currentLang]} — Video Dars`;
        bodyEl.innerHTML = `
          <div class="aspect-video bg-black rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center">
            <iframe class="w-full h-full" src="${formattedUrl}" title="Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
          </div>
          <div class="flex justify-between items-center mt-2">
            <p class="text-slate-600 text-xs">${res.video[currentLang]}</p>
            <a href="${res.video_url}" target="_blank" class="text-xs text-[#0B2545] font-bold underline whitespace-nowrap ml-2">YouTube'da ko'rish</a>
          </div>
        `;
      } else {
        titleEl.innerHTML = `<i class="fa-solid fa-file-pdf text-[#0B2545]"></i> ${res.title[currentLang]} — Metodik Qo'llanma`;
        bodyEl.innerHTML = `
          <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 class="font-bold text-[#0B2545]">${currentLang === 'uz' ? 'Akademik Metodik Konspekt:' : 'Executive Methodological Guide:'}</h4>
            <p class="text-slate-700">${res.guide[currentLang]}</p>
          </div>
          <button onclick="window.print()" class="w-full py-2.5 bg-[#0B2545] hover:bg-[#0D3B66] text-white font-bold rounded-xl transition">
            <i class="fa-solid fa-print mr-1.5"></i> ${currentLang === 'uz' ? 'Qo\'llanmani Chop Etish (PDF)' : 'Print Guide (PDF)'}
          </button>
        `;
      }
      document.getElementById('resource-modal').classList.remove('hidden');
    }

    function closeResourceModal() {
      document.getElementById('resource-modal').classList.add('hidden');
    }

    window.onload = () => {
      applyLanguageTexts();
      renderCaseList();
      loadMissionsData();
      switchView('cases');
      updateDuelCharts({ market_share: 50, net_profit: 25000000 }, { market_share: 50, net_profit: 25000000 });
    };