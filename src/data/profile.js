// Single source of truth for all portfolio content.
// Pages only render this data — update text here and drop images into public/images/.

const img = (file) => `/images/${file}`;

// Each photo is declared once and referenced everywhere it appears.
const PHOTOS = {
  portrait: { src: img("portrait.jpg") },
  avatar: { src: img("avatar.jpg") },
  // University & career
  thesisDefense: { src: img("graduation-thesis-defense.jpg"), caption: "Graduation thesis defense — HCMUT, 2026" },
  thesisBook: { src: img("graduation-thesis-book.jpg"), caption: "GoPitch graduation thesis report" },
  degree: { src: img("graduation-certificate.jpg"), caption: "Bachelor's degree — Excellent ranking" },
  hcmutScholarship: { src: img("hcmut-scholarship-record.jpg"), caption: "HCMUT academic encouragement scholarship record" },
  outstandingStudent: {
    src: img("hcmut-outstanding-student-2025.jpg"),
    caption: "Certificate of Merit — “Outstanding All-round Student”, academic year 2024–2025",
  },
  hcmutActivity: { src: img("hcmut-activity.jpg") },
  iecCertificate: { src: img("iec-startup-certificate.jpg"), caption: "IEC startup training program 2025" },
  tsTeam: { src: img("trusting-social-ekyc-team.jpg"), caption: "Trusting Social — year-end party" },
  tsBooth: { src: img("trusting-social-yep.jpg"), caption: "Trusting Social — Beyond Tomorrow" },
  vdtCertificate: { src: img("viettel-vdt-certificate.jpg"), caption: "Viettel Digital Talent 2025 — certificate of completion" },
  vdtParty: { src: img("viettel-vdt-party.jpg"), caption: "Viettel Digital Talent 2025 cohort" },
  vpAmbassadorCert: { src: img("vpbank-ambassador-certificate.jpg"), caption: "VPBank ambassador certificate" },
  vpAmbassador: { src: img("vpbank-ambassador.jpg"), caption: "VPBank brand ambassador" },
  vpAmbassadorEvent: { src: img("vpbank-ambassador-event.jpg"), caption: "VPBank event" },
  amchamCert: { src: img("amcham-certificate.jpg"), caption: "AmCham Scholarship 2025 — certificate" },
  amchamCeremony: { src: img("amcham-ceremony.jpg"), caption: "AmCham Scholarship 2025 award ceremony" },
  amchamCeremony2: { src: img("amcham-ceremony-2.jpg"), caption: "AmCham Scholarship 2025 award ceremony" },
  amchamMeetup: { src: img("amcham-meetup.jpg"), caption: "AmCham meet-up" },
  nineEightCert: { src: img("ninety-eight-certificate.jpg"), caption: "Ninety Eight Scholarship 2025 — certificate" },
  nineEightCeremony: { src: img("ninety-eight-ceremony.jpg"), caption: "Ninety Eight Scholarship 2025 ceremony" },
  nineEightSelfie: { src: img("ninety-eight-selfie.jpg"), caption: "With fellow Ninety Eight scholars" },
  vpbankerCert: { src: img("vpbanker-scholarship-2024.jpg"), caption: "Future VPBanker 2024 scholarship" },
  vpbankCeremony1: { src: img("vpbank-ceremony-1.jpg"), caption: "Future VPBanker 2024 ceremony" },
  vpbankCeremony2: { src: img("vpbank-ceremony-2.jpg"), caption: "Future VPBanker 2024 ceremony" },
  vpbankRound3: { src: img("vpbank-round-3.jpg"), caption: "Future VPBanker 2024 — selection round 3" },
  tkuvtnCert: { src: img("tkuvtn-certificate.jpg"), caption: "Top 12 — Finding Talented Candidates 2024" },
  tkuvtnFinal: { src: img("tkuvtn-final.jpg"), caption: "Finding Talented Candidates 2024 — final round" },
  tkuvtnVisit: { src: img("tkuvtn-company-visit.jpg"), caption: "Finding Talented Candidates 2024 — company visit" },
  trip: { src: img("trip-bana-hills.jpg"), caption: "Trip with friends" },
  // High school
  vmo: { src: img("vmo-2021.jpg"), caption: "Consolation Prize — Vietnam Mathematics Olympiad 2021" },
  odonVallet: { src: img("odon-vallet.jpg"), caption: "Odon Vallet Scholarship 2021" },
  // Certificates
  dlCoursera: { src: img("coursera-deep-learning.jpg") },
  mlCoursera: { src: img("coursera-machine-learning.jpg") },
  toeic: { src: img("toeic-865.jpg") },
};

const GPA = "3.7/4.0";
const DEGREE_RANKING = "Excellent";

export const experience = [
  {
    role: "Software Engineer",
    company: "Undisclosed Hedge Fund",
    type: "Full-time",
    period: "May 2026 – Present",
    location: "Ho Chi Minh City · On-site",
    current: true,
  },
  {
    role: "Software Engineer Intern",
    company: "Trusting Social",
    type: "Internship",
    period: "Jul 2025 – Apr 2026",
    location: "Ho Chi Minh City · On-site",
    images: [PHOTOS.tsTeam, PHOTOS.tsBooth],
  },
  {
    role: "Software Engineer Intern",
    company: "Viettel Group",
    type: "Internship · Viettel Digital Talent 2025 — Software Engineering track",
    period: "Apr 2025 – Jul 2025",
    location: "Remote",
    images: [PHOTOS.vdtCertificate, PHOTOS.vdtParty],
  },
];

export const awards = [
  {
    title: "Outstanding All-round Student 2024–2025",
    issuer: "President of Ho Chi Minh City University of Technology — VNU-HCM",
    date: "Apr 2026",
    description:
      "Certificate of Merit for the title “Sinh viên Xuất sắc toàn diện” (Outstanding All-round Student) in the 2024–2025 academic year (Decision No. 1903/QĐ-ĐHBK).",
    images: [PHOTOS.outstandingStudent],
  },
  {
    title: "VPBank Recruitment Brand Ambassador",
    issuer: "VPBank",
    date: "Dec 2025",
    description: "Recognized as a companion ambassador for VPBank's employer brand.",
    images: [PHOTOS.vpAmbassadorCert, PHOTOS.vpAmbassador, PHOTOS.vpAmbassadorEvent],
  },
  {
    title: "AmCham Scholarship 2025",
    issuer: "American Chamber of Commerce in Vietnam",
    date: "Nov 2025",
    description:
      "Awarded after a three-stage assessment: screening by the management team, an ability test by Talentnet & Mercer | Mettl, and interviews with HR experts from AmCham members.",
    images: [PHOTOS.amchamCert, PHOTOS.amchamCeremony, PHOTOS.amchamCeremony2, PHOTOS.amchamMeetup],
  },
  {
    title: "Ninety Eight Scholarship 2025",
    issuer: "Ninety Eight",
    date: "Aug 2025",
    description: "For demonstrating outstanding academic achievement.",
    images: [PHOTOS.nineEightCert, PHOTOS.nineEightCeremony, PHOTOS.nineEightSelfie],
  },
  {
    title: "Future VPBanker 2024 Scholarship",
    issuer: "VPBank",
    date: "Nov 2024",
    description: "One of the top 60 outstanding students selected from over 2,000 students nationwide.",
    images: [PHOTOS.vpbankerCert, PHOTOS.vpbankCeremony1, PHOTOS.vpbankCeremony2, PHOTOS.vpbankRound3],
  },
  {
    title: "Top 12 — Finding Talented Candidates 2024",
    issuer: "Student Support Center, HCMUT",
    date: "Nov 2024",
    description:
      "A competition simulating real recruitment across five rounds (CV screening, recruitment test, interview, factory trip, final). Surpassed 200+ candidates to reach the final round.",
    images: [PHOTOS.tkuvtnCert, PHOTOS.tkuvtnFinal, PHOTOS.tkuvtnVisit],
  },
  {
    title: "HCMUT Academic Encouragement Scholarship",
    issuer: "Academic Affairs Office, HCMUT",
    date: "Semesters 222 & 242",
    description: "Granted to top students for outstanding academic results.",
    images: [PHOTOS.hcmutScholarship],
  },
  {
    title: "Odon Vallet Scholarship",
    issuer: "Odon Vallet Scholarship Organizers",
    date: "Oct 2021",
    images: [PHOTOS.odonVallet],
  },
  {
    title: "Consolation Prize — Vietnam Mathematics Olympiad",
    issuer: "Ministry of Education and Training",
    date: "Jan 2021",
    images: [PHOTOS.vmo],
  },
];

export const certificates = [
  {
    title: "Bachelor of Engineering — Computer Science (Honors Program)",
    issuer: "Ho Chi Minh City University of Technology — VNU-HCM",
    date: "Aug 2026",
    note: `Ranking: ${DEGREE_RANKING}`,
    image: PHOTOS.degree.src,
  },
  {
    title: "Viettel Digital Talent 2025 — Software Engineering (Phase I)",
    issuer: "Viettel Group",
    date: "Jul 2025",
    image: PHOTOS.vdtCertificate.src,
  },
  {
    title: "Innovative Startup & Productivity Training for Talented Students (Cohort 3)",
    issuer: "HCMUT & VNU-HCM Innovation & Entrepreneurship Center (IEC)",
    date: "2025",
    note: "Project: GoPitch",
    image: PHOTOS.iecCertificate.src,
  },
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI — Coursera",
    date: "Oct 2024",
    note: "Credential ID OA9JFWO2GVBV",
    image: PHOTOS.dlCoursera.src,
  },
  {
    title: "Machine Learning Specialization",
    issuer: "DeepLearning.AI, Stanford University — Coursera",
    date: "Oct 2024",
    note: "Credential ID WKR60UU7HYX5",
    image: PHOTOS.mlCoursera.src,
  },
  {
    title: "TOEIC Listening & Reading — 865/990",
    issuer: "IIG Vietnam",
    date: "May 2024",
    image: PHOTOS.toeic.src,
  },
];

const thesisProject = {
  name: "GoPitch — Sports Booking & Tournament Platform",
  tag: "Graduation Thesis",
  period: "Aug 2025 – May 2026",
  description:
    "A mobile platform with two core services: booking sports venues and organizing tournaments. Streamlines venue management, match scheduling and online payments.",
  role: "Team Leader & Mobile Developer",
  stack: ["React Native", "Expo", "PostgreSQL", "Docker", "AWS S3", "SendGrid", "ZaloPay Sandbox"],
  links: [
    { label: "Frontend", url: "https://github.com/yuheng305/football-booking-app_fe" },
    { label: "Backend", url: "https://github.com/soobon/datn_be" },
  ],
  images: [PHOTOS.thesisBook, PHOTOS.thesisDefense],
};

export const projects = [
  {
    name: "pWork — Task Management Platform",
    tag: "In production",
    period: "Sep 2026 – Present",
    description:
      "A task management platform used every day by public organizations in Huế, including bank transaction offices, Party committees and schools. Leaders assign work to units and departments, and staff track deadlines, reminders and documents in one place. I built it from scratch and run it in production.",
    role: "Sole Developer — from design to deployment and operations",
    metrics: [
      { value: "10", label: "Organizations" },
      { value: "200+", label: "Users" },
      { value: "160+", label: "Monthly active users" },
    ],
    highlights: [
      "Work assignment across units and departments, with multiple assignees, recurring tasks, reminders and on-time reports exported to Excel.",
      "Gmail and Google Drive integration: incoming official mail becomes tasks automatically, and attachments are stored in each unit's Drive.",
      "Contract-first Go backend: the OpenAPI spec generates both server and client types, keeping the API and the React app in sync.",
      "Self-hosted on the customer's own server behind NAT through Cloudflare Tunnel, with one-click deploys from GitHub Actions, daily backups and Grafana alerts.",
    ],
    stack: ["Go", "PostgreSQL", "React", "TypeScript", "Docker", "Cloudflare Tunnel", "Grafana"],
    links: [{ label: "pwork.vn", url: "https://pwork.vn" }],
  },
  thesisProject,
  {
    name: "Giải Mã Toán Olympic — Animated Math Olympiad Solutions",
    tag: "Side project",
    period: "Nov 2026 – Present",
    description:
      "A TikTok, YouTube and Facebook channel that explains Vietnamese and international math olympiad problems through animated, narrated solutions — produced by a pipeline I built end to end.",
    role: "Creator & Developer",
    liveStats: true,
    highlights: [
      "Solutions are animated in code with Manim and LaTeX, narrated with Vietnamese text-to-speech and set to generated music.",
      "Every solution is verified by code before rendering, and audio–video sync is checked automatically.",
      "30+ videos in the first two weeks, including English versions and hour-long exam walkthroughs.",
    ],
    stack: ["Python", "Manim", "LaTeX", "Text-to-speech"],
    links: [
      { label: "TikTok", url: "https://www.tiktok.com/@giaimaolptoan" },
      { label: "YouTube", url: "https://www.youtube.com/channel/UCj_t2vjekkeGnAwtrinPrDg" },
      { label: "Facebook", url: "https://www.facebook.com/profile.php?id=61596356221247" },
    ],
  },
];

export const skills = [
  { group: "Programming Languages", items: ["Golang", "Python", "TypeScript", "JavaScript", "C/C++", "R"] },
  { group: "Backend & Architecture", items: ["Gin", "NestJS", "Node.js", "Microservices", "RESTful API Design", "Protobuf", "System Design"] },
  { group: "Data & Streaming", items: ["Kafka", "Airflow", "Redis (Pub/Sub, Caching)"] },
  { group: "Databases", items: ["PostgreSQL", "TimescaleDB", "MySQL", "MongoDB"] },
  { group: "Observability", items: ["Grafana", "Prometheus", "Loki", "Datadog"] },
  { group: "DevOps", items: ["Docker", "GitHub Actions", "AWS (S3, EC2)", "Linux"] },
  { group: "Frontend & Mobile", items: ["ReactJS", "React Native", "TailwindCSS", "Figma"] },
  { group: "Tools & Others", items: ["Git", "Jira", "Claude Code", "Agile/Scrum"] },
  { group: "Languages", items: ["Vietnamese (native)", "English — TOEIC 865/990"] },
];

// Keys match the route slugs under /studyprocess.
export const schools = {
  middleschool: {
    name: "Lương Thế Vinh & Nguyễn Tất Thành, Kon Tum",
    period: "2015 – 2019",
    intro:
      "I studied grades 6–8 at Lương Thế Vinh Secondary School (Đăk Tô, Kon Tum) and grade 9 at Nguyễn Tất Thành Specialized High School (Kon Tum City, Kon Tum).",
    campus: [img("campus-luong-the-vinh.jpg"), img("campus-nguyen-tat-thanh.jpg")],
    achievements: [
      { src: img("ms-district.jpg") },
      { src: img("ms-chess.jpg") },
      { src: img("ms-achievement.jpg") },
      { src: img("ms-provincial.jpg") },
    ],
  },
  highschool: {
    name: "Quốc Học Huế High School for the Gifted — Mathematics",
    period: "2019 – 2022",
    intro: "I studied at Quốc Học Huế High School for the Gifted, specializing in Mathematics.",
    stats: [
      { value: "9.3/10", label: "GPA" },
      { value: "VMO 2021", label: "Consolation Prize" },
    ],
    campus: [img("campus-quoc-hoc-1.jpg"), img("campus-quoc-hoc-2.jpg")],
    achievements: [
      PHOTOS.vmo,
      PHOTOS.odonVallet,
      ...[1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ src: img(`hs-achievement-${n}.jpg`) })),
      { src: img("hs-thtt.jpg") },
    ],
  },
  university: {
    name: `HCMUT — Computer Science (Honors Program), GPA ${GPA}`,
    period: "2022 – 2026",
    intro: `Bachelor of Engineering in Computer Science (Honors Program), Faculty of Computer Science and Engineering, Ho Chi Minh City University of Technology — VNU-HCM. Graduated in August 2026 with an ${DEGREE_RANKING} ranking.`,
    stats: [
      { value: GPA, label: "GPA" },
      { value: DEGREE_RANKING, label: "Degree ranking" },
      { value: "GoPitch", label: "Graduation thesis" },
    ],
    thesis: `Graduation thesis: “${thesisProject.name}” (${thesisProject.period}) — ${thesisProject.role}.`,
    coursework: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Advanced Programming",
      "Database Systems",
      "Computer Networks",
      "Software Engineering",
    ],
    campus: [img("campus-hcmut.jpg"), img("campus-hcmut-cse.jpg")],
    achievements: [
      PHOTOS.degree,
      PHOTOS.thesisDefense,
      PHOTOS.thesisBook,
      PHOTOS.amchamCert,
      PHOTOS.nineEightCert,
      PHOTOS.vpbankerCert,
      PHOTOS.tkuvtnCert,
      PHOTOS.iecCertificate,
      PHOTOS.outstandingStudent,
      PHOTOS.hcmutActivity,
    ],
  },
};

const currentJob = experience.find((e) => e.current);

export const profile = {
  name: "Nguyen Quang Huy",
  headline: "Software Engineer",
  portrait: PHOTOS.portrait.src,
  avatar: PHOTOS.avatar.src,
  currentJob,
  about: [
    "Hi, I'm Nguyen Quang Huy — a Software Engineer based in Ho Chi Minh City, currently working at a hedge fund.",
    `I graduated from Ho Chi Minh City University of Technology (VNU-HCM) in 2026 with a Bachelor's degree in Computer Science (Honors Program), ranked ${DEGREE_RANKING} with a GPA of ${GPA}.`,
    "Before that, I interned as a Software Engineer at Trusting Social (eKYC team) and at Viettel Group through the Viettel Digital Talent 2025 program. I enjoy backend engineering, system design and solving hard problems — a habit that started with math olympiads in high school.",
    "I also built and run pWork (pwork.vn), a task management platform used by public organizations in Huế.",
  ],
  highlights: [
    { value: GPA, label: `GPA · ${DEGREE_RANKING}` },
    { value: String(experience.length), label: "Engineering roles" },
    { value: String(awards.length), label: "Scholarships & awards" },
  ],
  contact: {
    email: "huydt04@gmail.com",
    phone: "0865706314",
    phoneIntl: "+84865706314",
    location: "Ho Chi Minh City, Vietnam",
  },
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/huynq305/" },
    { name: "GitHub", url: "https://github.com/yuheng305" },
    { name: "Facebook", url: "https://www.facebook.com/dratadius.manchel/" },
    { name: "Instagram", url: "https://www.instagram.com/yuheng10092/" },
    { name: "YouTube", url: "https://www.youtube.com/@nguyenquanghuy-rcs669" },
  ],
  photos: [
    PHOTOS.tsTeam,
    PHOTOS.amchamCeremony,
    PHOTOS.vpbankCeremony1,
    PHOTOS.nineEightCeremony,
    PHOTOS.vdtParty,
    PHOTOS.thesisDefense,
    PHOTOS.trip,
    PHOTOS.vmo,
  ],
};

// Study Process landing timeline, newest first. `page` is a /studyprocess/<slug> route.
export const timeline = [
  ...experience.map((e) => ({ period: e.period, title: `${e.role} — ${e.company}`, page: "experience" })),
  ...Object.entries(schools).map(([slug, s]) => ({ period: s.period, title: s.name, page: slug })).reverse(),
];
