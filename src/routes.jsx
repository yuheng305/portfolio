import {
  faSchool,
  faSchoolFlag,
  faBuildingColumns,
  faBriefcase,
  faTrophy,
  faAward,
  faCode,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import SchoolPage from "./pages/SchoolPage";
import Experience from "./pages/Experience";
import Awards from "./pages/Awards";
import Certificates from "./pages/Certificates";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import { schools } from "./data/profile";

export const PATHS = {
  about: "/about",
  places: "/places",
  study: "/studyprocess",
};

export const studyPath = (slug) => `${PATHS.study}/${slug}`;

// One table drives both <Routes> (App) and the tab bar (TopBar).
export const STUDY_PAGES = [
  { slug: "middleschool", name: "Middle School", icon: faSchool, element: <SchoolPage key="middleschool" school={schools.middleschool} /> },
  { slug: "highschool", name: "High School", icon: faSchoolFlag, element: <SchoolPage key="highschool" school={schools.highschool} /> },
  { slug: "university", name: "University", icon: faBuildingColumns, element: <SchoolPage key="university" school={schools.university} /> },
  { slug: "experience", name: "Experience", icon: faBriefcase, element: <Experience /> },
  { slug: "awards", name: "Awards", icon: faTrophy, element: <Awards /> },
  { slug: "certificates", name: "Certificates", icon: faAward, element: <Certificates /> },
  { slug: "projects", name: "Projects", icon: faCode, element: <Projects /> },
  { slug: "skills", name: "Skills", icon: faScrewdriverWrench, element: <Skills /> },
];
