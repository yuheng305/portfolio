import React,{ useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool, faSchoolFlag, faBuildingColumns, faAward } from '@fortawesome/free-solid-svg-icons';

const menuItems = [
    { name: "Middle School", icon: faSchool, link: "/studyprocess/middleschool" },
    { name: "High School", icon: faSchoolFlag, link: "/studyprocess/highschool" },
    { name: "University", icon: faBuildingColumns, link: "/studyprocess/university" },
    { name: "Certificates", icon: faAward, link: "/studyprocess/certificates" },
    { name: "Projects", icon: faAward, link: "/studyprocess/projects" },
    { name: "Skills", icon: faAward, link: "/studyprocess/skills" }
  ];
  
const TopBar=()=>{
    return (
        <div className="w-4/5 ml-auto h-full bg-gray-100 flex">
            {menuItems.map((item, index) => (
            <a key={index} href={item.link} className="w-1/6">
                <button className="w-full h-14 flex items-center justify-center gap-2 text-black font-bold hover:bg-blue-600 transition border-2 border-black">
                <FontAwesomeIcon icon={item.icon} className="text-xl text-black" />
                <span className="text-base leading-none">{item.name}</span>
                </button>
            </a>
            ))}

            </div>
    );
};

export default TopBar;
