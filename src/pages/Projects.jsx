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
            
            <div className="flex items-center space-x-3">
                <h1 className="font-bold text-2xl">HCMUT Student Smart Printing Service</h1>
                <GitHubRepoBox repoUrl="https://github.com/KhiemNguyen2104/TN01-05-Smart-Printing-Service-HCMUT_SSPS" />
            </div>

            <h2 className="justify-start items-start text-xl space-y-2 mt-3 mb-8">
                <h3>Developed a cutting-edge application designed to streamline and optimize document printing services for students across the university's campuses, by integrating advanced features and ensuring seamless usability.</h3>
                <h3><b>Roles:</b> Front-end developer.</h3>
                <h3><b>Tools Used:</b> ReactJS, NodeJS, Prisma, PostgreSQL.</h3>
            </h2>

            <div className="flex items-center space-x-3">
                <h1 className="font-bold text-2xl">Football Tournament Managament System</h1>
                <GitHubRepoBox repoUrl="https://github.com/yuheng305/football_management_system" />
            </div>

            <h2 className="justify-start items-start text-xl space-y-2 mt-3">
                <h3>Developed a system to store and manage information about football tournament seasons. It includes detailed records for various entities involved in the tournament, such as clubs, players, coaches, referees, and stadiums.</h3>
                <h3><b>Roles:</b> Database developer.</h3>
                <h3><b>Tools Used:</b> ReactJS, NodeJS, MySQL.</h3>
            </h2>    
            </div>
            
        </div>

            
    );
};

export default Projects;