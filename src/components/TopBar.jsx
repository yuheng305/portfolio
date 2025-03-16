import React,{ useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool, faSchoolFlag, faBuildingColumns, faAward } from '@fortawesome/free-solid-svg-icons';


const TopBar=()=>{
    return (
        <div className="w-4/5 ml-auto h-full bg-gray-100">
            <a href="/studyprocess/middleschool">
            <button className="w-1/6 py-3 text-black font-bold hover:bg-blue-600 transition border-2 border-black">
                <FontAwesomeIcon
                icon={faSchool}
                className="text-4xl text-black pr-5"
                style={{ width: '20px', height: '20px' }}
                />
                Middle School
            </button>
            </a>
            <a href="/studyprocess/highschool">
            <button className="w-1/6 py-3 text-black font-bold hover:bg-blue-600 transition border-2 border-black">
                <FontAwesomeIcon
                icon={faSchoolFlag}
                className="text-4xl text-black pr-5"
                style={{ width: '20px', height: '20px' }}
                />
                High School
            </button>
            </a>
            <a href="/studyprocess/university">
            <button className="w-1/6 py-3 text-black font-bold hover:bg-blue-600 transition border-2 border-black">
                <FontAwesomeIcon
                icon={faBuildingColumns}
                className="text-4xl text-black pr-5"
                style={{ width: '20px', height: '20px' }}
                />
                University
            </button>
            </a>
            <a href="/studyprocess/certificates">
            <button className="w-1/6 py-3 text-black font-bold hover:bg-blue-600 transition border-2 border-black">
                <FontAwesomeIcon
                icon={faAward}
                className="text-4xl text-black pr-5"
                style={{ width: '20px', height: '20px' }}
                />
                Certificates
            </button>
            </a>
            <a href="/studyprocess/projects">
            <button className="w-1/6 py-3 text-black font-bold hover:bg-blue-600 transition border-2 border-black">
                <FontAwesomeIcon
                icon={faAward}
                className="text-4xl text-black pr-5"
                style={{ width: '20px', height: '20px' }}
                />
                Projects
            </button>
            </a>
            <a href="/studyprocess/skills">
            <button className="w-1/6 py-3 text-black font-bold hover:bg-blue-600 transition border-2 border-black">
                <FontAwesomeIcon
                icon={faAward}
                className="text-4xl text-black pr-5"
                style={{ width: '20px', height: '20px' }}
                />
                Skills
            </button>
            </a>
            </div>
    );
};

export default TopBar;
