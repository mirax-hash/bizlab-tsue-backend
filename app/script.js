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
        hdr_badge: "LABORATORIYA",
        hdr_sub: "Strategik Biznes va Risklarni Boshqarish Laboratoriyasi",
        hm_badge: "TDIU 2026 ILMIY STANDARTI",
        hm_title: "Biznes va xatarlar, uni tushunadiganlar uchun.",
        hm_desc: "Biznes — bu shunchaki quruq g'oyalar emas, balki aniq hisoblangan tavakkalchilik va qarorlar zanjiridir. Laboratoriyamiz talaba va yosh tadqiqotchilarga real bozor noaniqliklari, narx raqobati, kassa uzilishlari va kutilmagan shoklar sharoitida to'g'ri qaror qabul qilishni o'rgatadi.",
        hm_btn_matrix: "Xatarlar Matritsasini Ochish",
        hm_btn_cases: "8 Kompetensiya Keyslari",
        hm_btn_battle: "Bozor Jangi Arenasi",
        hm_pillars_sub: "Qaror qabul qilish va stress-test tizimi",
        hm_p1_btn: "Bozor jangiga o'tish →",
        hm_p2_btn: "Balans auditiga o'tish →",
        hm_p3_btn: "EOQ hisoblagichiga o'tish →",
        hm_p4_btn: "Stress-testga o'tish →",
        hm_rd_badge: "TO'LIQ DASTUR",
        hm_rd_title: "Laboratoriyaning 7 ta Boshqaruv Modullari",
        hm_rd_sub: "Ketma-ketlikda o'rganish tavsiya etiladi",
        hm_m1_tag: "1-MODUL",
        hm_m1_cat: "Oligopoliya",
        hm_m1_t: "Bozor Jangi (Uzum vs Yandex)",
        hm_m1_d: "Narx elastikligi, marketing byudjeti va raqobatli bozor ulushi jangi.",
        hm_m2_tag: "2-MODUL",
        hm_m2_cat: "4 Korxona",
        hm_m2_t: "Milliy Keyslar & Shoklar",
        hm_m2_d: "Uzum, Korzinka, BYD, Navoi Solar — video dars, test, simulyator va AI himoyasi.",
        hm_m3_tag: "3-MODUL",
        hm_m3_cat: "Kassa defitsiti",
        hm_m3_t: "Balans Auditi & Kassa Qutqaruvi",
        hm_m3_d: "Oylik -60 mln so'm kassa uzilishini 4 ta inqiroz richagi bilan hal qilish.",
        hm_m4_tag: "4-MODUL",
        hm_m4_cat: "Logistika",
        hm_m4_t: "Optimal Zaxira (EOQ Vilson)",
        hm_m4_d: "Optimal buyurtma partiyasi, xavfsizlik buferi va saqlash xarajatlari balansi.",
        hm_m5_tag: "5-MODUL",
        hm_m5_cat: "Elastiklik",
        hm_m5_t: "Dinamik Narx Belgilash",
        hm_m5_d: "Talabning narx elastikligi (Ed), sotuv hajmi reaksiyasi va sof foyda deltasi.",
        hm_m6_tag: "6-MODUL",
        hm_m6_cat: "Stress-Test",
        hm_m6_t: "Iqtisodiy Xavfsizlik",
        hm_m6_d: "Valyuta devalvatsiyasi va import bojlariga qarshi korxona chidamlilik indeksi.",
        hm_m7_tag: "7-MODUL (YAKUNIY)",
        hm_m7_cat: "C-Level Direktorlar Kengashi",
        hm_m7_t: "Boshqaruv Kengashiga Taqdimot & Strategik Memorandum",
        hm_m7_d: "Barcha modullar sintezi, yillik EBITDA, 3 yillik kapitallashuv va chop etiluvchi PDF ijroiya hisoboti.",
        hm_enter_btn: "Modulga kirish →",
        hm_m7_btn: "Kengash taqdimotiga o'tish →",
        rm_th_corner: "Ta'sir ↓ / Ehtimollik →",
        rm_th_1: "1 (Juda past)",
        rm_th_2: "2 (Past)",
        rm_th_3: "3 (O'rtacha)",
        rm_th_4: "4 (Yuqori)",
        rm_th_5: "5 (Deyarli aniq)",
        yt_open_link: "Videoni YouTube platformasida ochish →",
        nav_prev_matrix: "Oldingi: Xatarlar Matritsasi",
        nav_next_m2: "Keyingi: 2-Modul (Milliy Keyslar)",
        nav_prev_m1: "Oldingi: 1-Modul (Bozor Jangi)",
        nav_next_m3: "Keyingi: 3-Modul (Balans Auditi)",
        nav_prev_m2: "Oldingi: 2-Modul (Milliy Keyslar)",
        nav_next_m4: "Keyingi: 4-Modul (Optimal Zaxira EOQ)",
        nav_prev_m3: "Oldingi: 3-Modul (Balans Auditi)",
        nav_next_m5: "Keyingi: 5-Modul (Dinamik Narx)",
        nav_prev_m4: "Oldingi: 4-Modul (Optimal Zaxira)",
        nav_next_m6: "Keyingi: 6-Modul (Stress-Test)",
        nav_prev_m5: "Oldingi: 5-Modul (Dinamik Narx)",
        nav_next_m7: "Keyingi: 7-Modul (Boshqaruv Kengashi)",
        nav_prev_m6: "Oldingi: 6-Modul (Stress-Test)",
        nav_done_all: "Barcha modullar yakunlandi",
        ftr_sub: "• Strategik Biznes va Risklarni Boshqarish Laboratoriyasi",
        ftr_copy: "TDIU © 2026. Tizimli iqtisodiy fikrlash muhiti.",
        pr_univ: "TOSHKENT DAVLAT IQTISODIYOT UNIVERSITETI",
        pr_sub: "BIZLAB Virtual Biznes Laboratoriyasi — Boshqaruv Kengashi Memorandumi",
        pr_date_lbl: "Sana:",
        pr_mgr_lbl: "Boshqaruvchi:",
        pr_exec_h: "Ijroiya Strategik Hisobot (Executive Summary)",
        pr_exec_desc: "Mazkur hisobot talaba tomonidan 6 ta asosiy biznes modulida qabul qilingan qarorlarining sintezini aks ettiradi.",
        pr_ebitda_lbl: "Yillik EBITDA:",
        pr_val_lbl: "Kapitallashuv:",
        pr_score_lbl: "Kengash Bahosi:",
        pr_rev_h: "Direktorlar Xulosasi:",
        pr_sup_lbl: "Ilmiy Rahbar: _____________________",
        pr_head_lbl: "Kafedra Mudiri: _____________________",
        t_home: "Asosiy",
        t_cases: "8 Keys",
        t_matrix: "Xatarlar Matritsasi",
        rm_badge: "RISK STANDARTI",
        rm_title: "Korporativ Xatarlar Matritsasi va Diagnostikasi (5x5 Heatmap)",
        rm_desc: "Biznes xatarlarni ehtimollik va zarar ko'lami bo'yicha baholash, kritik zonalarni aniqlash va mitigatsiya choralarini ko'rish.",
        rm_reset: "Standart holatga qaytarish",
        rm_heatmap_title: "5x5 Interaktiv Risk Xaritasi",
        rm_score_formula: "Skor = Ehtimollik × Ta'sir (1-25)",
        rm_leg_low: "1-4: Past xatar",
        rm_leg_med: "5-9: O'rtacha",
        rm_leg_high: "10-14: Yuqori",
        rm_leg_crit: "15-25: Kritik xatar",
        rm_sim_title: "Xatarni Baholash va Sinov",
        rm_sel_lbl: "Xatar turini tanlang:",
        rm_prob_lbl: "Ehtimollik darajasi (1-5):",
        rm_imp_lbl: "Moliyaviy ta'sir darajasi (1-5):",
        rm_score_lbl: "Xatar Balli:",
        rm_mit_strat: "Tavsiya etilgan Mitigatsiya Strategiyasi:",
        rm_apply_btn: "Mitigatsiya Chorasini Qo'llash (-40% xatar)",
        t_battle: "1. Bozor Jangi",
        t_lab: "2. Milliy Keyslar",
        t_forensic: "3. Balans Auditi",
        t_eoq: "4. Zaxiralar (EOQ)",
        t_pricing: "5. Dinamik Narx",
        t_security: "6. Stress-Test",
        t_board: "7. Kengash",
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
        hdr_badge: "LABORATORY",
        hdr_sub: "Strategic Business & Risk Management Laboratory",
        hm_badge: "TSUE 2026 ACADEMIC STANDARD",
        hm_title: "Business and Risk — Built for Those Who Understand It.",
        hm_desc: "Business is not merely a collection of ideas, but a chain of calculated risks and strategic decisions. Our laboratory trains students and young researchers to make data-driven decisions amidst market uncertainty, price competition, cash-flow gaps, and force-majeure shocks.",
        hm_btn_matrix: "Open Risk Matrix (5x5)",
        hm_btn_cases: "8 Competency Case Studies",
        hm_btn_battle: "Market Battle Arena",
        hm_pillars_sub: "Decision-making and stress-testing system",
        hm_p1_btn: "Go to Market Battle →",
        hm_p2_btn: "Go to Balance Audit →",
        hm_p3_btn: "Go to EOQ Calculator →",
        hm_p4_btn: "Go to Stress-Test →",
        hm_rd_badge: "FULL CURRICULUM",
        hm_rd_title: "7 Core Management & Simulation Modules",
        hm_rd_sub: "Recommended to complete in sequential order",
        hm_m1_tag: "MODULE 1",
        hm_m1_cat: "Oligopoly",
        hm_m1_t: "Market Battle (Uzum vs Yandex)",
        hm_m1_d: "Price elasticity, marketing budget allocation, and competitive market share duel.",
        hm_m2_tag: "MODULE 2",
        hm_m2_cat: "4 Enterprises",
        hm_m2_t: "National Cases & Shocks",
        hm_m2_d: "Uzum, Korzinka, BYD, Navoi Solar — video lecture, quiz, simulator, and AI defense.",
        hm_m3_tag: "MODULE 3",
        hm_m3_cat: "Cash Deficit",
        hm_m3_t: "Balance Audit & Cash Turnaround",
        hm_m3_d: "Resolving a -60m UZS/month cash-flow deficit across 4 corporate turnaround levers.",
        hm_m4_tag: "MODULE 4",
        hm_m4_cat: "Logistics",
        hm_m4_t: "Optimal Inventory (Wilson EOQ)",
        hm_m4_d: "Optimal order batch size, safety stock buffer, and holding cost equilibrium.",
        hm_m5_tag: "MODULE 5",
        hm_m5_cat: "Elasticity",
        hm_m5_t: "Dynamic Pricing Strategy",
        hm_m5_d: "Price elasticity of demand (Ed), volume demand sensitivity, and net profit delta.",
        hm_m6_tag: "MODULE 6",
        hm_m6_cat: "Stress-Test",
        hm_m6_t: "Economic Security & Solvency",
        hm_m6_d: "Enterprise resilience index against currency devaluation and customs tariff spikes.",
        hm_m7_tag: "MODULE 7 (CAPSTONE)",
        hm_m7_cat: "C-Level Board of Directors",
        hm_m7_t: "Board of Directors Pitch & Strategic Memorandum",
        hm_m7_d: "Cross-module synthesis, annual EBITDA, 3-year capitalization, and printable PDF executive report.",
        hm_enter_btn: "Launch Module →",
        hm_m7_btn: "Go to Board Presentation →",
        rm_th_corner: "Impact ↓ / Likelihood →",
        rm_th_1: "1 (Very Low)",
        rm_th_2: "2 (Low)",
        rm_th_3: "3 (Medium)",
        rm_th_4: "4 (High)",
        rm_th_5: "5 (Almost Certain)",
        yt_open_link: "Watch video on YouTube →",
        nav_prev_matrix: "Previous: Risk Matrix",
        nav_next_m2: "Next: Module 2 (National Cases)",
        nav_prev_m1: "Previous: Module 1 (Market Battle)",
        nav_next_m3: "Next: Module 3 (Balance Audit)",
        nav_prev_m2: "Previous: Module 2 (National Cases)",
        nav_next_m4: "Next: Module 4 (Optimal Inventory EOQ)",
        nav_prev_m3: "Previous: Module 3 (Balance Audit)",
        nav_next_m5: "Next: Module 5 (Dynamic Pricing)",
        nav_prev_m4: "Previous: Module 4 (Optimal Inventory)",
        nav_next_m6: "Next: Module 6 (Stress-Test)",
        nav_prev_m5: "Previous: Module 5 (Dynamic Pricing)",
        nav_next_m7: "Next: Module 7 (Board of Directors)",
        nav_prev_m6: "Previous: Module 6 (Stress-Test)",
        nav_done_all: "All Modules Completed",
        ftr_sub: "• Strategic Business & Risk Management Laboratory",
        ftr_copy: "TSUE © 2026. Systemic economic thinking environment.",
        pr_univ: "TASHKENT STATE UNIVERSITY OF ECONOMICS",
        pr_sub: "BIZLAB Virtual Business Laboratory — Board of Directors Memorandum",
        pr_date_lbl: "Date:",
        pr_mgr_lbl: "Executive:",
        pr_exec_h: "Executive Strategic Report (Executive Summary)",
        pr_exec_desc: "This memorandum synthesizes the quantitative decisions executed across all 6 core business simulation modules.",
        pr_ebitda_lbl: "Annual EBITDA:",
        pr_val_lbl: "Capitalization:",
        pr_score_lbl: "Board Score:",
        pr_rev_h: "Board of Directors Audit Reviews:",
        pr_sup_lbl: "Academic Advisor: _____________________",
        pr_head_lbl: "Department Head: _____________________",
        t_home: "Overview",
        t_cases: "8 Cases",
        t_matrix: "Risk Matrix",
        rm_badge: "RISK STANDARD",
        rm_title: "Corporate Risk Assessment Matrix (5x5 Heatmap)",
        rm_desc: "Quantifying enterprise uncertainties across probability and financial severity to design actionable mitigation moats.",
        rm_reset: "Reset to Baseline",
        rm_heatmap_title: "5x5 Interactive Risk Heatmap",
        rm_score_formula: "Score = Likelihood × Impact (1-25)",
        rm_leg_low: "1-4: Low Risk",
        rm_leg_med: "5-9: Medium",
        rm_leg_high: "10-14: High Risk",
        rm_leg_crit: "15-25: Critical Threat",
        rm_sim_title: "Risk Quantification & Sandbox",
        rm_sel_lbl: "Select Enterprise Risk Scenario:",
        rm_prob_lbl: "Likelihood Probability (1-5):",
        rm_imp_lbl: "Financial Severity Impact (1-5):",
        rm_score_lbl: "Risk Score:",
        rm_mit_strat: "Actionable Mitigation Strategy:",
        rm_apply_btn: "Execute Mitigation Controls (-40% Exposure)",
        t_battle: "1. Market Battle",
        t_lab: "2. National Cases",
        t_forensic: "3. Balance Audit",
        t_eoq: "4. Inventory (EOQ)",
        t_pricing: "5. Dynamic Pricing",
        t_security: "6. Stress-Test",
        t_board: "7. Board",
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
        video: {
          uz: "Kurno va Bertran oligopoliya modellari: Narx raqobati, xizmat ko'rsatish sifati va bozor ulushini taqsimlash mexanizmlari.",
          en: "Cournot & Bertrand Duopoly Models: Price competition, service quality investments, and market share capture mechanics."
        },
        guide: {
          uz: "Mazkur modul duopoliya (ikki yirik o'yinchi: Uzum Express va Yandex/Express24) sharoitida narx, marketing va infratuzilma sifati bo'yicha raqobat qarorlarini modellashtiradi.",
          en: "This module simulates strategic duopoly competition (Uzum Express vs Yandex/Express24) across delivery pricing, marketing spend, and service quality."
        },
        formula: {
          uz: "Jozibadorlik indeksi: S_i = (25,000 - P_i) × 0.4 + (M_i / 10^6) × 1.2 + (Q_i / 10^6) × 1.5 | Bozor ulushi: Share_i = S_i / (S_A + S_B) | Sof foyda: π_i = Q_orders × (P_i - C_unit) - M_i - Q_i",
          en: "Attractiveness Score: S_i = (25,000 - P_i) × 0.4 + (M_i / 10^6) × 1.2 + (Q_i / 10^6) × 1.5 | Market Share: Share_i = S_i / (S_A + S_B) | Net Profit: π_i = Q_orders × (P_i - C_unit) - M_i - Q_i"
        },
        steps: {
          uz: [
            "1-qadam: Har ikkala jamoa uchun yetkazib berish tarif narxini (8,000 so'mdan 22,000 so'mgacha) belgilang.",
            "2-qadam: Mijozlarni jalb qilish uchun marketing byudjeti va kuryerlik xizmati sifati investitsiyasini taqsimlang.",
            "3-qadam: 'Raund raqobat natijasini hisoblash' tugmasini bosib, 4 chorak davomida bozor ulushi va erkin kassa dinamikasini tahlil qiling."
          ],
          en: [
            "Step 1: Set delivery tariff prices (8,000 to 22,000 UZS) for both competing teams.",
            "Step 2: Allocate quarterly marketing budgets and courier infrastructure quality investments.",
            "Step 3: Click 'Calculate Duel Round Outcome' to simulate 4 quarters of market share capture and treasury accumulation."
          ]
        },
        criteria: {
          uz: "Demping xatari: Narxni tannarxdan (9,000 so'm) juda yaqin tushirish bozor ulushini oshirsa-da, marketing xarajatlari qoplamay kassa defitsitiga olib keladi. Optimal muvozanat — o'rtacha narx va yuqori xizmat sifatidir.",
          en: "Dumping Risk: Slashing prices near unit cost (9,000 UZS) inflates volume share but erodes contribution margins needed to cover marketing outlays. Optimal equilibrium balances moderate tariffs with high service reliability."
        }
      },
      lab: {
        title: { uz: "2-Modul: Milliy Keyslar (Uzum, Korzinka, BYD, Solar)", en: "Module 2: National Cases (Uzum, Korzinka, BYD, Solar)" },
        video_url: "https://www.youtube.com/embed/5N370w3TqFk",
        video: {
          uz: "O'zbekiston yirik korxonalarining ta'minot zanjiri, chakana savdo marjasi, sanoat lokalizatsiyasi va yashil energetika DCF tahlili.",
          en: "Supply chain architecture, retail margin optimization, industrial localization, and green energy DCF modeling across Uzbekistan's flagship enterprises."
        },
        guide: {
          uz: "Milliy iqtisodiyotning 4 ta lokomotiv tarmog'i (E-commerce logistika, FMCG riteyl, Avtosanoat EV va Quyosh energetikasi) misolida fors-major shoklarini boshqarish va SI-ekspert oldida qarorlarni himoya qilish.",
          en: "Managing force-majeure market disruptions and defending operational decisions before AI Faculty across 4 national industry tracks (E-commerce, FMCG Retail, EV Automotive, and Solar Utility)."
        },
        formula: {
          uz: "Sof foyda: Net = Revenue - Operating_Expenses | NPV = ∑ [CF_t / (1 + WACC)^t] - CAPEX | Lokalizatsiya tejamkorligi = Import_Cost × Localization_% × Tariff_Saving",
          en: "Net Margin: Net = Revenue - Operating_Expenses | NPV = ∑ [CF_t / (1 + WACC)^t] - CAPEX | Localization Savings = Import_Cost × Localization_% × Tariff_Saving"
        },
        steps: {
          uz: [
            "1-qadam: Chap paneldan 4 ta milliy korxonadan birini tanlang va video ma'ruza hamda masala mazmuni bilan tanishing.",
            "2-qadam: Nazariy bilimni tekshirish uchun vaziyatli test savoliga javob bering.",
            "3-qadam: Simulyator bo'limida boshqaruv richaglarini sozlang va 'Bozor Xatarlari (Fors-major)' tugmalarini yoqib, korxona chidamliligini sinang.",
            "4-qadam: SI-ekspertning 3 bosqichli savollariga asosli iqtisodiy dalillar yozib, QR-kodli rasmiy sertifikatni qo'lga kiriting."
          ],
          en: [
            "Step 1: Select one of the 4 national enterprise cases from the left panel and review the lecture brief.",
            "Step 2: Complete the situational competency quiz to validate theoretical understanding.",
            "Step 3: Adjust operational levers in the simulator and trigger Force-Majeure shocks to observe margin sensitivity.",
            "Step 4: Defend your strategy across 3 rounds of AI Faculty questioning to earn an officially verified certificate."
          ]
        },
        criteria: {
          uz: "Baholash mezoni: Fors-major shoklari (yoqilg'i qimmatlashishi, inflyatsiya, bojxona boji, MB stavkasi oshishi) yuz berganda ijobiy sof foydani va kapital rentabelligini saqlab qolish.",
          en: "Evaluation Criteria: Preserving positive net operating cash flow and capital return amidst force-majeure shocks (fuel spikes, supplier inflation, customs duties, and interest rate hikes)."
        }
      },
      forensic: {
        title: { uz: "3-Modul: Balans Auditi & Kassa Qutqaruvi", en: "Module 3: Forensic Balance Turnaround & Cash Audit" },
        video_url: "https://www.youtube.com/embed/FwT0K7Pq3b8",
        video: {
          uz: "Kassa uzilishini (defitsitni) bartaraf etish, aylanma mablag'larni undirish va operatsion xarajatlarni optimallashtirish yo'riqnomasi.",
          en: "Remediating working capital deficits, accelerating receivables, and executing corporate turnaround restructuring."
        },
        guide: {
          uz: "Inqiroz yoqasidagi korxonaning oylik -60,000,000 so'm kassa uzilishini (Cash-gap) 4 ta moliyaviy sog'lomlashtirish richagi orqali ijobiy pul oqimiga olib chiqish.",
          en: "Turning around a distressed enterprise suffering a -60,000,000 UZS monthly cash burn into positive net operating cash flow using 4 restructuring levers."
        },
        formula: {
          uz: "Tejalgan mablag': S_total = (Admin_% × 1.2M) + (Debt_Months × 1.5M) + (Staff_% × 1.1M) + (Inventory_% × 1.0M) | Yakuniy Cash-Flow: CF_net = -60,000,000 + S_total",
          en: "Monthly Savings: S_total = (Admin_% × 1.2M) + (Debt_Months × 1.5M) + (Staff_% × 1.1M) + (Inventory_% × 1.0M) | Net Cash Flow: CF_net = -60,000,000 + S_total"
        },
        steps: {
          uz: [
            "1-qadam: Ma'muriy-boshqaruv xarajatlarini (ofis, vakillik, samarasiz ijara) qisqartirish foizini belgilang.",
            "2-qadam: Bank bilan muzokara olib borib, kredit qarzini qaytarish muddatini (restrukturizatsiya) uzaytiring.",
            "3-qadam: Shtatlar jadvalini optimallashtiring va ombordagi sekin aylanuvchi (muzlagan) tovar qoldiqlarini chegirma bilan naqdlashtiring."
          ],
          en: [
            "Step 1: Set the reduction percentage for General & Administrative (G&A) overhead.",
            "Step 2: Restructure and extend credit debt maturity horizons (in months) to ease monthly principal service.",
            "Step 3: Rationalize headcount and liquidate slow-moving inventory buffers into immediate working cash."
          ]
        },
        criteria: {
          uz: "Likvidlik sharti: Yakuniy sof pul oqimi (CF_net) > 0 so'm bo'lishi shart. Agar ko'rsatkich manfiy qolsa, korxona to'lovga qobiliyatsiz (bankrot) deb topiladi.",
          en: "Solvency Threshold: Net Operating Cash Flow (CF_net) must exceed 0 UZS. Any negative residual balance leaves the enterprise in technical liquidity default."
        }
      },
      eoq: {
        title: { uz: "4-Modul: Optimal Zaxira Modeli (EOQ Vilson)", en: "Module 4: Supply Chain & EOQ Inventory Model" },
        video_url: "https://www.youtube.com/embed/w8m4-W4iC5o",
        video: {
          uz: "Vilson formulasi: Iqtisodiy jihatdan optimal buyurtma hajmi, saqlash xarajati va xavfsizlik zaxirasi balansi.",
          en: "Wilson EOQ Formula: Optimal batch sizing, holding cost minimization, and safety stock calibration."
        },
        guide: {
          uz: "Ta'minot logistikasida xomashyo buyurtma berish xarajatlari bilan omborda saqlash xarajatlari yig'indisini minimallashtiruvchi nuqtani (EOQ) va qayta buyurtma berish nuqtasini (ROP) aniqlash.",
          en: "Determining the Economic Order Quantity (EOQ) that minimizes total inventory costs (ordering + holding) and calculating the Reorder Point (ROP)."
        },
        formula: {
          uz: "EOQ = √[(2 × D × S) / H] | Buyurtmalar soni: N = D / EOQ | Xavfsizlik zaxirasi: SS = 1.65 × √L × σ_d | Qayta buyurtma nuqtasi: ROP = (D / 365) × L + SS",
          en: "EOQ = √[(2 × D × S) / H] | Order Frequency: N = D / EOQ | Safety Stock: SS = 1.65 × √L × σ_d | Reorder Point: ROP = (D / 365) × L + SS"
        },
        steps: {
          uz: [
            "1-qadam: Korxonaning yillik xomashyo talabi (D) va 1 ta partiyani yetkazib berish transport xarajati (S) miqdorini kiriting.",
            "2-qadam: 1 dona mahsulotni omborda 1 yil saqlash xarajati (H) va yetkazib berish muddatini (L, kunlarda) belgilang.",
            "3-qadam: Grafikda buyurtma berish va saqlash xarajatlari tenglashgan optimal balans nuqtasini kuzating."
          ],
          en: [
            "Step 1: Input annual unit demand (D) and fixed inbound order placement/transport cost per batch (S).",
            "Step 2: Specify annual unit holding cost (H) and supplier lead time in days (L).",
            "Step 3: Observe the doughnut chart balancing annual ordering outlays against warehouse carrying costs."
          ]
        },
        criteria: {
          uz: "Optimal zaxira qoidasi: EOQ nuqtasida yillik buyurtma berish xarajati yillik omborda saqlash xarajatiga teng bo'ladi va jami logistika xarajati minimumga erishadi.",
          en: "Optimality Principle: At the exact EOQ batch size, total annual ordering costs equal total annual holding costs, minimizing aggregate supply chain expenditure."
        }
      },
      pricing: {
        title: { uz: "5-Modul: Dinamik Narx Belgilash", en: "Module 5: Dynamic Pricing Strategy" },
        video_url: "https://www.youtube.com/embed/v9Uq8M_Z8zM",
        video: {
          uz: "Talabning narx elastikligi va narx o'zgarganda sof marjani maksimal darajada saqlab qolish tamoyillari.",
          en: "Price elasticity of demand sensitivity and gross contribution margin maximization."
        },
        guide: {
          uz: "Bozordagi talabning narx elastikligi koeffitsiyenti (Ed) asosida narxni oshirish yoki chegirma berishning sotuv hajmiga va yakuniy sof foydaga ta'sirini hisoblash.",
          en: "Modeling how percentage price adjustments interact with the Price Elasticity of Demand (Ed) to drive unit volume contraction/expansion and net profit delta."
        },
        formula: {
          uz: "Hajm o'zgarishi: %ΔQ = %ΔP × E_d | Yangi narx: P_1 = P_0 × (1 + %ΔP) | Yangi hajm: Q_1 = Q_0 × (1 + %ΔQ) | Foyda o'zgarishi: Δπ = Q_1(P_1 - C) - Q_0(P_0 - C)",
          en: "Volume Delta: %ΔQ = %ΔP × E_d | New Price: P_1 = P_0 × (1 + %ΔP) | New Volume: Q_1 = Q_0 × (1 + %ΔQ) | Profit Delta: Δπ = Q_1(P_1 - C) - Q_0(P_0 - C)"
        },
        steps: {
          uz: [
            "1-qadam: Baza narxining o'zgarish foizini (-30% chegirmadan +30% qimmatlashishgacha) slayder orqali o'zgartiring.",
            "2-qadam: Bozor segmentiga mos talab elastikligi koeffitsiyentini (masalan, -1.6 elastik yoki -0.6 noelastik) kiriting.",
            "3-qadam: Prognoz qilinayotgan sotuv hajmi va sof foyda o'zgarishi (+ yoki -) ko'rsatkichini tahlil qiling."
          ],
          en: [
            "Step 1: Adjust the base price delta slider from -30% markdown to +30% price premium.",
            "Step 2: Enter the market segment's price elasticity coefficient Ed (e.g., -1.6 elastic or -0.6 inelastic).",
            "Step 3: Analyze the resulting forecasted unit demand and net contribution margin variance."
          ]
        },
        criteria: {
          uz: "Elastiklik qonuni: Agar |Ed| > 1 (talab elastik) bo'lsa, narxni haddan ziyod oshirish mijozlarning keskin ketishiga olib keladi. Noelastik bozorda (|Ed| < 1) esa narx oshirish foydani ko'paytiradi.",
          en: "Elasticity Rule: When |Ed| > 1 (elastic demand), aggressive price hikes trigger disproportionate volume loss. In inelastic markets (|Ed| < 1), price increases expand net profit."
        }
      },
      security: {
        title: { uz: "6-Modul: Iqtisodiy Xavfsizlik Stress-Testi", en: "Module 6: Enterprise Economic Security Stress-Test" },
        video_url: "https://www.youtube.com/embed/2XWqG9O7jO0",
        video: {
          uz: "Milliy valyuta devalvatsiyasi va bojxona to'siqlariga qarshi korxonaning chidamlilik indeksini oshirish choralari.",
          en: "Currency devaluation shocks, customs tariff exposure, and corporate survival index modeling."
        },
        guide: {
          uz: "Tashqi makroiqtisodiy shoklar — valyuta kursi devalvatsiyasi va import bojxona bojlari oshishi sharoitida korxonaning moliyaviy xavf yuklamasini va zaxira fondi yetarliligini sinash.",
          en: "Stress-testing enterprise solvency against macroeconomic shocks — currency devaluation and import tariff spikes — relative to emergency liquidity reserves."
        },
        formula: {
          uz: "Xavf yuklamasi: Risk_Exposure = (FX_% × 2,500,000) + (Tariff_% × 1,800,000) | Qoplash koeffitsiyenti: Coverage_% = min(100, (Reserve_Fund / Risk_Exposure) × 100)",
          en: "Total Risk Exposure = (FX_% × 2,500,000) + (Tariff_% × 1,800,000) | Liquidity Coverage Ratio = min(100, (Reserve_Fund / Risk_Exposure) × 100)"
        },
        steps: {
          uz: [
            "1-qadam: Kutilayotgan valyuta devalvatsiyasi foizini (0% dan 50% gacha) belgilang.",
            "2-qadam: Import xomashyo va uskunalar uchun bojxona boji stavkasini (0% dan 30% gacha) kiriting.",
            "3-qadam: Favqulodda zaxira va komplayens fondini oshirib, Chidamlilik indeksini 70 balldan yuqori (yashil) zonaga olib chiqing."
          ],
          en: [
            "Step 1: Set the simulated foreign exchange devaluation shock percentage (0% to 50%).",
            "Step 2: Adjust the import customs surcharge rate (0% to 30%).",
            "Step 3: Calibrate the emergency liquidity reserve fund to push the Survival & Resilience Index above 70/100."
          ]
        },
        criteria: {
          uz: "Xavfsizlik chegarasi: Chidamlilik indeksi >= 70 bo'lganda korxona barqaror; 40–69 oralig'ida o'rtacha xavf; 40 dan past bo'lsa — kritik kassa tanqisligi xavfi.",
          en: "Resilience Benchmark: Index >= 70 indicates robust solvency; 40–69 signals moderate vulnerability; below 40 warns of critical insolvency exposure."
        }
      },
      board: {
        title: { uz: "7-Modul: Boshqaruv Kengashi Taqdimoti", en: "Module 7: Board of Directors Pitch" },
        video_url: "https://www.youtube.com/embed/Y7tB8kQv1qY",
        video: {
          uz: "Aksiyadorlar Kengashiga yillik operatsion foyda (EBITDA) va 3 yillik bozor kapitallashuvi taqdimotini o'tkazish.",
          en: "Presenting audited EBITDA and 3-year enterprise capitalization trajectory to the Board of Directors."
        },
        guide: {
          uz: "Oldingi 6 ta modulda qabul qilingan barcha operatsion, moliyaviy va risk qarorlarini yagona korporativ hisobotga (EBITDA va EV kapitallashuvi) jamlash hamda mustaqil C-Level direktorlar (CFO, COO, CRO) xulosasini olish.",
          en: "Synthesizing all operational, financial, and risk decisions from Modules 1–6 into an audited corporate valuation (EBITDA & Enterprise Value) reviewed by independent C-Level directors."
        },
        formula: {
          uz: "EBITDA = π_battle + CF_forensic + Δπ_pricing + 80,000,000 | Korxona kapitallashuvi: EV = EBITDA × 5.8x | Kengash bahosi: Score = 0.4 × Survival_Index + EBITDA_Bonus",
          en: "EBITDA = π_battle + CF_forensic + Δπ_pricing + 80,000,000 | Enterprise Valuation: EV = EBITDA × 5.8x | Board Governance Score = 0.4 × Survival_Index + EBITDA_Bonus"
        },
        steps: {
          uz: [
            "1-qadam: Oldingi modullarda (Bozor jangi, Balans auditi, Dinamik narx, Stress-test) eng yuqori ko'rsatkichlarga erishing.",
            "2-qadam: 'Kengash Bahosini Yangilash' tugmasini bosib, yillik EBITDA va 3 yillik kapitallashuv grafigini hisoblang.",
            "3-qadam: CFO, COO va CRO retsenziyalari 'TASDIQLANDI' (Score >= 80) holatiga o'tgach, Strategik Memorandumni PDF shaklida chop eting."
          ],
          en: [
            "Step 1: Optimize financial and risk metrics across the preceding simulation modules.",
            "Step 2: Click 'Refresh Board Valuation' to compute consolidated annual EBITDA and the 3-year capitalization curve.",
            "Step 3: Once CFO, COO, and CRO audit statuses reach 'APPROVED' (Score >= 80), print the Executive Memorandum (PDF)."
          ]
        },
        criteria: {
          uz: "Tasdiqlash sharti: Kengashning yakuniy boshqaruv bahosi kamida 80 / 100 ball bo'lganda strategiya aksiyadorlar tomonidan bir ovozdan tasdiqlanadi.",
          en: "Approval Threshold: Achieving a consolidated Governance Score of 80 / 100 or higher secures unanimous C-Level Board ratification."
        }
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
      document.documentElement.lang = currentLang;
      document.title = currentLang === 'uz'
        ? 'BIZLAB TSUE PRO — Strategik Biznes va Risklarni Boshqarish Laboratoriyasi'
        : 'BIZLAB TSUE PRO — Strategic Business & Risk Management Laboratory';
      document.querySelectorAll('.lang-indicator').forEach(el => el.innerText = currentLang.toUpperCase());
      applyLanguageTexts();
      renderCaseList();
      loadMissionsData();
      initRiskMatrix();
      updateDuelSlider('v_a_p', document.getElementById('c_a_p').value);
      updateDuelSlider('v_a_m', document.getElementById('c_a_m').value);
      updateDuelSlider('v_a_q', document.getElementById('c_a_q').value);
      updateDuelSlider('v_b_p', document.getElementById('c_b_p').value);
      updateDuelSlider('v_b_m', document.getElementById('c_b_m').value);
      updateDuelSlider('v_b_q', document.getElementById('c_b_q').value);
      document.getElementById('treasury-a').innerText = treasuryA.toLocaleString() + ' ' + i18n[currentLang].currency;
      document.getElementById('treasury-b').innerText = treasuryB.toLocaleString() + ' ' + i18n[currentLang].currency;
      document.getElementById('fa_init_gap_val').innerText = '-60,000,000 ' + i18n[currentLang].currency;
      const debtVal = document.getElementById('c_fa_debt').value;
      document.getElementById('v_fa_debt').innerText = debtVal + ' ' + (currentLang === 'uz' ? 'oy' : 'mo');

      previewDuelLive();
      runForensicAction();
      runEOQAction();
      runPricingAction();
      runSecurityAction();
      runBoardEvaluationAction();
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
      const tabs = ['home', 'matrix', 'cases', 'battle', 'lab', 'forensic', 'eoq', 'pricing', 'security', 'board'];
      tabs.forEach(k => {
        const v = document.getElementById('view-' + k);
        const b = document.getElementById('tab-' + k);
        if (v) {
          v.classList.add('hidden');
          
        }
        if (b) {
          if (k === 'board') {
            b.className = 'px-3 py-1.5 rounded-lg text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 font-bold whitespace-nowrap transition';
          } else {
            b.className = 'px-3 py-1.5 rounded-lg text-slate-600 hover:text-[#0B2545] hover:bg-white whitespace-nowrap transition';
          }
        }
      });

      const activeV = document.getElementById('view-' + tab);
      if (activeV) {
        activeV.classList.remove('hidden');
        
      }

      const activeB = document.getElementById('tab-' + tab);
      if (activeB) {
        activeB.className = 'px-3 py-1.5 rounded-lg font-black bg-[#0B2545] text-white whitespace-nowrap shadow-xs';
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });

      if (tab === 'matrix') initRiskMatrix();
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
      previewDuelLive();
    }

    function computeDuelMetrics() {
      const pA = parseInt(document.getElementById('c_a_p')?.value) || 14000;
      const mA = parseInt(document.getElementById('c_a_m')?.value) || 20000000;
      const qA = parseInt(document.getElementById('c_a_q')?.value) || 12000000;
      const pB = parseInt(document.getElementById('c_b_p')?.value) || 15000;
      const mB = parseInt(document.getElementById('c_b_m')?.value) || 18000000;
      const qB = parseInt(document.getElementById('c_b_q')?.value) || 10000000;

      const scoreA = Math.max(1, (25000 - pA) * 0.4 + (mA / 1000000) * 1.2 + (qA / 1000000) * 1.5);
      const scoreB = Math.max(1, (25000 - pB) * 0.4 + (mB / 1000000) * 1.2 + (qB / 1000000) * 1.5);
      const totalScore = scoreA + scoreB;

      const shareA = Math.round((scoreA / totalScore) * 100);
      const shareB = 100 - shareA;
      const totalOrders = 30000;
      const ordersA = Math.round(totalOrders * (shareA / 100));
      const ordersB = totalOrders - ordersA;

      const revA = ordersA * pA;
      const revB = ordersB * pB;
      const varCostA = ordersA * 9000;
      const varCostB = ordersB * 9500;
      const contribA = revA - varCostA;
      const contribB = revB - varCostB;
      const opexA = mA + qA;
      const opexB = mB + qB;
      const profitA = contribA - opexA;
      const profitB = contribB - opexB;

      return { pA, mA, qA, pB, mB, qB, shareA, shareB, ordersA, ordersB, revA, revB, varCostA, varCostB, contribA, contribB, opexA, opexB, profitA, profitB };
    }

    function previewDuelLive() {
      const d = computeDuelMetrics();
      const t = i18n[currentLang];
      const isUz = currentLang === 'uz';
      window.lastMetrics.battle_profit = d.profitA;

      const elShareA = document.getElementById('res-a-share');
      if (elShareA) elShareA.innerText = d.shareA + '%';
      const elOrdA = document.getElementById('res-a-orders');
      if (elOrdA) elOrdA.innerText = d.ordersA.toLocaleString() + ' ' + t.orders_unit;
      const elProfA = document.getElementById('res-a-profit');
      if (elProfA) elProfA.innerText = (d.profitA >= 0 ? '+' : '') + (d.profitA / 1000000).toFixed(1) + ' ' + t.mln_unit;

      const elShareB = document.getElementById('res-b-share');
      if (elShareB) elShareB.innerText = d.shareB + '%';
      const elOrdB = document.getElementById('res-b-orders');
      if (elOrdB) elOrdB.innerText = d.ordersB.toLocaleString() + ' ' + t.orders_unit;
      const elProfB = document.getElementById('res-b-profit');
      if (elProfB) elProfB.innerText = (d.profitB >= 0 ? '+' : '') + (d.profitB / 1000000).toFixed(1) + ' ' + t.mln_unit;

      const tbody = document.getElementById('duel-live-table-body');
      if (tbody) {
        const fmtMln = (v) => (v >= 0 ? '+' : '') + (v / 1000000).toFixed(1) + ' ' + t.mln_unit;
        const fmtAbsMln = (v) => (v / 1000000).toFixed(1) + ' ' + t.mln_unit;
        const rows = [
          {
            label: isUz ? "Bozor ulushi va buyurtmalar" : "Market Share & Orders",
            a: `${d.shareA}% (${d.ordersA.toLocaleString()} ${t.orders_unit})`,
            b: `${d.shareB}% (${d.ordersB.toLocaleString()} ${t.orders_unit})`,
            diff: `${d.shareA - d.shareB >= 0 ? '+' : ''}${d.shareA - d.shareB}%`
          },
          {
            label: isUz ? "Yalpi tushum (P × Q)" : "Gross Revenue (P × Q)",
            a: fmtAbsMln(d.revA),
            b: fmtAbsMln(d.revB),
            diff: fmtMln(d.revA - d.revB)
          },
          {
            label: isUz ? "O'zgaruvchan tannarx (VC × Q)" : "Variable Delivery Cost (VC × Q)",
            a: '-' + fmtAbsMln(d.varCostA),
            b: '-' + fmtAbsMln(d.varCostB),
            diff: fmtMln(d.varCostA - d.varCostB)
          },
          {
            label: isUz ? "Marjinal foyda (Contribution Margin)" : "Contribution Margin",
            a: fmtAbsMln(d.contribA),
            b: fmtAbsMln(d.contribB),
            diff: fmtMln(d.contribA - d.contribB)
          },
          {
            label: isUz ? "Marketing va sifat OPEX (M + Q)" : "Marketing & Quality OPEX (M + Q)",
            a: '-' + fmtAbsMln(d.opexA),
            b: '-' + fmtAbsMln(d.opexB),
            diff: fmtMln(d.opexA - d.opexB)
          },
          {
            label: isUz ? "Yakuniy Sof Foyda (Net Profit)" : "Net Operating Profit",
            a: fmtMln(d.profitA),
            b: fmtMln(d.profitB),
            diff: fmtMln(d.profitA - d.profitB),
            bold: true
          }
        ];
        tbody.innerHTML = rows.map(r => `
          <tr class="${r.bold ? 'bg-slate-50 font-black text-slate-900' : 'text-slate-700'}">
            <td class="p-2.5 font-sans">${r.label}</td>
            <td class="p-2.5 text-right text-emerald-700">${r.a}</td>
            <td class="p-2.5 text-right text-rose-700">${r.b}</td>
            <td class="p-2.5 text-right font-bold text-[#0B2545]">${r.diff}</td>
          </tr>
        `).join('');
      }

      updateDuelCharts({ market_share: d.shareA, net_profit: d.profitA }, { market_share: d.shareB, net_profit: d.profitB });
    }

    function runDuelAction() {
      const d = computeDuelMetrics();
      const t = i18n[currentLang];
      previewDuelLive();

      const winner = d.profitA > d.profitB ? 'Uzum Express' : (d.profitB > d.profitA ? 'Yandex / Express24' : 'Tie');
      const analysisEl = document.getElementById('duel-analysis-text');
      if (analysisEl) {
        analysisEl.innerText = currentLang === 'uz' 
          ? `Raund yakuniga ko'ra ${winner} jamoasi ustunlikka erishdi (${d.shareA}% vs ${d.shareB}%). Narx va marketing balansi buyurtmalar taqsimotini hal qildi.`
          : `Round concluded with ${winner} taking strategic lead (${d.shareA}% vs ${d.shareB}%). Tariff pricing elasticity and marketing outlays dictated conversion rates.`;
      }

      treasuryA += d.profitA;
      treasuryB += d.profitB;
      const trA = document.getElementById('treasury-a');
      const trB = document.getElementById('treasury-b');
      if (trA) trA.innerText = treasuryA.toLocaleString() + ' ' + t.currency;
      if (trB) trB.innerText = treasuryB.toLocaleString() + ' ' + t.currency;

      if (duelRound < 4) {
        duelRound++;
        const rLbl = document.getElementById('battle-round-lbl');
        if (rLbl) rLbl.innerText = currentLang === 'uz' ? `${duelRound}-Chorak (${duelRound}/4)` : `Q${duelRound} (${duelRound}/4)`;
      }
    }

    function updateDuelCharts(a, b) {
      const pCtx = document.getElementById('duelPieChart').getContext('2d');
      if (typeof Chart !== "undefined" && duelPieInst) duelPieInst.destroy();
      if (typeof Chart !== "undefined") duelPieInst = new Chart(pCtx, {
        type: 'doughnut',
        data: { labels: ['Uzum Express', 'Yandex / Express24'], datasets: [{ data: [a.market_share, b.market_share], backgroundColor: ['#059669', '#e11d48'] }] },
        options: { responsive: true, maintainAspectRatio: false }
      });

      const bCtx = document.getElementById('duelBarChart').getContext('2d');
      if (typeof Chart !== "undefined" && duelBarInst) duelBarInst.destroy();
      if (typeof Chart !== "undefined") duelBarInst = new Chart(bCtx, {
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
      if (typeof Chart !== "undefined" && classicBarInst) classicBarInst.destroy();
      if (typeof Chart !== "undefined") classicBarInst = new Chart(bCtx, {
        type: 'bar',
        data: { labels: labels, datasets: [{ data: [rev, exp, net], backgroundColor: ['#0284c7', '#dc2626', '#059669'], borderRadius: 6 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
      });

      const pCtx = document.getElementById('classicPieChart').getContext('2d');
      if (typeof Chart !== "undefined" && classicPieInst) classicPieInst.destroy();
      if (typeof Chart !== "undefined") classicPieInst = new Chart(pCtx, {
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

        function triggerPrintTarget(elementId) {
      const targets = ['printable-certificate', 'printable-executive-deck', 'printable-guide'];
      targets.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('print-active');
      });
      const activeEl = document.getElementById(elementId);
      if (!activeEl) return;
      activeEl.classList.remove('hidden');
      activeEl.classList.add('print-active');
      setTimeout(() => {
        window.print();
        setTimeout(() => {
          activeEl.classList.remove('print-active');
          if (elementId !== 'printable-certificate') {
            activeEl.classList.add('hidden');
          }
        }, 300);
      }, 100);
    }

    function printCertificate() {
      triggerPrintTarget('printable-certificate');
    }

    function printExecutiveDeck() {
      const ebitda = document.getElementById('board-ebitda')?.innerText || "0";
      const val = document.getElementById('board-valuation')?.innerText || "0";
      const score = document.getElementById('board-score')?.innerText || "-- / 100";

      document.getElementById('print-ebitda').innerText = ebitda;
      document.getElementById('print-valuation').innerText = val;
      document.getElementById('print-score').innerText = score;
      const dateSpan = document.getElementById('print-deck-date');
      if (dateSpan) dateSpan.innerText = new Date().toISOString().slice(0, 10);

      triggerPrintTarget('printable-executive-deck');
    }

    function printMethodologicalGuide(modKey) {
      const res = moduleResources[modKey];
      if (!res) return;
      const gBox = document.getElementById('printable-guide');
      if (!gBox) return;

      const isUz = currentLang === 'uz';
      const stepsHtml = (res.steps?.[currentLang] || []).map(s => `<li class="py-1">${s}</li>`).join('');

      gBox.innerHTML = `
        <div class="p-8 bg-white text-slate-900 space-y-5 border-2 border-[#0B2545] rounded-xl">
          <div class="border-b-2 border-[#0B2545] pb-4 flex justify-between items-start">
            <div>
              <div class="text-xs font-black uppercase tracking-widest text-[#0B2545]">${isUz ? 'TOSHKENT DAVLAT IQTISODIYOT UNIVERSITETI' : 'TASHKENT STATE UNIVERSITY OF ECONOMICS'}</div>
              <h1 class="text-xl font-black text-slate-900 mt-1">${res.title[currentLang]}</h1>
              <p class="text-xs text-slate-600 mt-0.5">${isUz ? 'BIZLAB TSUE PRO — Rasmiy Akademik Metodik Qo\'llanma' : 'BIZLAB TSUE PRO — Official Academic Methodological Guide'}</p>
            </div>
            <div class="text-right text-xs font-mono text-slate-600">
              <div><strong>${isUz ? 'Standart:' : 'Standard:'}</strong> TDIU-2026</div>
              <div><strong>${isUz ? 'Sana:' : 'Date:'}</strong> ${new Date().toISOString().slice(0, 10)}</div>
            </div>
          </div>

          <div class="space-y-2">
            <h2 class="text-sm font-black uppercase tracking-wider text-[#0B2545] border-b border-slate-200 pb-1">
              1. ${isUz ? 'Modul Maqsadi va Nazariy Konsepsiya' : 'Module Objective & Theoretical Concept'}
            </h2>
            <p class="text-xs leading-relaxed text-slate-800">${res.guide[currentLang]}</p>
            <p class="text-xs leading-relaxed text-slate-600">${res.video[currentLang]}</p>
          </div>

          <div class="space-y-2">
            <h2 class="text-sm font-black uppercase tracking-wider text-[#0B2545] border-b border-slate-200 pb-1">
              2. ${isUz ? 'Matematik Model va Asosiy Formulalar' : 'Mathematical Model & Key Formulas'}
            </h2>
            <div class="p-3 bg-slate-50 border border-slate-300 rounded-lg font-mono text-xs text-slate-900">
              ${res.formula?.[currentLang] || ''}
            </div>
          </div>

          <div class="space-y-2">
            <h2 class="text-sm font-black uppercase tracking-wider text-[#0B2545] border-b border-slate-200 pb-1">
              3. ${isUz ? 'Amaliy Bajarish Algoritmi (Bosqichma-bosqich)' : 'Step-by-Step Execution Algorithm'}
            </h2>
            <ul class="list-disc pl-5 text-xs text-slate-800 space-y-1">
              ${stepsHtml}
            </ul>
          </div>

          <div class="space-y-2">
            <h2 class="text-sm font-black uppercase tracking-wider text-[#0B2545] border-b border-slate-200 pb-1">
              4. ${isUz ? 'Risk-Menejment va Baholash Mezonlari' : 'Risk Governance & Evaluation Criteria'}
            </h2>
            <p class="text-xs leading-relaxed text-slate-800">${res.criteria?.[currentLang] || ''}</p>
          </div>

          <div class="pt-6 border-t border-slate-300 flex justify-between items-center text-[11px] text-slate-500">
            <div>BIZLAB TSUE PRO • ${isUz ? 'Strategik Biznes va Risklarni Boshqarish Laboratoriyasi' : 'Strategic Business & Risk Management Laboratory'}</div>
            <div class="font-mono">tsue.uz</div>
          </div>
        </div>
      `;

      triggerPrintTarget('printable-guide');
    }


    function runForensicAction() {
      const cutAdmin = parseInt(document.getElementById('c_fa_admin')?.value) || 0;
      const debtMos = parseInt(document.getElementById('c_fa_debt')?.value) || 0;
      const cutStaff = parseInt(document.getElementById('c_fa_staff')?.value) || 0;
      const discInv = parseInt(document.getElementById('c_fa_inv')?.value) || 0;

      const sAdmin = cutAdmin * 1200000;
      const sDebt = debtMos * 1500000;
      const sStaff = cutStaff * 1100000;
      const sInv = discInv * 1000000;
      const saved = sAdmin + sDebt + sStaff + sInv;
      const finalCf = -60000000 + saved;

      const t = i18n[currentLang];
      const isUz = currentLang === 'uz';
      window.lastMetrics.forensic_cash_flow = finalCf;

      const vAdmin = document.getElementById('v_fa_admin');
      if (vAdmin) vAdmin.innerText = cutAdmin + '%';
      const vDebt = document.getElementById('v_fa_debt');
      if (vDebt) vDebt.innerText = debtMos + ' ' + (isUz ? 'oy' : 'mo');
      const vStaff = document.getElementById('v_fa_staff');
      if (vStaff) vStaff.innerText = cutStaff + '%';
      const vInv = document.getElementById('v_fa_inv');
      if (vInv) vInv.innerText = discInv + '%';

      const initGapEl = document.getElementById('fa_init_gap_val');
      if (initGapEl) initGapEl.innerText = '-60.0 ' + t.mln_unit;
      const savedEl = document.getElementById('fa_saved');
      if (savedEl) savedEl.innerText = '+' + (saved / 1000000).toFixed(1) + ' ' + t.mln_unit;
      const cfEl = document.getElementById('fa_cf');
      if (cfEl) {
        cfEl.innerText = (finalCf >= 0 ? '+' : '') + (finalCf / 1000000).toFixed(1) + ' ' + t.mln_unit;
        cfEl.className = finalCf >= 0 ? "text-emerald-700 font-bold font-mono text-lg" : "text-rose-600 font-bold font-mono text-lg";
      }

      const v = document.getElementById('fa_verdict');
      if (v) {
        if (finalCf >= 0) {
          v.innerText = isUz ? "Kassa defitsiti to'liq bartaraf etildi. Korxona omon qoldi!" : "Liquidity gap bridged. Enterprise turnaround achieved!";
          v.className = "p-3.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-center mt-2";
        } else {
          v.innerText = isUz ? "Kassa uzilishi davom etmoqda. Qo'shimcha richaglarni bosing." : "Liquidity deficit persists. Extend additional turnaround levers.";
          v.className = "p-3.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-300 font-bold text-center mt-2";
        }
      }

      const tbody = document.getElementById('forensic-table-body');
      if (tbody) {
        const items = [
          { name: isUz ? "1. Ma'muriy-boshqaruv xarajatlari" : "1. Admin Overhead Reduction", param: cutAdmin + '%', unit: '1.2 ' + t.mln_unit + ' / 1%', val: sAdmin },
          { name: isUz ? "2. Kredit qarzini restrukturizatsiya qilish" : "2. Debt Maturity Rescheduling", param: debtMos + (isUz ? ' oy' : ' mo'), unit: '1.5 ' + t.mln_unit + (isUz ? ' / oy' : ' / mo'), val: sDebt },
          { name: isUz ? "3. Shtatlar jadvalini optimallashtirish" : "3. Payroll & Headcount Optimization", param: cutStaff + '%', unit: '1.1 ' + t.mln_unit + ' / 1%', val: sStaff },
          { name: isUz ? "4. Sekin aylanuvchi zaxiralarni naqdlashtirish" : "4. Slow-Moving Inventory Liquidation", param: discInv + '%', unit: '1.0 ' + t.mln_unit + ' / 1%', val: sInv }
        ];
        tbody.innerHTML = items.map(it => {
          const share = saved > 0 ? ((it.val / saved) * 100).toFixed(1) : '0.0';
          return `
            <tr class="text-slate-700 hover:bg-slate-50">
              <td class="p-2.5 font-sans font-semibold text-[#0B2545]">${it.name}</td>
              <td class="p-2.5 text-center font-bold">${it.param}</td>
              <td class="p-2.5 text-right text-slate-500">${it.unit}</td>
              <td class="p-2.5 text-right font-bold text-emerald-700">+${(it.val / 1000000).toFixed(1)} ${t.mln_unit}</td>
              <td class="p-2.5 text-right">${share}%</td>
            </tr>
          `;
        }).join('') + `
          <tr class="bg-slate-100 font-black text-slate-900">
            <td class="p-2.5 font-sans" colspan="3">${isUz ? "JAMI TEJALGAN PUL OQIMI VA YAKUNIY BALANS" : "TOTAL CASH SAVED & NET LIQUIDITY BALANCE"}</td>
            <td class="p-2.5 text-right text-emerald-800">+${(saved / 1000000).toFixed(1)} ${t.mln_unit}</td>
            <td class="p-2.5 text-right ${finalCf >= 0 ? 'text-emerald-700' : 'text-rose-600'}">${(finalCf >= 0 ? '+' : '') + (finalCf / 1000000).toFixed(1)} ${t.mln_unit}</td>
          </tr>
        `;
      }
    }

    function runEOQAction() {
      const demand = parseInt(document.getElementById('c_eoq_d')?.value) || 24000;
      const orderCost = parseFloat(document.getElementById('c_eoq_s')?.value) || 250000;
      const holdCost = parseFloat(document.getElementById('c_eoq_h')?.value) || 12000;
      const leadTime = parseInt(document.getElementById('c_eoq_l')?.value) || 5;

      const eoq = Math.max(1, Math.round(Math.sqrt((2 * demand * orderCost) / holdCost)));
      const ordersPerYear = (demand / eoq).toFixed(1);
      const safetyStock = Math.round(1.65 * Math.sqrt(leadTime) * 12);
      const rop = Math.round(((demand / 365) * leadTime) + safetyStock);
      const totalCost = Math.round(((demand / eoq) * orderCost) + ((eoq / 2) * holdCost));

      const t = i18n[currentLang];
      const isUz = currentLang === 'uz';
      window.lastMetrics.eoq_annual_cost = totalCost;

      const elVal = document.getElementById('eoq_val');
      if (elVal) elVal.innerText = eoq.toLocaleString() + ' ' + t.qty_unit;
      const elOrd = document.getElementById('eoq_orders');
      if (elOrd) elOrd.innerText = ordersPerYear + ' ' + t.times_unit;
      const elSafe = document.getElementById('eoq_safety');
      if (elSafe) elSafe.innerText = safetyStock.toLocaleString() + ' ' + t.qty_unit;
      const elRop = document.getElementById('eoq_rop');
      if (elRop) elRop.innerText = rop.toLocaleString() + ' ' + t.qty_unit;
      const elCost = document.getElementById('eoq_cost');
      if (elCost) elCost.innerText = (totalCost / 1000000).toFixed(2) + ' ' + t.mln_unit;

      const tbody = document.getElementById('eoq-table-body');
      if (tbody) {
        const mults = [
          { m: 0.5, label: isUz ? "Kichik partiya (0.5 × EOQ)" : "Small Batch (0.5 × EOQ)" },
          { m: 0.75, label: isUz ? "Past partiya (0.75 × EOQ)" : "Sub-optimal (0.75 × EOQ)" },
          { m: 1.0, label: isUz ? "OPTIMAL PARTIYA (1.0 × EOQ*)" : "OPTIMAL BATCH (1.0 × EOQ*)", opt: true },
          { m: 1.5, label: isUz ? "Katta partiya (1.5 × EOQ)" : "Large Batch (1.5 × EOQ)" },
          { m: 2.0, label: isUz ? "Haddan ortiq partiya (2.0 × EOQ)" : "Oversized Batch (2.0 × EOQ)" }
        ];
        tbody.innerHTML = mults.map(sc => {
          const q = Math.max(1, Math.round(eoq * sc.m));
          const n = (demand / q).toFixed(1);
          const oC = (demand / q) * orderCost;
          const hC = (q / 2) * holdCost;
          const tot = oC + hC;
          return `
            <tr class="${sc.opt ? 'bg-emerald-50 font-black text-emerald-950 border-y-2 border-emerald-300' : 'text-slate-700 hover:bg-slate-50'}">
              <td class="p-2.5 font-sans">${sc.label}</td>
              <td class="p-2.5 text-right">${q.toLocaleString()} ${t.qty_unit}</td>
              <td class="p-2.5 text-right">${n} ${t.times_unit}</td>
              <td class="p-2.5 text-right">${(oC / 1000000).toFixed(2)} ${t.mln_unit}</td>
              <td class="p-2.5 text-right">${(hC / 1000000).toFixed(2)} ${t.mln_unit}</td>
              <td class="p-2.5 text-right ${sc.opt ? 'text-emerald-700' : 'text-slate-900 font-bold'}">${(tot / 1000000).toFixed(2)} ${t.mln_unit}</td>
            </tr>
          `;
        }).join('');
      }

      const canvas = document.getElementById('eoqChart');
      if (canvas && typeof Chart !== "undefined") {
        const ctx = canvas.getContext('2d');
        if (eoqChartInst) eoqChartInst.destroy();
        eoqChartInst = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: isUz ? ['Buyurtma Xarajati', 'Saqlash Xarajati'] : ['Ordering Cost', 'Carrying Cost'],
            datasets: [{ data: [Math.round((demand / eoq) * orderCost), Math.round((eoq / 2) * holdCost)], backgroundColor: ['#0284c7', '#059669'], borderWidth: 0 }]
          },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: '68%' }
        });
      }
    }

    function runPricingAction() {
      const changePct = parseInt(document.getElementById('c_pr_change')?.value) || 0;
      const ed = parseFloat(document.getElementById('c_pr_ed')?.value) || -1.6;
      const basePrice = 50000;
      const baseVol = 20000;
      const unitCost = 32000;

      const vPr = document.getElementById('v_pr_change');
      if (vPr) vPr.innerText = (changePct > 0 ? '+' : '') + changePct + '%';

      const newPrice = Math.round(basePrice * (1 + changePct / 100));
      const volumeDeltaPct = changePct * ed;
      const newVol = Math.max(0, Math.round(baseVol * (1 + volumeDeltaPct / 100)));

      const oldProfit = baseVol * (basePrice - unitCost);
      const newProfit = newVol * (newPrice - unitCost);
      const profitDelta = newProfit - oldProfit;

      const t = i18n[currentLang];
      const isUz = currentLang === 'uz';
      window.lastMetrics.pricing_profit_delta = profitDelta;

      const pEl = document.getElementById('pr_price');
      if (pEl) pEl.innerText = newPrice.toLocaleString() + ' ' + t.currency;
      const vEl = document.getElementById('pr_vol');
      if (vEl) vEl.innerText = newVol.toLocaleString() + ' ' + t.qty_unit + ` (${volumeDeltaPct >= 0 ? '+' : ''}${volumeDeltaPct.toFixed(1)}%)`;
      const profEl = document.getElementById('pr_profit');
      if (profEl) {
        profEl.innerText = (profitDelta >= 0 ? '+' : '') + (profitDelta / 1000000).toFixed(1) + ' ' + t.mln_unit;
        profEl.className = profitDelta >= 0 ? "text-emerald-700 font-bold font-mono text-lg" : "text-rose-600 font-bold font-mono text-lg";
      }

      const tbody = document.getElementById('pricing-table-body');
      if (tbody) {
        const steps = [-20, -10, 0, changePct, 15, 25];
        const uniqueSteps = [...new Set(steps)].sort((a, b) => a - b);
        tbody.innerHTML = uniqueSteps.map(dp => {
          const p = Math.round(basePrice * (1 + dp / 100));
          const dq = dp * ed;
          const q = Math.max(0, Math.round(baseVol * (1 + dq / 100)));
          const prof = q * (p - unitCost);
          const dProf = prof - oldProfit;
          const isSel = dp === changePct;
          return `
            <tr class="${isSel ? 'bg-teal-50 font-black text-teal-950 border-y-2 border-teal-300' : 'text-slate-700 hover:bg-slate-50'}">
              <td class="p-2.5 font-sans">${dp > 0 ? '+' : ''}${dp}% ${isSel ? (isUz ? '(Tanlangan)' : '(Active)') : (dp === 0 ? (isUz ? '(Baza)' : '(Base)') : '')}</td>
              <td class="p-2.5 text-right">${p.toLocaleString()} ${t.currency}</td>
              <td class="p-2.5 text-right ${dq >= 0 ? 'text-emerald-700' : 'text-rose-600'}">${dq >= 0 ? '+' : ''}${dq.toFixed(1)}%</td>
              <td class="p-2.5 text-right">${q.toLocaleString()} ${t.qty_unit}</td>
              <td class="p-2.5 text-right">${(prof / 1000000).toFixed(1)} ${t.mln_unit}</td>
              <td class="p-2.5 text-right ${dProf >= 0 ? 'text-emerald-700' : 'text-rose-600'}">${dProf >= 0 ? '+' : ''}${(dProf / 1000000).toFixed(1)} ${t.mln_unit}</td>
            </tr>
          `;
        }).join('');
      }
    }

    function runSecurityAction() {
      const fx = parseInt(document.getElementById('c_sec_fx')?.value) || 0;
      const tariff = parseInt(document.getElementById('c_sec_tax')?.value) || 0;
      const fund = parseFloat(document.getElementById('c_sec_fund')?.value) || 50000000;

      const vFx = document.getElementById('v_sec_fx');
      if (vFx) vFx.innerText = fx + '%';
      const vTax = document.getElementById('v_sec_tax');
      if (vTax) vTax.innerText = tariff + '%';

      const fxLoss = fx * 2500000;
      const tariffLoss = tariff * 1800000;
      const riskExposure = Math.max(1, fxLoss + tariffLoss);
      const coverageRatio = Math.min(100, Math.round((fund / riskExposure) * 100));
      const survivalScore = Math.max(10, Math.min(100, coverageRatio));

      const t = i18n[currentLang];
      const isUz = currentLang === 'uz';
      window.lastMetrics.survival_score = survivalScore;

      const rEl = document.getElementById('sec_risk');
      if (rEl) rEl.innerText = (riskExposure / 1000000).toFixed(1) + ' ' + t.mln_unit;
      const scEl = document.getElementById('sec_score');
      if (scEl) scEl.innerText = survivalScore + " / 100";

      const s = document.getElementById('sec_status');
      if (s) {
        s.innerText = isUz ? `Zaxira bilan qoplash darajasi: ${coverageRatio}%` : `Liquidity Coverage Ratio: ${coverageRatio}%`;
        s.className = survivalScore >= 70 ? "p-3.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-center" : (survivalScore >= 40 ? "p-3.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-300 font-bold text-center" : "p-3.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-300 font-bold text-center");
      }

      const tbody = document.getElementById('security-table-body');
      if (tbody) {
        const fxCov = Math.min(fund, fxLoss);
        const remFund = Math.max(0, fund - fxCov);
        const tarCov = Math.min(remFund, tariffLoss);
        const netGap = fund - riskExposure;
        tbody.innerHTML = `
          <tr class="text-slate-700">
            <td class="p-2.5 font-sans font-semibold text-[#0B2545]">${isUz ? "1. Valyuta kursi devalvatsiyasi shoki" : "1. FX Devaluation Exposure"}</td>
            <td class="p-2.5 text-center font-bold">${fx}%</td>
            <td class="p-2.5 text-right text-rose-600">-${(fxLoss / 1000000).toFixed(1)} ${t.mln_unit}</td>
            <td class="p-2.5 text-right text-emerald-700">${(fxCov / 1000000).toFixed(1)} ${t.mln_unit}</td>
            <td class="p-2.5 text-center">${fxCov >= fxLoss ? '<span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">OK</span>' : '<span class="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">DEFICIT</span>'}</td>
          </tr>
          <tr class="text-slate-700">
            <td class="p-2.5 font-sans font-semibold text-[#0B2545]">${isUz ? "2. Import bojxona boji oshishi shoki" : "2. Import Customs Tariff Shock"}</td>
            <td class="p-2.5 text-center font-bold">${tariff}%</td>
            <td class="p-2.5 text-right text-rose-600">-${(tariffLoss / 1000000).toFixed(1)} ${t.mln_unit}</td>
            <td class="p-2.5 text-right text-emerald-700">${(tarCov / 1000000).toFixed(1)} ${t.mln_unit}</td>
            <td class="p-2.5 text-center">${tarCov >= tariffLoss ? '<span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">OK</span>' : '<span class="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">PARTIAL</span>'}</td>
          </tr>
          <tr class="bg-slate-100 font-black text-slate-900">
            <td class="p-2.5 font-sans">${isUz ? "JAMI STRESS-YUKLAMA VA ZAXIRA BALANSI" : "TOTAL STRESS EXPOSURE & RESERVE BALANCE"}</td>
            <td class="p-2.5 text-center">${coverageRatio}%</td>
            <td class="p-2.5 text-right text-rose-700">-${(riskExposure / 1000000).toFixed(1)} ${t.mln_unit}</td>
            <td class="p-2.5 text-right text-emerald-800">${(fund / 1000000).toFixed(1)} ${t.mln_unit}</td>
            <td class="p-2.5 text-center ${netGap >= 0 ? 'text-emerald-700' : 'text-rose-600'}">${netGap >= 0 ? '+' : ''}${(netGap / 1000000).toFixed(1)} ${t.mln_unit}</td>
          </tr>
        `;
      }
    }

    function runBoardEvaluationAction() {
      const battleP = window.lastMetrics.battle_profit || 25000000;
      const forensicCf = window.lastMetrics.forensic_cash_flow || 14500000;
      const eoqCost = window.lastMetrics.eoq_annual_cost || 12000000;
      const pricingP = window.lastMetrics.pricing_profit_delta || 12000000;
      const survivalS = window.lastMetrics.survival_score || 78;

      const annualEbitda = Math.round(battleP + forensicCf + pricingP + 80000000);
      const companyValuation = Math.round(annualEbitda * 5.8);
      const boardScore = Math.min(100, Math.max(50, Math.round((survivalS * 0.4) + (annualEbitda > 100000000 ? 55 : 35))));
      const isUz = currentLang === 'uz';
      const verdict = boardScore >= 80 ? (isUz ? 'TASDIQLANDI' : 'APPROVED') : (isUz ? "QAYTA KO'RIB CHIQILSIN" : 'CONDITIONAL');

      const t = i18n[currentLang];
      const ebEl = document.getElementById('board-ebitda');
      if (ebEl) ebEl.innerText = (annualEbitda / 1000000).toFixed(1) + ' ' + t.mln_unit;
      const valEl = document.getElementById('board-valuation');
      if (valEl) valEl.innerText = (companyValuation / 1000000).toFixed(1) + ' ' + t.mln_unit;
      const scEl = document.getElementById('board-score');
      if (scEl) scEl.innerText = boardScore + " / 100";
      const vdEl = document.getElementById('board-verdict');
      if (vdEl) vdEl.innerText = verdict;

      const c = document.getElementById('board-reviews-container');
      const pC = document.getElementById('print-reviews-box');
      if (c) c.innerHTML = '';
      if (pC) pC.innerHTML = '';

      const reviews = [
        {
          role: 'CFO',
          name: 'Sherzod Alimov',
          status: verdict,
          color: boardScore >= 80 ? 'emerald' : 'amber',
          comment: isUz ? "Balans likvidligi va kassa uzilishini bartaraf etish modeli to'liq asoslangan." : "Liquidity coverage ratios and working capital turnaround verified."
        },
        {
          role: 'COO',
          name: 'Ulugbek Karimov',
          status: verdict,
          color: boardScore >= 80 ? 'emerald' : 'amber',
          comment: isUz ? "EOQ partiya taqsimoti va ta'minot zanjiri optimal boshqaruvda." : "Batch optimization under Wilson EOQ demonstrates unit economics."
        },
        {
          role: 'CRO',
          name: 'Nodira Vohidova',
          status: verdict,
          color: boardScore >= 80 ? 'emerald' : 'amber',
          comment: isUz ? "Valyuta va tarif shoklari komplayens zaxirasi bilan to'liq qoplandi." : "Foreign exchange and tariff exposures mitigated via statutory buffer."
        }
      ];

      reviews.forEach(r => {
        if (c) {
          c.innerHTML += `
            <div class="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5 shadow-sm">
              <div class="flex justify-between items-center">
                <div><strong class="text-[#0B2545] text-base">${r.role}</strong> <span class="text-slate-500 text-xs">(${r.name})</span></div>
                <span class="px-2.5 py-0.5 rounded text-badge font-bold font-mono bg-${r.color}-50 text-${r.color}-800 border border-${r.color}-200">${r.status}</span>
              </div>
              <p class="text-slate-700 leading-relaxed text-sm">${r.comment}</p>
            </div>
          `;
        }
        if (pC) {
          pC.innerHTML += `<div><strong>${r.role}:</strong> ${r.status} — ${r.comment}</div>`;
        }
      });

      const tbody = document.getElementById('board-table-body');
      if (tbody) {
        const modRows = [
          { mod: isUz ? "1-Modul: Bozor Jangi (Oligopoliya)" : "Module 1: Market Battle (Duopoly)", kpi: isUz ? "Choraklik operatsion foyda" : "Quarterly Operating Profit", val: `${(battleP / 1000000).toFixed(1)} ${t.mln_unit}`, ok: battleP >= 0 },
          { mod: isUz ? "2-Modul: Milliy Korxona Keyslari" : "Module 2: National Enterprise Cases", kpi: isUz ? "Tarmoq KPI va SI himoyasi" : "Sector KPI & AI Defense", val: isUz ? "Faol (4 korxona)" : "Active (4 enterprises)", ok: true },
          { mod: isUz ? "3-Modul: Inqiroz Balans Auditi" : "Module 3: Forensic Turnaround Audit", kpi: isUz ? "Yakuniy sof pul oqimi (CF)" : "Net Monthly Cash Flow (CF)", val: `${(forensicCf >= 0 ? '+' : '')}${(forensicCf / 1000000).toFixed(1)} ${t.mln_unit}`, ok: forensicCf >= 0 },
          { mod: isUz ? "4-Modul: Optimal Zaxira (Wilson EOQ)" : "Module 4: Optimal Inventory (EOQ)", kpi: isUz ? "Yillik logistika xarajati" : "Annual Logistics Cost", val: `${(eoqCost / 1000000).toFixed(2)} ${t.mln_unit}`, ok: true },
          { mod: isUz ? "5-Modul: Dinamik Narx Elastikligi" : "Module 5: Dynamic Price Elasticity", kpi: isUz ? "Sof marjinal foyda deltasi" : "Net Margin Profit Delta", val: `${(pricingP >= 0 ? '+' : '')}${(pricingP / 1000000).toFixed(1)} ${t.mln_unit}`, ok: pricingP >= 0 },
          { mod: isUz ? "6-Modul: Iqtisodiy Xavfsizlik Stress-Testi" : "Module 6: Economic Security Stress-Test", kpi: isUz ? "Chidamlilik indeksi (Survival)" : "Survival & Coverage Index", val: `${survivalS} / 100`, ok: survivalS >= 60 }
        ];
        tbody.innerHTML = modRows.map(r => `
          <tr class="text-slate-700 hover:bg-slate-50">
            <td class="p-2.5 font-sans font-bold text-[#0B2545]">${r.mod}</td>
            <td class="p-2.5 font-sans text-slate-600">${r.kpi}</td>
            <td class="p-2.5 text-right font-bold ${r.ok ? 'text-emerald-700' : 'text-rose-600'}">${r.val}</td>
            <td class="p-2.5 text-center">${r.ok ? '<span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">VERIFIED</span>' : '<span class="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">REVIEW</span>'}</td>
          </tr>
        `).join('');
      }

      const canvas = document.getElementById('boardValuationChart');
      if (canvas && typeof Chart !== "undefined") {
        const ctx = canvas.getContext('2d');
        if (boardChartInst) boardChartInst.destroy();
        boardChartInst = new Chart(ctx, {
          type: 'line',
          data: {
            labels: isUz ? ['1-Yil', '2-Yil (Prognoz)', '3-Yil (Prognoz)'] : ['Year 1', 'Year 2 (Forecast)', 'Year 3 (Forecast)'],
            datasets: [{
              label: isUz ? 'Bozor Kapitallashuvi' : 'Market Capitalization',
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
    }

    function openResourceModal(modKey, type) {
      const res = moduleResources[modKey];
      if (!res) return;

      const titleEl = document.getElementById('res-modal-title');
      const bodyEl = document.getElementById('res-modal-body');
      const isUz = currentLang === 'uz';

      if (type === 'video') {
        const formattedUrl = formatYouTubeEmbedUrl(res.video_url);
        titleEl.innerHTML = `<i class="fa-solid fa-circle-play text-amber-600"></i> <span>${res.title[currentLang]} — ${isUz ? 'Video Dars' : 'Video Lecture'}</span>`;
        bodyEl.innerHTML = `
          <div class="aspect-video bg-black rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center">
            <iframe class="w-full h-full" src="${formattedUrl}" title="Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
          </div>
          <div class="flex justify-between items-center mt-2">
            <p class="text-slate-600 text-xs">${res.video[currentLang]}</p>
            <a href="${res.video_url}" target="_blank" class="text-xs text-[#0B2545] font-bold underline whitespace-nowrap ml-2">${isUz ? "YouTube'da ko'rish" : 'Watch on YouTube'}</a>
          </div>
        `;
      } else {
        const stepsList = (res.steps?.[currentLang] || []).map(s => `<li class="text-xs text-slate-700">${s}</li>`).join('');
        titleEl.innerHTML = `<i class="fa-solid fa-file-pdf text-[#0B2545]"></i> <span>${res.title[currentLang]} — ${isUz ? "Metodik Qo'llanma" : 'Methodological Guide'}</span>`;
        bodyEl.innerHTML = `
          <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 max-h-[60vh] overflow-y-auto">
            <div>
              <h4 class="font-bold text-[#0B2545] text-xs uppercase">${isUz ? '1. Konsepsiya va Maqsad:' : '1. Concept & Objective:'}</h4>
              <p class="text-slate-700 text-xs mt-1 leading-relaxed">${res.guide[currentLang]}</p>
            </div>
            <div>
              <h4 class="font-bold text-[#0B2545] text-xs uppercase">${isUz ? '2. Matematik Formula:' : '2. Mathematical Formula:'}</h4>
              <div class="p-2.5 bg-white border border-slate-200 rounded-lg font-mono text-xs text-slate-900 mt-1">${res.formula?.[currentLang] || ''}</div>
            </div>
            <div>
              <h4 class="font-bold text-[#0B2545] text-xs uppercase">${isUz ? '3. Amaliy Qadamlar:' : '3. Execution Steps:'}</h4>
              <ul class="list-disc pl-4 space-y-1 mt-1">${stepsList}</ul>
            </div>
            <div>
              <h4 class="font-bold text-[#0B2545] text-xs uppercase">${isUz ? '4. Qaror Qabul Qilish Mezoni:' : '4. Decision & Risk Criteria:'}</h4>
              <p class="text-slate-700 text-xs mt-1 leading-relaxed">${res.criteria?.[currentLang] || ''}</p>
            </div>
          </div>
          <button onclick="printMethodologicalGuide('${modKey}')" class="w-full py-2.5 bg-[#0B2545] hover:bg-[#0D3B66] text-white font-bold rounded-xl transition shadow-xs">
            <i class="fa-solid fa-print mr-1.5"></i> ${isUz ? "Qo'llanmani Chop Etish (PDF)" : 'Print Methodological Guide (PDF)'}
          </button>
        `;
      }
      document.getElementById('resource-modal').classList.remove('hidden');
    }

    function closeResourceModal() {
      document.getElementById('resource-modal').classList.add('hidden');
    }

    
// ================= RISK MATRIX (ISO 31000) LOGIC =================
const corporateRisks = [
  { id: 'fx', name: { uz: "Valyuta devalvatsiyasi xatari (+15%)", en: "Currency Devaluation Exposure (+15%)" }, prob: 4, impact: 4, strat: { uz: "Valyuta forvard xedjirlash shartnomalari, valyuta tushumi diversifikatsiyasi va favqulodda zaxira.", en: "Forward FX hedging contracts, currency revenue diversification and statutory reserve buffers." } },
  { id: 'supplier', name: { uz: "Ta'minot zanjiri uzilishi (Stock-out)", en: "Supply Chain Disruption (Stock-out)" }, prob: 3, impact: 5, strat: { uz: "2-darajali muqobil yetkazib beruvchilarni jalb qilish, xavfsizlik buferi va EOQ partiyasini oshirish.", en: "Secondary dual-sourcing integration, enhanced safety buffer and batch sizing escalation." } },
  { id: 'price_war', name: { uz: "Raqobatchilar narx dempingi (-20%)", en: "Predatory Rival Price War (-20%)" }, prob: 4, impact: 3, strat: { uz: "Mahsulot differensiatsiyasi, xizmat ko'rsatish sifati va operatsion tannarxni optimallashtirish.", en: "Product differentiation, service reliability moats and marginal unit cost rationalization." } },
  { id: 'liquidity', name: { uz: "Kassa uzilishi va debitorlik qarzlar muzlashi", en: "Cash Runway Gap & Distressed Receivables" }, prob: 3, impact: 4, strat: { uz: "Faktoring xizmatlari, sekin aylanuvchi tovarlarni diskont bilan naqdlashtirish va kredit muddatini uzaytirish.", en: "Receivables factoring, slow-moving inventory liquidation and debt maturity rescheduling." } },
  { id: 'tariff', name: { uz: "Bojxona import stavkalarining oshishi", en: "Import Customs Tariff Escalation" }, prob: 2, impact: 4, strat: { uz: "Mahalliy butlovchi qismlarni jalb qilish va mahalliylashtirish darajasini 45% dan oshirish.", en: "Accelerating domestic component substitution and localization thresholds beyond 45%." } }
];

let activeRiskIndex = 0;

function initRiskMatrix() {
  const sel = document.getElementById('rm-risk-selector');
  if (!sel) return;
  sel.innerHTML = corporateRisks.map((r, idx) => `<option value="${idx}">${r.name[currentLang]}</option>`).join('');
  renderRiskHeatmap();
  loadSelectedRisk();
}

function renderRiskHeatmap() {
  const tbody = document.getElementById('risk-heatmap-body');
  if (!tbody) return;
  const currentRisk = corporateRisks[activeRiskIndex];
  let rows = '';

  for (let imp = 5; imp >= 1; imp--) {
    const impLabels = currentLang === 'uz'
      ? { 5: 'Halokatli', 4: 'Jiddiy', 3: "O'rtacha", 2: 'Kichik', 1: 'Arzimas' }
      : { 5: 'Catastrophic', 4: 'Major', 3: 'Moderate', 2: 'Minor', 1: 'Negligible' };
    let cells = `<tr><td class="p-2 font-bold text-slate-700 text-left">${imp} (${impLabels[imp]})</td>`;
    for (let prob = 1; prob <= 5; prob++) {
      const score = imp * prob;
      let colorClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      if (score >= 15) colorClass = 'bg-rose-100 text-rose-900 border-rose-300 font-black';
      else if (score >= 10) colorClass = 'bg-orange-100 text-orange-900 border-orange-300 font-bold';
      else if (score >= 5) colorClass = 'bg-amber-100 text-amber-900 border-amber-300 font-bold';

      const isCurrent = currentRisk && currentRisk.prob === prob && currentRisk.impact === imp;
      const highlight = isCurrent ? 'ring-4 ring-[#0B2545] scale-105 z-10' : '';

      cells += `<td class="p-2.5 border ${colorClass} ${highlight} transition cursor-pointer" onclick="setRiskParams(${prob}, ${imp})">${score}</td>`;
    }
    cells += '</tr>';
    rows += cells;
  }
  tbody.innerHTML = rows;
  const regBody = document.getElementById('risk-register-tbody');
  if (regBody) {
    const isUz = currentLang === 'uz';
    regBody.innerHTML = corporateRisks.map((r, idx) => {
      const sc = r.prob * r.impact;
      const badge = sc >= 15
        ? `<span class="px-2 py-0.5 rounded bg-rose-100 text-rose-900 font-bold font-mono">${isUz ? 'Kritik' : 'Critical'}</span>`
        : (sc >= 10
          ? `<span class="px-2 py-0.5 rounded bg-orange-100 text-orange-900 font-bold font-mono">${isUz ? 'Yuqori' : 'High'}</span>`
          : (sc >= 5
            ? `<span class="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold font-mono">${isUz ? "O'rtacha" : 'Medium'}</span>`
            : `<span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold font-mono">${isUz ? 'Past' : 'Low'}</span>`));
      return `
        <tr onclick="setRiskParams(${r.prob}, ${r.impact})" class="cursor-pointer ${idx === activeRiskIndex ? 'bg-blue-50/70 font-bold' : 'hover:bg-slate-50'}">
          <td class="p-2.5 text-[#0B2545]">${r.name[currentLang]}</td>
          <td class="p-2.5 text-center font-mono">${r.prob} / 5</td>
          <td class="p-2.5 text-center font-mono">${r.impact} / 5</td>
          <td class="p-2.5 text-center font-mono font-black">${sc} / 25</td>
          <td class="p-2.5 text-center">${badge}</td>
          <td class="p-2.5 text-slate-600 text-[11px]">${r.strat[currentLang]}</td>
        </tr>
      `;
    }).join('');
  }
}

function setRiskParams(p, i) {
  const pSlider = document.getElementById('rm-prob-slider');
  const iSlider = document.getElementById('rm-imp-slider');
  if (pSlider) pSlider.value = p;
  if (iSlider) iSlider.value = i;
  updateRiskScoreLive();
}

function loadSelectedRisk() {
  const sel = document.getElementById('rm-risk-selector');
  if (!sel) return;
  activeRiskIndex = parseInt(sel.value) || 0;
  const r = corporateRisks[activeRiskIndex];
  if (r) {
    const pSlider = document.getElementById('rm-prob-slider');
    const iSlider = document.getElementById('rm-imp-slider');
    if (pSlider) pSlider.value = r.prob;
    if (iSlider) iSlider.value = r.impact;
    updateRiskScoreLive();
  }
}

function updateRiskScoreLive() {
  const pEl = document.getElementById('rm-prob-slider');
  const iEl = document.getElementById('rm-imp-slider');
  if (!pEl || !iEl) return;
  const p = parseInt(pEl.value);
  const i = parseInt(iEl.value);
  
  const probVal = document.getElementById('rm-prob-val');
  const impVal = document.getElementById('rm-imp-val');
  if (probVal) probVal.innerText = `${p} / 5`;
  if (impVal) impVal.innerText = `${i} / 5`;

  const score = p * i;
  const scoreDisp = document.getElementById('rm-score-display');
  if (scoreDisp) scoreDisp.innerText = `${score} / 25`;

  const badge = document.getElementById('rm-status-badge');
  const desc = document.getElementById('rm-mit-desc');
  const currentRisk = corporateRisks[activeRiskIndex];

  if (badge) {
    if (score >= 15) {
      badge.className = 'px-2.5 py-1 rounded-lg text-xs font-bold font-mono text-center bg-rose-100 text-rose-900 border border-rose-300';
      badge.innerText = currentLang === 'uz' ? 'KRITIK XATAR (DARHOL MITIGATSIYA)' : 'CRITICAL THREAT (IMMEDIATE MITIGATION)';
    } else if (score >= 10) {
      badge.className = 'px-2.5 py-1 rounded-lg text-xs font-bold font-mono text-center bg-orange-100 text-orange-900 border border-orange-300';
      badge.innerText = currentLang === 'uz' ? 'YUQORI XATAR (CHORALAR REJASI)' : 'HIGH RISK (ACTIVE MITIGATION)';
    } else if (score >= 5) {
      badge.className = 'px-2.5 py-1 rounded-lg text-xs font-bold font-mono text-center bg-amber-100 text-amber-900 border border-amber-300';
      badge.innerText = currentLang === 'uz' ? 'O\'RTACHA XATAR (MONITORING)' : 'MEDIUM RISK (MONITORING)';
    } else {
      badge.className = 'px-2.5 py-1 rounded-lg text-xs font-bold font-mono text-center bg-emerald-100 text-emerald-800 border border-emerald-300';
      badge.innerText = currentLang === 'uz' ? 'PAST XATAR (QABUL QILISH)' : 'LOW RISK (ACCEPTABLE)';
    }
  }

  if (currentRisk && desc) {
    currentRisk.prob = p;
    currentRisk.impact = i;
    desc.innerText = currentRisk.strat[currentLang];
  }

  renderRiskHeatmap();
}

function applyRiskMitigationAction() {
  const pSlider = document.getElementById('rm-prob-slider');
  const iSlider = document.getElementById('rm-imp-slider');
  if (!pSlider || !iSlider) return;
  let p = Math.max(1, parseInt(pSlider.value) - 1);
  let i = Math.max(1, parseInt(iSlider.value) - 1);
  pSlider.value = p;
  iSlider.value = i;
  updateRiskScoreLive();
}

function resetRiskMatrix() {
  corporateRisks[0].prob = 4; corporateRisks[0].impact = 4;
  corporateRisks[1].prob = 3; corporateRisks[1].impact = 5;
  corporateRisks[2].prob = 4; corporateRisks[2].impact = 3;
  corporateRisks[3].prob = 3; corporateRisks[3].impact = 4;
  corporateRisks[4].prob = 2; corporateRisks[4].impact = 4;
  loadSelectedRisk();
}

// Explicit Global Window Bindings for Guaranteed Button Execution
window.switchView = switchView;
window.toggleLang = toggleLang;
window.openCaseModal = openCaseModal;
window.closeCaseModal = closeCaseModal;
window.checkCaseAnswer = checkCaseAnswer;
window.runDuelAction = runDuelAction;
window.updateDuelSlider = updateDuelSlider;
window.gotoLabStep = gotoLabStep;
window.submitQuizAction = submitQuizAction;
window.sendChatMsg = sendChatMsg;
window.printCertificate = printCertificate;
window.printExecutiveDeck = printExecutiveDeck;
window.runForensicAction = runForensicAction;
window.runEOQAction = runEOQAction;
window.runPricingAction = runPricingAction;
window.runSecurityAction = runSecurityAction;
window.runBoardEvaluationAction = runBoardEvaluationAction;
window.openResourceModal = openResourceModal;
window.printMethodologicalGuide = printMethodologicalGuide;
window.closeResourceModal = closeResourceModal;
window.applyRiskMitigationAction = applyRiskMitigationAction;
window.resetRiskMatrix = resetRiskMatrix;

window.previewDuelLive = previewDuelLive;

window.onload = () => {
      applyLanguageTexts();
      initRiskMatrix();
      renderCaseList();
      loadMissionsData();
      previewDuelLive();
      runForensicAction();
      runEOQAction();
      runPricingAction();
      runSecurityAction();
      runBoardEvaluationAction();
      switchView('home');
    };
