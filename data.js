/* =====================================================================
   Nitesh Patel — Intern Prep Tracker  ·  Seed / default data
   This is the personalized plan. It loads only the first time;
   after that your saved progress in the browser takes over.
   ===================================================================== */

const NITESH = {
  meta: {
    name: "Nitesh Patel",
    initials: "NP",
    branch: "Civil Engineering · IIT Bombay · 24B0653",
    cpi: "7.96",
    season: "Profiles in Analytics",
    storeKey: "nitesh_intern_tracker_v1",
    pin: "2468",
    friendId: "mishti",
    countdown: [
      { label: "days to shortlists", date: "2026-07-20" },
      { label: "days to interviews", date: "2026-08-01" }
    ],
    nav: [
      { view: "dashboard", icon: "◆", label: "Dashboard" },
      { view: "plan", icon: "▦", label: "Season Plan" },
      { view: "skills", icon: "▤", label: "Skills Tracker" },
      { view: "companies", icon: "★", label: "Target Companies" },
      { view: "stories", icon: "❝", label: "Interview Stories" },
      { view: "contacts", icon: "☏", label: "Senior Contacts" },
      { view: "resources", icon: "↗", label: "Resources" },
      { view: "extra", icon: "➕", label: "Extra Resources" },
      { view: "log", icon: "✓", label: "Daily Log" },
      { view: "friend", icon: "👥", label: "Friend's Progress" }
    ],
    titles: {
      dashboard: ["Dashboard", "Resume submitted ✓ — now we grind. Own the OAs, mocks & applications."],
      plan: ["Season Plan", "Jul 13 → season · core OA prep → peak + apply → execute live. Grind harder now."],
      skills: ["Skills Tracker", "Count every problem. Momentum compounds."],
      companies: ["Target Companies", "Know your targets before the season opens. Editable — make it yours."],
      resume: ["Resume Fixes", "Fix the critical errors today. They get you rejected before content is read."],
      resumes: ["Tailored Resumes", "Genuine content only · pick a role version and 1- or 2-page length, then Download / Print as PDF."],
      stories: ["Interview Stories", "3–4 stories: hard problem, teamwork, failure + recovery."],
      contacts: ["Senior Contacts", "Seniors are everything. Reach out NOW."],
      resources: ["Resources", "Curated — only what you actually need."],
      extra: ["Additional Resources", "Cheatsheets, quant PDFs, company-wise LeetCode & SQL — your shared links."],
      log: ["Daily Log", "Consistency beats intensity. Keep the streak."],
      friend: ["Friend's Progress", "See Mishti's momentum live — progress only, nothing else."]
    }
  },

  /* ---- SEASON GRIND PLAN (resume submitted ✓ · Jul 13 → season) ---- */
  plan: [
    {
      id: "s1", title: "Season Grind — Core OA Prep", dates: "Jul 13 – 19", badge: "wk1", range: ["2026-07-13", "2026-07-19"],
      days: [
        { label: "Daily (Mon–Sun) — highest-leverage week, go hard", tasks: [
          { id: "s1d1", tag: "dsa", text: "DSA 2 hrs — grind patterns: Two Pointers, Sliding Window, Binary Search, Trees, Graphs, DP (medium). Aim +5/day.", links: [ { label: "Strivers A2Z", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" }, { label: "NeetCode 150", url: "https://neetcode.io/practice" } ] },
          { id: "s1d2", tag: "sql", text: "SQL 45 min — finish LeetCode 'Top SQL 50': window functions, CTEs, ranking, joins.", links: [ { label: "Top SQL 50", url: "https://leetcode.com/studyplan/top-sql-50/" } ] },
          { id: "s1d3", tag: "apti", text: "Aptitude 45 min — timed sets (IndiaBix / GFG): quant, DI, logical. Build speed, not perfection.", links: [ { label: "IndiaBix", url: "https://www.indiabix.com/" }, { label: "GfG Aptitude", url: "https://www.geeksforgeeks.org/aptitude-questions-and-answers/" } ] },
          { id: "s1d4", tag: "ml", text: "ML 1 hr — master 1 model/day (Linear/Logistic, Trees, RF, XGBoost, SVM, KMeans, PCA): why it works, when it fails, key hyperparameters.", links: [ { label: "StatQuest", url: "https://www.youtube.com/c/joshstarmer" }, { label: "Andrew Ng ML", url: "https://www.coursera.org/specializations/machine-learning-introduction" } ] },
        ]},
        { label: "This week", tasks: [
          { id: "s1c1", tag: "camptest", text: "Clear the campus-mock backlog: 1 timed aptitude + 1 timed coding mock; review EVERY mistake." },
          { id: "s1s1", tag: "soc", text: "SOC — finish remaining deliverables, get fully caught up; send your mentor a status update." },
          { id: "s1m1", tag: "mock", text: "1 mock interview with a senior (tech: DSA + ML)." },
        ]},
        { label: "By Sunday (checkpoint)", tasks: [
          { id: "s1k1", tag: "dsa", text: "✅ DSA total ≥ 60 problems" },
          { id: "s1k2", tag: "ml", text: "✅ 5 ML models mastered" },
        ]},
      ]
    },
    {
      id: "s2", title: "Peak + Mocks + Apply", dates: "Jul 20 – 27", badge: "wk2", range: ["2026-07-20", "2026-07-27"],
      days: [
        { label: "Daily", tasks: [
          { id: "s2d1", tag: "dsa", text: "DSA 1.5 hrs — 1 timed OA-style set + revise the weak patterns your mocks exposed.", links: [ { label: "LeetCode", url: "https://leetcode.com/problemset/" }, { label: "Company-wise LC", url: "https://github.com/hxu296/leetcode-company-wise-problems-2022" } ] },
          { id: "s2d2", tag: "stats", text: "Stats/Probability 45 min — Sheldon Ross + CME106 cheatsheet: expected value, Bayes, distributions.", links: [ { label: "CME106 Cheatsheet", url: "https://stanford.edu/~shervine/teaching/cme106/cheatsheet-statistics" } ] },
          { id: "s2d3", tag: "apti", text: "Aptitude 30 min timed + 5 probability puzzles (Brainstellar / Heard on the Street).", links: [ { label: "Brainstellar", url: "https://brainstellar.com/" } ] },
          { id: "s2d4", tag: "sql", text: "SQL 30 min — DataLemur medium (real analytics scenarios).", links: [ { label: "DataLemur", url: "https://datalemur.com/questions" } ] },
        ]},
        { label: "This week", tasks: [
          { id: "s2a1", tag: "meta", text: "APPLY to every open target (dream + realistic + safe) the moment its test opens; log status in Target Companies." },
          { id: "s2m1", tag: "mock", text: "2 mock interviews: 1 analytics (SQL + case + guesstimate), 1 tech (DSA + ML)." },
          { id: "s2c1", tag: "camptest", text: "2 more campus mocks (alternate aptitude / coding) + full review." },
          { id: "s2o1", tag: "oop", text: "OOP — drill 20 interview Qs + 1 LLD problem (for Sony / Goldman-eng style rounds).", links: [ { label: "GfG OOP Qs", url: "https://www.geeksforgeeks.org/oops-interview-questions/" }, { label: "Awesome LLD", url: "https://github.com/ashishps1/awesome-low-level-design" } ] },
        ]},
        { label: "By Sunday (checkpoint)", tasks: [
          { id: "s2k1", tag: "dsa", text: "✅ DSA total ≥ 90; mediums feel comfortable" },
          { id: "s2k2", tag: "stats", text: "✅ 25 stats / probability problems" },
        ]},
      ]
    },
    {
      id: "s3", title: "Season Live — Execute", dates: "Jul 28 – Aug 10", badge: "wk4", range: ["2026-07-28", "2026-08-10"],
      days: [
        { label: "Daily — stay sharp, don't cram", tasks: [
          { id: "s3d1", tag: "dsa", text: "DSA 1 hr — light revision of your strongest patterns; no new hard topics now.", links: [ { label: "LeetCode", url: "https://leetcode.com/problemset/" } ] },
          { id: "s3d2", tag: "apti", text: "Aptitude / guesstimate 30 min — think out loud, narrate your process.", links: [ { label: "IndiaBix", url: "https://www.indiabix.com/" } ] },
          { id: "s3d3", tag: "meta", text: "After EVERY OA / interview: 5-min debrief — what was asked, what to fix before the next one." },
        ]},
        { label: "Before each interview", tasks: [
          { id: "s3m1", tag: "mock", text: "1 mock interview the day before; rehearse your 4 stories out loud." },
          { id: "s3r1", tag: "resume", text: "Know every resume line cold — goal, method, result, what you'd change." },
        ]},
        { label: "Non-negotiables", tasks: [
          { id: "s3n1", tag: "meta", text: "Apply as new companies open — never miss a test window. Track everything in Target Companies." },
          { id: "s3n2", tag: "meta", text: "Sleep 7+ hrs, eat, short walks. A rested brain clears OAs; a fried one doesn't." },
        ]},
      ]
    }
  ],

  /* ---- SKILLS (counters with targets) ---- */
  skills: [
    { id: "dsa", name: "DSA Problems", icon: "▤", color: "#2f6fb0", count: 0, target: 120, unit: "problems", note: "Strivers A2Z + NeetCode 150" },
    { id: "sql", name: "SQL Problems", icon: "▦", color: "#d8453e", count: 0, target: 60, unit: "problems", note: "Mode tutorial → StrataScratch" },
    { id: "ml", name: "ML Models Mastered", icon: "◉", color: "#2e7d46", count: 0, target: 9, unit: "models", note: "Andrew Ng CS229 + StatQuest" },
    { id: "stats", name: "Stats / Probability", icon: "∑", color: "#7a4fb0", count: 0, target: 50, unit: "problems", note: "Brainstellar + Sheldon Ross" },
    { id: "apti", name: "Aptitude / Puzzles", icon: "◇", color: "#9a531b", count: 0, target: 80, unit: "puzzles", note: "GFG + Brainstellar + IndiaBix" },
    { id: "oop", name: "OOP Practice Qs", icon: "◈", color: "#0e7c86", count: 0, target: 40, unit: "questions", note: "You know theory → drill Qs + LLD" },
    { id: "mock", name: "Mock Interviews", icon: "☻", color: "#1b2559", count: 0, target: 6, unit: "mocks", note: "With seniors — tech/analytics/HR" },
    { id: "camptest", name: "Campus Mock Tests", icon: "▥", color: "#c2410c", count: 0, target: 8, unit: "tests", note: "Aptitude + coding OAs — clear the backlog" },
  ],

  /* ---- TARGET COMPANIES ---- */
  companies: [
    { id: "c1", name: "American Express", tier: "dream", role: "Analyst Intern", test: "Aptitude 60Q/60min (NTSE-level) + resume", topics: "Apti, ML depth, SQL, guesstimate, basic DSA", senior: "Aditya (9324481748)", status: "Researching" },
    { id: "c2", name: "Goldman Sachs", tier: "dream", role: "Analytics / Engineering", test: "OA: DSA + DS Qs", topics: "DSA, OOP, ML, Stats", senior: "", status: "Researching" },
    { id: "c3", name: "JP Morgan", tier: "dream", role: "CIB Analytics", test: "Aptitude + coding", topics: "SQL, Stats, Apti", senior: "", status: "Not started" },
    { id: "c4", name: "Optum", tier: "dream", role: "Data Scientist", test: "OA + case", topics: "ML, SQL, Stats", senior: "", status: "Not started" },
    { id: "c5", name: "ZS Associates", tier: "dream", role: "Decision Analytics", test: "Apti + case + guesstimate", topics: "Case, guesstimate, SQL", senior: "", status: "Not started" },
    { id: "c6", name: "Fractal Analytics", tier: "realistic", role: "AI/ML Intern", test: "DSA round + ML", topics: "Stats, DSA, ML, OOP", senior: "", status: "Not started" },
    { id: "c7", name: "Tiger Analytics", tier: "realistic", role: "Data Analyst", test: "SQL + ML + case", topics: "SQL, ML, Stats", senior: "", status: "Not started" },
    { id: "c8", name: "Tredence", tier: "realistic", role: "Analytics", test: "Apti + SQL", topics: "SQL, Stats", senior: "", status: "Not started" },
    { id: "c9", name: "Mu Sigma", tier: "realistic", role: "Decision Sciences", test: "Apti + case", topics: "Case, guesstimate, stats", senior: "", status: "Not started" },
    { id: "c10", name: "Sigmoid", tier: "realistic", role: "Data Engineer/Analyst", test: "SQL + Python OA", topics: "SQL, Python, DSA", senior: "", status: "Not started" },
    { id: "c11", name: "Wells Fargo", tier: "realistic", role: "Analytics", test: "OA + interview", topics: "SQL, Stats, ML", senior: "", status: "Not started" },
    { id: "c12", name: "Citi", tier: "realistic", role: "Analytics", test: "Apti + SQL", topics: "SQL, Apti, Stats", senior: "", status: "Not started" },
    { id: "c13", name: "Adobe (MDSR)", tier: "stretch", role: "ML Research", test: "DSA-heavy OA + ML", topics: "DSA, ML, DL, Stats", senior: "", status: "Not started" },
    { id: "c14", name: "Sony", tier: "stretch", role: "SDE / Vision", test: "DSA + OOP", topics: "DSA, OOP, C++", senior: "Khushi (7725970409)", status: "Not started" },
  ],

  /* ---- RESUME FIX CHECKLIST ---- */
  resume: {
    critical: [
      { id: "r1", text: "Fix date typos: RBCCPS 'May 26–Jun 30' → real dates (extends to 2030 = red flag)", done: false },
      { id: "r2", text: "Fix Stock App date 'May 26–Jul 30' → real dates", done: false },
      { id: "r3", text: "Fix 'Summer of Core' apostrophe dates → Jun '25–Jul '25", done: false },
      { id: "r4", text: "Merge 2 duplicate stock-prediction projects into ONE block", done: false },
      { id: "r5", text: "Fix spelling: 'Webscrapper' → 'Web Scraper'", done: false },
      { id: "r6", text: "Make a tight 1-pager for IITB portal (mandatory)", done: false },
    ],
    content: [
      { id: "r7", text: "Delete filler bullets ('Gained hands-on experience…', 'Attended DSA workshop')", done: false },
      { id: "r8", text: "Add a number/metric to LSTM project (RMSE, % vs baseline)", done: false },
      { id: "r9", text: "Add scraper scale (e.g. 500+ listings, sources)", done: false },
      { id: "r10", text: "Add a SQL/analytics project (Kaggle data) before season", done: false },
      { id: "r11", text: "Add LeetCode/CF stat to skills once 150 problems / 1400 rating", done: false },
      { id: "r12", text: "Re-categorize skills; drop Cygnus IDE / Figma / MS Office", done: false },
      { id: "r13", text: "Add C++ and SQL to languages (once actually learned)", done: false },
    ]
  },

  /* ---- INTERVIEW STORIES ---- */
  stories: [
    { id: "s1", label: "🧩 Hard problem you solved", hint: "Use the LSTM stock model — data leakage? overfitting? deployment latency? Walk through the tradeoff you made.", text: "" },
    { id: "s2", label: "🤝 Teamwork / leadership", hint: "CEA Web Secretary — coordinating 20+ member team, building the CEA website, organising events.", text: "" },
    { id: "s3", label: "💥 Failure + recovery", hint: "Be honest. A project that broke, a CPI dip, a missed deadline — and what you concretely changed.", text: "" },
    { id: "s4", label: "🎯 Why analytics / why this company", hint: "Connect your ML projects + interest in data-driven decisions to the specific company's work.", text: "" },
  ],

  /* ---- CONTACTS ---- */
  contacts: [
    { id: "ct1", name: "Aditya Anand Gupta", role: "American Express · Analyst Intern", phone: "9324481748", note: "AmEx targeting, aptitude/ML focus, no-DSA path. Open to resume review.", reached: false },
    { id: "ct2", name: "Khushi Taxak", role: "Sony Japan · Vision Computing", phone: "7725970409", note: "EE Dual Degree. General prep, seniors-are-everything advice.", reached: false },
    { id: "ct3", name: "Hussain (batterywala)", role: "Quant Dev · 2Cents Capital", phone: "9111620152", note: "1700+ CF, 2100+ LC. DSA mentor (TLE). Email: husainbatterywala9@gmail.com", reached: false },
  ],

  /* ---- RESOURCES ---- */
  resources: [
    { cat: "DSA", items: [
      { name: "Striver A2Z Sheet", desc: "Primary DSA roadmap", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" },
      { name: "NeetCode 150", desc: "Video explanations backup", url: "https://neetcode.io/" },
      { name: "TLE Eliminators CP Sheet", desc: "If you go for CP", url: "https://www.tle-eliminators.com/cp-sheet" },
      { name: "CSES Problem Set", desc: "Advanced (optional)", url: "https://cses.fi/problemset/list/" },
    ]},
    { cat: "Analytics / SQL", items: [
      { name: "Mode SQL Tutorial", desc: "Start here for SQL", url: "https://mode.com/sql-tutorial/" },
      { name: "StrataScratch", desc: "Real interview SQL Qs", url: "https://www.stratascratch.com/" },
    ]},
    { cat: "SQL — Must-Do Problems (in order)", items: [
      { name: "LeetCode — Top SQL 50 (study plan)", desc: "DO THIS FIRST — single best curated set", url: "https://leetcode.com/studyplan/top-sql-50/" },
      { name: "175 — Combine Two Tables", desc: "LEFT JOIN basics", url: "https://leetcode.com/problems/combine-two-tables/" },
      { name: "181 — Employees Earning More Than Managers", desc: "Self-join", url: "https://leetcode.com/problems/employees-earning-more-than-their-managers/" },
      { name: "182 — Duplicate Emails", desc: "GROUP BY + HAVING", url: "https://leetcode.com/problems/duplicate-emails/" },
      { name: "183 — Customers Who Never Order", desc: "NOT IN / anti-join", url: "https://leetcode.com/problems/customers-who-never-order/" },
      { name: "197 — Rising Temperature", desc: "Self-join on dates", url: "https://leetcode.com/problems/rising-temperature/" },
      { name: "176 — Second Highest Salary", desc: "Subquery / LIMIT OFFSET", url: "https://leetcode.com/problems/second-highest-salary/" },
      { name: "184 — Department Highest Salary", desc: "Window / correlated subquery", url: "https://leetcode.com/problems/department-highest-salary/" },
      { name: "185 — Department Top 3 Salaries", desc: "DENSE_RANK() — classic", url: "https://leetcode.com/problems/department-top-three-salaries/" },
      { name: "180 — Consecutive Numbers", desc: "LAG/LEAD or self-join", url: "https://leetcode.com/problems/consecutive-numbers/" },
      { name: "550 — Game Play Analysis IV", desc: "Retention / date diff (asked a LOT)", url: "https://leetcode.com/problems/game-play-analysis-iv/" },
      { name: "1321 — Restaurant Growth", desc: "Moving 7-day average", url: "https://leetcode.com/problems/restaurant-growth/" },
      { name: "1158 — Market Analysis I", desc: "Multi-join + conditional agg", url: "https://leetcode.com/problems/market-analysis-i/" },
      { name: "601 — Human Traffic of Stadium", desc: "Hard — consecutive rows", url: "https://leetcode.com/problems/human-traffic-of-stadium/" },
      { name: "DataLemur (free analytics SQL)", desc: "FAANG-style, after SQL 50", url: "https://datalemur.com/questions" },
    ]},
    { cat: "Stats / Probability", items: [
      { name: "Brainstellar", desc: "Probability + puzzles", url: "https://brainstellar.com/" },
    ]},
    { cat: "ML Fundamentals", items: [
      { name: "Andrew Ng CS229 Notes", desc: "Core ML math intuition", url: "https://cs229.stanford.edu/" },
      { name: "StatQuest (YouTube)", desc: "Visual model intuition", url: "https://www.youtube.com/c/joshstarmer" },
    ]},
    { cat: "OOP — Theory + Practice", items: [
      { name: "GfG OOP Interview Questions", desc: "You know theory — now grind these Qs", url: "https://www.geeksforgeeks.org/oops-interview-questions/" },
      { name: "InterviewBit OOPS", desc: "Structured Q&A with code", url: "https://www.interviewbit.com/oops-interview-questions/" },
      { name: "Refactoring.Guru — Design Patterns", desc: "Singleton, Factory, Observer, Strategy", url: "https://refactoring.guru/design-patterns" },
      { name: "Awesome Low-Level Design (LLD)", desc: "Parking lot, vending machine, ATM, BookMyShow", url: "https://github.com/ashishps1/awesome-low-level-design" },
      { name: "Code With Harry C++ OOP", desc: "Visual playlist if you want a refresher", url: "https://www.youtube.com/c/CodeWithHarry" },
    ]},
    { cat: "Projects / Data", items: [
      { name: "Kaggle", desc: "Datasets + competitions", url: "https://www.kaggle.com/" },
      { name: "Papers With Code", desc: "Implement papers", url: "https://paperswithcode.com/" },
    ]},
    { cat: "Company Research", items: [
      { name: "Glassdoor", desc: "Interview experiences", url: "https://www.glassdoor.co.in/" },
      { name: "LinkedIn", desc: "Find seniors at target cos", url: "https://www.linkedin.com/" },
    ]},
  ],

  /* ---- ADDITIONAL RESOURCES (your shared links) ---- */
  extra: [
    { cat: "ML / DL / Stats Cheatsheets", items: [
      { name: "CS229 — Deep Learning Cheatsheet", desc: "Stanford · Shervine — DL quick reference", url: "https://stanford.edu/~shervine/teaching/cs229/cheatsheet-deep-learning" },
      { name: "ML Cheatsheet (readthedocs)", desc: "Concepts, math & code for ML", url: "https://ml-cheatsheet.readthedocs.io/en/latest/" },
      { name: "CME106 — Statistics Cheatsheet", desc: "Stanford · Shervine — probability & stats", url: "https://stanford.edu/~shervine/teaching/cme106/cheatsheet-statistics" },
    ]},
    { cat: "Probability & Puzzles (quant / analytics)", items: [
      { name: "Brainstellar", desc: "Probability puzzles (Easy → Hard)", url: "https://brainstellar.com/" },
      { name: "Probability (PDF)", desc: "Shared Google Drive notes", url: "https://drive.google.com/file/d/1boZw-GkQWVPI95tfpzmq7EizxxhMp6m/view?usp=sharing" },
      { name: "Heard on the Street (PDF)", desc: "Classic quant interview questions", url: "https://drive.google.com/file/d/1EYHQC2OWjnwLv1i_RLeQPFFuL9AXE7pX/view?usp=sharing" },
    ]},
    { cat: "DSA / SQL", items: [
      { name: "Princeton algs4 Cheatsheet", desc: "DSA you should know beforehand", url: "https://algs4.cs.princeton.edu/cheatsheet/" },
      { name: "Company-wise LeetCode (2022)", desc: "Questions grouped by company", url: "https://github.com/hxu296/leetcode-company-wise-problems-2022" },
      { name: "SQL Interview Questions", desc: "Curated SQL interview repo", url: "https://github.com/kansiris/SQL-interview-questions" },
    ]},
  ],

  /* ---- TAILORED RESUMES ----
     Every line below is taken directly from Nitesh's real resume — nothing
     is invented. The ONLY placeholders are personal details you alone know
     ([email], [phone], [github], [linkedin]) and an optional coursework line.
     No fabricated metrics. Add a number only if it is genuinely true. ---- */
  resumeCommon: {
    name: "Nitesh Patel",
    headline: "B.Tech, Civil Engineering · IIT Bombay · Roll 24B0653",
    contact: "[email]@iitb.ac.in  ·  +91-[phone]  ·  github.com/[github]  ·  linkedin.com/in/[linkedin]",
    education: {
      degree: "B.Tech, Civil Engineering — Indian Institute of Technology Bombay",
      span: "2024 – 2028",
      cpi: "CPI: 7.96 / 10"
    },
    scholastic: [
      "Secured 99.62 percentile in JEE Mains 2024 among 1.4M+ candidates nationwide",
      "Scored 96% in CBSE Class XII 2022 among 2.4M+ candidates across the country"
    ],
    coursework: "[Optional — add the relevant courses you have actually taken, e.g. Data Structures, Probability, Linear Algebra]",
    por: {
      title: "Web Secretary — Civil Engineering Association, IIT Bombay",
      date: "Apr '25 – Present",
      bullets: [
        "Designed, built and maintain the Civil Engineering Association website — a responsive, interactive portal serving the department's students",
        "Collaborate within a 20+ member team to organise flagship departmental events including Orientation, Convocation and Teacher's Day"
      ]
    },
    extras: [
      "Completed 100+ hours of NCC CATC, building discipline, leadership and teamwork under structured training (2024)",
      "Secured 2nd place in the Institute Fresher Cricket League"
    ]
  },

  /* Master pool of genuine projects (bullets straight from the resume) */
  resumeProjects: {
    stock: {
      name: "Stock Price Prediction (ML / LSTM)", org: "RBCCPS, IISc Bangalore · Summer Project Intern", date: "May '26 – Jul '26",
      bullets: [
        "Developed a deep-learning web application that forecasts 7-day stock-price movements using LSTM neural networks trained on cleaned historical market data",
        "Architected an end-to-end ML pipeline spanning data ingestion, technical-indicator feature engineering, model training and evaluation for financial time-series forecasting",
        "Deployed the trained model to production on Hugging Face Spaces with a Streamlit interface, adding response caching to cut repeated inference latency",
        "Owned the full ML lifecycle — data preprocessing, model selection, tuning and deployment — gaining practical depth across AI/ML fundamentals"
      ]
    },
    stockErp: {
      name: "Stock Price Prediction App", org: "Strategic ERP, Mumbai", date: "May '26 – Jul '26",
      bullets: [
        "Engineered an LSTM-based time-series model in TensorFlow/Keras to forecast stock prices from historical market data",
        "Built reproducible, end-to-end ML pipelines integrating technical-indicator features for financial forecasting",
        "Shipped the model to Hugging Face with a Streamlit front end, leveraging caching to optimise inference performance"
      ]
    },
    scraper: {
      name: "Hackathon Web Scraper (Full-stack)", org: "Personal Project", date: "Apr '25",
      bullets: [
        "Built a full-stack application that automatically scrapes live hackathon listings and serves them through a Django REST API, eliminating manual data collection",
        "Developed a responsive React frontend that consumes the API to display aggregated events in real time",
        "Designed resilient scraping logic with BeautifulSoup and Selenium to reliably parse dynamic, JavaScript-rendered pages"
      ]
    },
    habit: {
      name: "Habit Dashboard Web App (Full-stack)", org: "Personal Project", date: "Feb '25 – Mar '25",
      bullets: [
        "Built a full-stack habit-tracking dashboard with a scheduling to-do list supporting date, day and time selection",
        "Implemented secure user authentication (login / signup) to deliver private, personalised user accounts",
        "Engineered a React frontend with centralised state management, integrated with backend REST APIs for persistent data handling"
      ]
    },
    drone: {
      name: "Wireless Drone Controller (Embedded)", org: "Course Project MS101 · Guide: Prof. J. John", date: "Aug '24 – Nov '24",
      bullets: [
        "Programmed ESP32 firmware in the Arduino IDE enabling dual-joystick flight control, wireless communication and fail-safe safety protocols",
        "Drove the complete embedded hardware lifecycle — schematic design, PCB layout, fabrication and assembly"
      ]
    },
    core: {
      name: "Summer of Core", org: "Civil Engineering Association, IIT Bombay", date: "May '25 – Jul '25",
      bullets: [
        "Developed working proficiency in ETABS for structural analysis & design and SolidWorks for 3D CAD modelling",
        "Applied advanced Microsoft Excel, Word and PowerPoint to engineering analysis, documentation and research deliverables"
      ]
    }
  },

  /* Each version: which projects (in order) show on the 1-page cut.
     The 2-page cut shows ALL projects (these first, then the rest) + coursework. */
  resumeVersions: [
    {
      id: "analytics",
      label: "Analytics & Finance",
      targets: ["American Express", "Goldman Sachs", "JP Morgan", "Citi", "Wells Fargo", "Optum", "ZS Associates"],
      analysis: "These firms shortlist on aptitude + ML intuition + finance alignment (AmEx's own intern said a credit-card / financial project aligned strongly with their work). This version leads with the finance-focused stock-prediction work and foregrounds ML & data skills; the embedded / CAD work is dropped from the 1-page cut.",
      tip: "SQL is the single biggest add for these roles — it is NOT on your resume yet, so it has been left off to stay truthful. Learn it (it's in your plan) and add it here. A pure SQL/EDA Kaggle project would also strengthen the fit.",
      summary: "Second-year Civil Engineering student at IIT Bombay targeting data-analytics roles, with hands-on ML, time-series forecasting and end-to-end model deployment experience.",
      skills: {
        "Languages": "Python, Java",
        "ML / Data": "Scikit-Learn, TensorFlow/Keras, Pandas, NumPy, Matplotlib, Seaborn",
        "Tools": "Streamlit, Hugging Face, Git, REST APIs"
      },
      onePage: ["stock", "scraper", "habit"]
    },
    {
      id: "aiml",
      label: "AI / ML",
      targets: ["Fractal Analytics", "Adobe (MDSR)", "Tiger Analytics"],
      analysis: "ML roles weigh deep-learning experience, fundamentals and prior ML work (early-season ML firms like Adobe & Fractal also run DSA filters, so the embedded project is kept for breadth). This version leads with the LSTM forecasting work and the model-deployment story.",
      tip: "Add real evaluation numbers (e.g. accuracy / error) only once you can back them up. Strengthen depth with one more ML project or a paper implementation if you can.",
      summary: "Second-year IIT Bombay student with hands-on LSTM / deep-learning experience, end-to-end ML pipeline building and model deployment on Hugging Face.",
      skills: {
        "Languages": "Python, Java",
        "ML / Deep Learning": "TensorFlow/Keras, Scikit-Learn, LSTMs, Pandas, NumPy",
        "Data / Tools": "Hugging Face, Streamlit, Git, Matplotlib, Seaborn"
      },
      onePage: ["stock", "scraper", "drone"]
    },
    {
      id: "dataeng",
      label: "Data / SQL Engineering",
      targets: ["Sigmoid", "Tredence", "Mu Sigma"],
      analysis: "These firms value data pipelines, APIs and backend engineering over deep theory. This version leads with the scraper-to-REST-API pipeline and frames the ML work as a data pipeline.",
      tip: "SQL is essential for these roles and is not yet on your resume — learn it and add it to Languages. Adding one SQL-heavy project would make this version much stronger.",
      summary: "Second-year IIT Bombay student who builds full-stack data applications — REST APIs, web-scraping pipelines and backend data handling, with end-to-end ML deployment experience.",
      skills: {
        "Languages": "Python, Java, HTML/CSS",
        "Backend / Data": "Django, REST APIs, BeautifulSoup, Selenium, Pandas, NumPy",
        "Tools": "Git, React.js, Bootstrap, Streamlit, Hugging Face"
      },
      onePage: ["scraper", "stock", "habit"]
    },
    {
      id: "sde",
      label: "Software / SDE",
      targets: ["Sony", "Stripe", "Goldman Sachs (Engineering)"],
      analysis: "SDE roles test DSA + OOP + full-stack delivery (Sony / Goldman software value OOP heavily). This version leads with full-stack web and embedded-systems work.",
      tip: "C++ and DSA are not on your resume yet — add C++ to Languages and a LeetCode/Codeforces stat once you cross ~150 problems. Both are in your prep plan.",
      summary: "Second-year IIT Bombay student with full-stack web (Django / React) and embedded-systems experience, plus ML model deployment.",
      skills: {
        "Languages": "Python, Java, HTML/CSS",
        "Web": "Django, React.js, REST APIs, Bootstrap",
        "Systems / Tools": "Arduino, Git, TensorFlow/Keras"
      },
      onePage: ["habit", "scraper", "drone"]
    }
  ]
};

/* =====================================================================
   MISHTI — First-year skill-building sprint (target 30 July 2026)
   Separate syllabus. No resume / interview content. She sees only
   Nitesh's progress (goals + daily activity), never his resume data.
   ===================================================================== */
const MISHTI = {
  meta: {
    name: "Mishti",
    initials: "M",
    branch: "First Year → Second Year",
    season: "Skill-Building Sprint 2026",
    storeKey: "mishti_intern_tracker_v1",
    pin: "1357",
    friendId: "nitesh",
    countdown: [
      { label: "days to 30 July goal", date: "2026-07-30" }
    ],
    nav: [
      { view: "dashboard", icon: "◆", label: "Dashboard" },
      { view: "plan", icon: "▦", label: "Roadmap · 30 Jul" },
      { view: "skills", icon: "▤", label: "Skills Tracker" },
      { view: "resources", icon: "↗", label: "Resources" },
      { view: "log", icon: "✓", label: "Daily Log" },
      { view: "friend", icon: "👥", label: "Friend's Progress" }
    ],
    titles: {
      dashboard: ["Dashboard", "Hi Mishti — first year is your head-start. Build the habit now."],
      plan: ["Roadmap to 30 July", "Your 4-week sprint · DSA, Web Dev, AI/ML, open source + creative & active balance."],
      skills: ["Skills Tracker", "Every session counts. Consistency compounds fastest in year one."],
      resources: ["Resources", "DSA, Web Dev, AI/ML, open source, hackathons + a first-year career roadmap."],
      log: ["Daily Log", "Log today — even one focused hour keeps the streak alive."],
      friend: ["Friend's Progress", "See Nitesh's momentum live — progress only, nothing else."]
    }
  },

  /* ---- 4-WEEK ROADMAP (Jul 4 → Jul 30) ---- */
  plan: [
    {
      id: "m1", title: "Foundations & Setup", dates: "Jul 4 – 10", badge: "wk1", range: ["2026-07-04", "2026-07-10"],
      days: [
        { label: "Daily (Mon–Sun)", tasks: [
          { id: "m1d1", tag: "dsa", text: "DSA 1 hr — Strivers A2Z: Arrays, Basic Maths, intro Recursion (build the habit)" },
          { id: "m1d2", tag: "web", text: "Web Dev 45 min — The Odin Project / freeCodeCamp: HTML + CSS fundamentals" },
          { id: "m1d3", tag: "aiml", text: "AI/ML 30 min — Andrew Ng ML Specialization (Coursera) Week 1 + 3Blue1Brown" },
        ]},
        { label: "This week", tasks: [
          { id: "m1d4", tag: "career", text: "Set up GitHub + LinkedIn, and claim the GitHub Student Developer Pack" },
          { id: "m1d8", tag: "oss", text: "Open Source — learn the GitHub flow (fork → branch → commit → Pull Request) with 'First Contributions', then make your practice PR" },
          { id: "m1d5", tag: "hack", text: "Browse Devfolio / Unstop — bookmark 1 beginner-friendly hackathon to try this month" },
          { id: "m1d6", tag: "art", text: "1 arts & craft session — keep it fun, it recharges you" },
          { id: "m1d7", tag: "sport", text: "3 sports / workout sessions this week" },
        ]},
      ]
    },
    {
      id: "m2", title: "Build Momentum", dates: "Jul 11 – 17", badge: "wk2", range: ["2026-07-11", "2026-07-17"],
      days: [
        { label: "Daily", tasks: [
          { id: "m2d1", tag: "dsa", text: "DSA 1.5 hrs — Sorting, Hashing, Two Pointers, intro Binary Search" },
          { id: "m2d2", tag: "web", text: "Web Dev 1 hr — JavaScript basics (JavaScript.info) + build a small page" },
          { id: "m2d3", tag: "aiml", text: "AI/ML 30 min — Andrew Ng Wk 2–3 (linear / logistic regression) + Kaggle Learn: Python" },
        ]},
        { label: "This week", tasks: [
          { id: "m2d4", tag: "career", text: "Start 1 mini project (portfolio page or to-do app) — push it to GitHub" },
          { id: "m2d8", tag: "oss", text: "Open Source — find a 'good first issue' in a beginner web-dev repo (EddieHub / freeCodeCamp); comment to claim it & read the CONTRIBUTING guide" },
          { id: "m2d5", tag: "hack", text: "Decide: join a hackathon this month? Form / join a team or plan a solo build" },
          { id: "m2d6", tag: "art", text: "1 arts & craft session" },
          { id: "m2d7", tag: "sport", text: "3 sports sessions" },
        ]},
      ]
    },
    {
      id: "m3", title: "Projects & Depth", dates: "Jul 18 – 24", badge: "wk3", range: ["2026-07-18", "2026-07-24"],
      days: [
        { label: "Daily", tasks: [
          { id: "m3d1", tag: "dsa", text: "DSA 1.5 hrs — Stacks / Queues, Linked List, Binary Search problems" },
          { id: "m3d2", tag: "web", text: "Web Dev 1 hr — build a responsive project (JS + fetch a public API)" },
          { id: "m3d3", tag: "aiml", text: "AI/ML 45 min — finish Andrew Ng Course 1 + start a Kaggle beginner notebook" },
        ]},
        { label: "This week", tasks: [
          { id: "m3d4", tag: "career", text: "Write a clear README for your project; share it on LinkedIn" },
          { id: "m3d8", tag: "oss", text: "Open Source — submit your first REAL PR (docs fix or small bug); politely respond to the maintainer's review and update it" },
          { id: "m3d5", tag: "hack", text: "Work on the hackathon build / or a weekend mini-project" },
          { id: "m3d6", tag: "art", text: "1 arts & craft session" },
          { id: "m3d7", tag: "sport", text: "3 sports sessions" },
        ]},
      ]
    },
    {
      id: "m4", title: "Ship & Reflect", dates: "Jul 25 – 30", badge: "wk4", range: ["2026-07-25", "2026-07-30"],
      days: [
        { label: "By 30 July (goal)", tasks: [
          { id: "m4d1", tag: "dsa", text: "✅ Reach ~60–80 DSA problems total" },
          { id: "m4d2", tag: "web", text: "✅ Finish + deploy 1 web project (Vercel / Netlify)" },
          { id: "m4d3", tag: "aiml", text: "✅ Complete 1 ML course module + 1 Kaggle notebook" },
          { id: "m4d8", tag: "oss", text: "✅ Get 1–2 PRs merged; try 1 slightly bigger issue; bookmark GSSoC / Outreachy for the next cycle" },
          { id: "m4d4", tag: "career", text: "Update resume / LinkedIn with your projects + merged PRs; ask Nitesh for feedback" },
        ]},
        { label: "Wrap up", tasks: [
          { id: "m4d5", tag: "hack", text: "Submit the hackathon project OR publish your mini-project" },
          { id: "m4d6", tag: "art", text: "1 arts & craft session — celebrate the month!" },
          { id: "m4d7", tag: "sport", text: "Stay active — 3 sessions" },
        ]},
      ]
    }
  ],

  /* ---- SKILLS (counters with targets) ---- */
  skills: [
    { id: "dsa", name: "DSA Problems", icon: "▤", color: "#2f6fb0", count: 0, target: 80, unit: "problems", note: "Strivers A2Z — you have time, go steady" },
    { id: "web", name: "Web Dev Sessions", icon: "⌬", color: "#d8453e", count: 0, target: 40, unit: "sessions", note: "Odin Project / freeCodeCamp" },
    { id: "aiml", name: "AI/ML Lessons", icon: "◉", color: "#2e7d46", count: 0, target: 40, unit: "lessons", note: "Andrew Ng + Kaggle Learn" },
    { id: "hack", name: "Hackathon Days", icon: "⚡", color: "#9a531b", count: 0, target: 15, unit: "days", note: "Devfolio / Unstop / MLH" },
    { id: "oss", name: "Open Source Contributions", icon: "⑂", color: "#6e40c9", count: 0, target: 8, unit: "contributions", note: "Count each step: practice PR, issue claimed, PR opened, PR merged" },
    { id: "art", name: "Arts & Craft", icon: "✿", color: "#b0417a", count: 0, target: 20, unit: "sessions", note: "Creative recharge" },
    { id: "sport", name: "Sports Sessions", icon: "⚽", color: "#0e7c86", count: 0, target: 30, unit: "sessions", note: "Stay active & sharp" },
  ],

  /* ---- RESOURCES ---- */
  resources: [
    { cat: "Career — First Year (start here)", items: [
      { name: "Harvard CS50x", desc: "The best free CS foundation", url: "https://cs50.harvard.edu/x/" },
      { name: "roadmap.sh", desc: "Visual roadmaps for every path", url: "https://roadmap.sh/" },
      { name: "GitHub Student Developer Pack", desc: "Free tools + domains for students", url: "https://education.github.com/pack" },
      { name: "Good First Issues", desc: "Start contributing to open source", url: "https://goodfirstissue.dev/" },
      { name: "freeCodeCamp", desc: "Free certifications + real projects", url: "https://www.freecodecamp.org/" },
    ]},
    { cat: "DSA (beginner-friendly)", items: [
      { name: "Striver A2Z Sheet", desc: "Step-by-step from zero", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" },
      { name: "NeetCode", desc: "Clear video explanations", url: "https://neetcode.io/" },
      { name: "GfG Data Structures", desc: "Structured practice", url: "https://www.geeksforgeeks.org/data-structures/" },
    ]},
    { cat: "Web Development", items: [
      { name: "The Odin Project", desc: "Full-stack, project-based (start here)", url: "https://www.theodinproject.com/" },
      { name: "freeCodeCamp — Responsive Web", desc: "HTML/CSS certification", url: "https://www.freecodecamp.org/learn/" },
      { name: "JavaScript.info", desc: "The modern JS tutorial", url: "https://javascript.info/" },
      { name: "MDN Web Docs", desc: "The web reference", url: "https://developer.mozilla.org/" },
      { name: "Frontend roadmap", desc: "What to learn, in order", url: "https://roadmap.sh/frontend" },
    ]},
    { cat: "AI / ML", items: [
      { name: "Andrew Ng — ML Specialization", desc: "The classic starting course", url: "https://www.coursera.org/specializations/machine-learning-introduction" },
      { name: "Kaggle Learn", desc: "Free hands-on micro-courses", url: "https://www.kaggle.com/learn" },
      { name: "3Blue1Brown — Neural Networks", desc: "Best visual intuition", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi" },
      { name: "fast.ai", desc: "Practical deep learning", url: "https://course.fast.ai/" },
      { name: "Google ML Crash Course", desc: "Short + practical", url: "https://developers.google.com/machine-learning/crash-course" },
    ]},
    { cat: "Hackathons", items: [
      { name: "Devfolio", desc: "India's biggest hackathon platform", url: "https://devfolio.co/" },
      { name: "Unstop", desc: "Hackathons, competitions, internships", url: "https://unstop.com/" },
      { name: "Major League Hacking (MLH)", desc: "Global student hackathons", url: "https://mlh.io/" },
      { name: "Devpost", desc: "Online hackathons + project gallery", url: "https://devpost.com/" },
    ]},
    { cat: "Open Source — Start Here & Programs", items: [
      { name: "First Contributions", desc: "Make your very first PR safely (step-by-step)", url: "https://github.com/firstcontributions/first-contributions" },
      { name: "EddieHub Community", desc: "Super beginner-friendly org that welcomes first PRs", url: "https://github.com/EddieHubCommunity" },
      { name: "goodfirstissue.dev", desc: "Curated beginner issues to claim", url: "https://goodfirstissue.dev/" },
      { name: "up-for-grabs", desc: "Find starter issues across many projects", url: "https://up-for-grabs.net/" },
      { name: "GirlScript Summer of Code (GSSoC)", desc: "Beginner OSS program (India) — ideal for you", url: "https://gssoc.girlscript.tech/" },
      { name: "Outreachy", desc: "Paid open-source internships for beginners", url: "https://www.outreachy.org/" },
    ]},
    { cat: "Open Source Orgs — by what you're learning", items: [
      { name: "freeCodeCamp (Web / JS)", desc: "Huge JS codebase with good first issues", url: "https://github.com/freeCodeCamp/freeCodeCamp" },
      { name: "Appwrite (Web / backend)", desc: "Beginner-friendly; lots of web issues", url: "https://github.com/appwrite/appwrite" },
      { name: "Rocket.Chat (React / JS)", desc: "Real-world React contributions", url: "https://github.com/RocketChat/Rocket.Chat" },
      { name: "MDN Web Docs (docs)", desc: "Improve web docs — easy first PRs", url: "https://github.com/mdn/content" },
      { name: "Hugging Face (AI/ML · Python)", desc: "Docs + beginner ML issues", url: "https://github.com/huggingface/transformers" },
      { name: "scikit-learn (ML · Python)", desc: "Classic ML lib — filter 'good first issue'", url: "https://github.com/scikit-learn/scikit-learn" },
      { name: "Keras (Deep Learning)", desc: "Beginner-labeled deep-learning issues", url: "https://github.com/keras-team/keras" },
    ]},
    { cat: "Creative & Active", items: [
      { name: "Arts & Craft tutorials", desc: "YouTube — beginner projects", url: "https://www.youtube.com/results?search_query=arts+and+craft+for+beginners" },
      { name: "Nike Training Club", desc: "Free guided workouts", url: "https://www.nike.com/ntc-app" },
    ]},
  ]
};

/* All profiles. app.js picks one after login. */
const PROFILES = { nitesh: NITESH, mishti: MISHTI };
