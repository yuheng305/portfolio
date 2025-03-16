import React,{ useState} from "react";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import CustomCarousel from "../components/Carousel"

const images = [
    "/future_vpbanker_2024.jpg",
    "/tkuvtn.jpg",
    "/tmh.jpg"
  ];
const University=() => {
    return(
        <div>
            <SideBar/>
            <TopBar/>
            <div className="w-4/5 ml-auto h-full p-5">
                <h4 className="text-4xl font-semibold mb-4">Introduction</h4>
                <p className="text-2xl">I am currently a student of the 22nd cohort (Class of 2022) in the Honor Program in Computer Science, under the Faculty of Computer Science and Engineering at Ho Chi Minh City University of Technology – VNU-HCM.</p>
                <p className="text-2xl mb-8 font-semibold">GPA: 3.6/4.0 (8.5/10.0)</p>
                <div className="flex space-x-5 justify-center items-center mb-20">
                    <img src="\hcmut.jpg" className="flex w-100 h-80"/>
                    <img src="\cse.jpg" className="flex w-100 h-80"/>
                </div>
                <h4 className="text-4xl font-semibold mb-4">Achievements</h4>
                <CustomCarousel images={images}/>
            </div>
        </div>
    );
};

export default University;