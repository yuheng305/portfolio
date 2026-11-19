// Places page content. Provinces use the 63-province map (before the July 2025 merger);
// `now` gives the province each place belongs to today.
// `id` matches the province name in the map data; `pins` mark spots smaller than a province.
// An event's `sortYear` overrides the year parsed from its label for the Journey timeline.

export const ROLES = {
  home: { label: "Born & raised", color: "#e11d48" },
  roots: { label: "Family roots", color: "#d97706" },
  study: { label: "High school years", color: "#7c3aed" },
  university: { label: "University years", color: "#0891b2" },
  current: { label: "Where I live now", color: "#2563eb" },
  visited: { label: "Visited", color: "#0d9488" },
};

const WCA = "https://www.worldcubeassociation.org/persons/2017HUYN10";

export const places = [
  {
    id: "Kon Tum",
    name: "Kon Tum",
    role: "home",
    now: "Quảng Ngãi",
    period: "2004 – 2019",
    summary:
      "Where I was born and spent the first fifteen years of my life — the Central Highlands town that shaped who I am.",
    events: [
      {
        year: "2004",
        text: "Born in Kon Tum, and grew up in Đăk Tô district, a small highland town where everyone seemed to know everyone.",
      },
      {
        year: "2015 – 2018",
        text: "Grades 6 to 8 at Lương Thế Vinh Secondary School in Đăk Tô. This is where math, chess and competitions first became a big part of my life, with my first district and provincial awards.",
      },
      {
        year: "2018 – 2019",
        text: "Moved to Kon Tum City for grade 9 at Nguyễn Tất Thành Specialized High School — my first taste of a specialized school and of living closer to the provincial center, a year before leaving the province for high school.",
      },
    ],
  },
  {
    id: "Nghệ An",
    name: "Nghệ An",
    role: "roots",
    now: "Nghệ An",
    summary:
      "My hometown on paper and in the heart. Both my father's and my mother's families come from Nghệ An, and although I grew up far away in the Highlands, I keep coming back — this is where my roots are.",
    events: [
      {
        text: "Quê nội and quê ngoại — the hometown of both my father's and my mother's families, the place every family story eventually leads back to.",
      },
      {
        text: "Even living far away in the Central Highlands and later in Huế and Ho Chi Minh City, I have come back to visit my hometown many times over the years to see relatives on both sides.",
      },
    ],
  },
  {
    id: "Thừa Thiên Huế",
    name: "Huế",
    role: "study",
    now: "Huế City",
    period: "2019 – 2022",
    summary:
      "Three years at Quốc Học Huế High School for the Gifted — my first time living far from home, and the years that turned math from a hobby into a passion.",
    events: [
      {
        year: "2019",
        text: "Left Kon Tum at fifteen to join the specialized Mathematics class at Quốc Học Huế, one of the oldest and most storied schools in Vietnam.",
      },
      {
        year: "2021",
        text: "Won a Consolation Prize at the Vietnam Mathematics Olympiad (VMO) and received the Odon Vallet Scholarship — the result of the training trips to Hà Nội and Hòa Bình the year before.",
      },
      {
        year: "2022",
        text: "Graduated with a 9.3/10 GPA and headed south for university.",
      },
      {
        year: "Today",
        text: "Huế still feels close: pWork, the task management platform I built, is used every day by public organizations in Huế.",
      },
    ],
  },
  {
    id: "Hồ Chí Minh city",
    name: "Ho Chi Minh City",
    role: "current",
    now: "Ho Chi Minh City",
    period: "2022 – now",
    summary:
      "Where I studied, started my career and live today. The city has been part of my story much longer than my university years, though.",
    events: [
      {
        year: "2008",
        text: "First set foot in Saigon as a four-year-old — my very first trip to the city.",
      },
      {
        year: "2017",
        text: "Came back for my first Rubik's Cube competition, the start of my record on the World Cube Association.",
        link: { label: "WCA profile", url: WCA },
      },
      {
        year: "2022 – 2026",
        text: "Studied Computer Science (Honors Program) at Ho Chi Minh City University of Technology, graduating in 2026 with an Excellent degree, and interned at Viettel and Trusting Social along the way.",
      },
      {
        year: "2026 – now",
        text: "Working as a Software Engineer and calling the city home.",
      },
    ],
  },
  {
    id: "Bình Dương",
    name: "Bình Dương",
    role: "university",
    now: "Ho Chi Minh City",
    period: "University years",
    summary:
      "My address for part of university life: Dormitory Zone A of Vietnam National University sits on the Dĩ An side of the border, in former Bình Dương — I lived there as a student, though not anymore.",
    events: [
      {
        year: "University years",
        sortYear: 2022,
        text: "Lived in VNU-HCM Dormitory Zone A, the student village shared by all the universities of Vietnam National University, before moving out.",
      },
      {
        year: "08/2025",
        text: "First visit to Gò Đậu Stadium, the home ground of Bình Dương football.",
      },
      {
        year: "18/11/2026",
        text: "Back at Gò Đậu a second time — just yesterday at the time of writing.",
      },
    ],
    pins: [
      { name: "VNU-HCM Dormitory Zone A", coords: [106.7822, 10.8782] },
      { name: "Gò Đậu Stadium", coords: [106.6557, 10.9785] },
    ],
  },
  {
    id: "Hà Nội",
    name: "Hà Nội",
    role: "visited",
    now: "Hà Nội",
    summary: "Visited twice, seven years apart, for two very different reasons.",
    events: [
      { year: "2013", text: "My first trip to the capital, as a nine-year-old on holiday." },
      {
        year: "2020",
        text: "Came back as a student to train for the National Excellent Students Exam (HSGQG) in Mathematics, months before winning a VMO prize.",
      },
    ],
  },
  {
    id: "Hòa Bình",
    name: "Hòa Bình",
    role: "visited",
    now: "Phú Thọ",
    summary: "Part of the road to the national math olympiad.",
    events: [
      {
        year: "2020",
        text: "Spent time here in 2020 training for the National Excellent Students Exam (HSGQG) — the same preparation that took me to Hà Nội that year.",
      },
    ],
  },
  {
    id: "Quảng Ninh",
    name: "Quảng Ninh",
    role: "visited",
    now: "Quảng Ninh",
    summary: "A holiday in the far north-east of the country.",
    events: [{ year: "2013", text: "A holiday in Quảng Ninh, the same year as my first visit to Hà Nội." }],
  },
  {
    id: "Hà Tĩnh",
    name: "Hà Tĩnh",
    role: "visited",
    now: "Hà Tĩnh",
    summary: "Right next door to my family's hometown in Nghệ An — a place I keep coming back to.",
    events: [
      { year: "2018", text: "First visit." },
      { year: "2024", text: "Came back for a visit." },
      { year: "2025", text: "Back again the following year." },
    ],
  },
  {
    id: "Bến Tre",
    name: "Bến Tre",
    role: "visited",
    now: "Vĩnh Long",
    summary: "The Mekong Delta, for a family celebration.",
    events: [{ year: "2008", text: "Attended my uncle's wedding — one of my earliest memories of a trip far from home." }],
  },
  {
    id: "Bình Thuận",
    name: "Bình Thuận",
    role: "visited",
    now: "Lâm Đồng",
    summary: "Sea, sand and teammates — the destination of two company trips in one year.",
    events: [
      { year: "03/2026", text: "Company trip to the coast of Bình Thuận." },
      { year: "06/2026", text: "Back again three months later for another company trip." },
    ],
  },
  {
    id: "Đà Nẵng",
    name: "Đà Nẵng",
    role: "visited",
    now: "Đà Nẵng",
    summary: "First the place where I sat my university entrance exams, later a place to simply enjoy.",
    events: [
      {
        year: "2022",
        text: "Took the VNU-HCM Competency Assessment Exam (ĐGNL) here twice during my university admission year.",
      },
      { year: "11/2026", text: "Came back this month, this time just to travel." },
    ],
  },
  {
    id: "Quảng Nam",
    name: "Hội An",
    role: "visited",
    now: "Đà Nẵng",
    summary: "The old town, visited first with classmates and later with friends.",
    events: [
      { year: "Summer 2020", text: "A class trip with my Quốc Học Huế classmates." },
      { year: "Early 2025", text: "Came back on a trip with friends." },
    ],
    pins: [{ name: "Hội An Ancient Town", coords: [108.3380, 15.8801] }],
  },
  {
    id: "Khánh Hòa",
    name: "Khánh Hòa",
    role: "visited",
    now: "Khánh Hòa",
    summary: "A trip to the coast.",
    events: [{ year: "2010", text: "Travelled to Khánh Hòa as a six-year-old." }],
  },
  {
    id: "Gia Lai",
    name: "Gia Lai",
    role: "visited",
    now: "Gia Lai",
    summary: "A neighbour of Kon Tum, and the venue of a math competition.",
    events: [{ year: "2018", text: "Competed in the AMO (American Mathematics Olympiad) held in Gia Lai." }],
  },
  {
    id: "Đắk Lắk",
    name: "Đắk Lắk",
    role: "visited",
    now: "Đắk Lắk",
    summary: "Speedcubing in the coffee capital of Vietnam.",
    events: [
      {
        year: "2018",
        text: "Competed in BMT Open 2018, a World Cube Association Rubik's Cube competition in Buôn Ma Thuột.",
        link: { label: "WCA profile", url: WCA },
      },
    ],
  },
];
