import About from "./pages/About";
import StudyProcess from "./pages/StudyProcess";
import MiddleSchool from "./pages/MiddleSchool";
import HighSchool from "./pages/HighSchool";
import University from "./pages/University"
import Certificates from "./pages/Certificates"
import Projects from "./pages/Projects"
import Skills from "./pages/Skills"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomBar from "./components/BottomBar";

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<About/>}/>
        <Route path="/about" element={<About/>} />
        <Route path="/studyprocess" element={<StudyProcess/>} />
        <Route path="/studyprocess/middleschool" element={<MiddleSchool/>} />
        <Route path="/studyprocess/highschool" element={<HighSchool/>} />
        <Route path="/studyprocess/university" element={<University/>} />
        <Route path="/studyprocess/certificates" element={<Certificates/>} />
        <Route path="/studyprocess/projects" element={<Projects/>} />
        <Route path="/studyprocess/skills" element={<Skills/>} />
      </Routes>
    </Router>
  );
};

export default App;