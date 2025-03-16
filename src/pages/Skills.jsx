import React,{ useState} from "react";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import GitHubRepoBox from "../components/GitHubRepoBox";

const Projects=() => {
    return(
        <div>
            <SideBar/>
            <TopBar/>
            <div className="w-4/5 ml-auto p-3">
            
            <div className="text-xl">
                <h3><b>Language:</b> TOEIC: 865/990</h3>
                <h3><b>Programming Laguages:</b> C/C++, Python, R, Matlab.</h3>
                <h3>HTML, CSS, JavaScript, TypeScript.</h3>
                <h3><b>Frontend:</b> ReactJS, TailwindCSS.</h3>
                <h3><b>Backend:</b> NodeJS.</h3>
                <h3><b>DBMS:</b> MySQL, PostgreSQL, MongoDB.</h3>
                <h3><b>AI libraries:</b> Keras, Numpy, Pandas, Tensorflow.</h3>
                <h3><b>Tools:</b> Linux, Github.</h3>
            </div>
        </div>            
        </div>

            
    );
};

export default Projects;