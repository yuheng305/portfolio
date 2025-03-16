import React,{ useState} from "react";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import CustomCarousel from "../components/Carousel"
import BottomBar from "../components/BottomBar";

const images = [
    "/huyen.jpg",
    "/covua7.jpg",
    "/2211235_MinhChung7.jpg",
    "/tinhthcs.jpg",
  ];

const MiddleSchool=() => {
    return(
        <div>
            <SideBar/>
            <TopBar/>
            <div className="w-4/5 ml-auto h-full p-5">
                <h4 className="text-4xl font-semibold mb-4">Introduction</h4>
                <p className="text-2xl mb-8">I studied in grades 6, 7, and 8 at Lương Thế Vinh Secondary School (Đăk Tô, Kon Tum) and in grade 9 at Nguyễn Tất Thành Specialized High School (Kon Tum City, Kon Tum).</p>
                <div className="flex space-x-5 justify-center items-center mb-20">
                    <img src="\thcsltv.jpg" className="flex w-100 h-80"/>
                    <img src="\thptchuyenntt.jpg" className="flex w-100 h-80"/>
                </div>
                <h4 className="text-4xl font-semibold mb-4">Achievements</h4>
                <CustomCarousel images={images}/>
            </div>
            
            
        </div>
    );
};

export default MiddleSchool;