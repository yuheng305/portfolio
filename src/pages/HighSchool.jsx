import React,{ useState} from "react";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import CustomCarousel from "../components/Carousel"

const images = [
    "/2211235_MinhChung1.jpg",
    "/2211235_MinhChung2.jpg",
    "/2211235_MinhChung3.jpg",
    "/2211235_MinhChung4.jpg",
    "/2211235_MinhChung5.jpg",
    "/2211235_MinhChung6.jpg",
    "/odon-vallet.jpg",
    "/olpggth.jpg",
    "/2211235_MinhChung9.jpg",
    "/thtt-1.jpg",
  ];
const HighSchool=() => {
    return(
        <div>
            <SideBar/>
            <TopBar/>
            <div className="w-4/5 ml-auto h-full p-5">
                            <h4 className="text-4xl font-semibold mb-4">Introduction</h4>
                            <p className="text-2xl">I studied at Quốc Học Huế High School for the Gifted (Class of 2019-2022) with a specialization in Math.</p>
                            <p className="text-2xl mb-8 font-semibold">GPA: 9.3/10.0</p>
                            <div className="flex space-x-5 justify-center items-center mb-20">
                                <img src="\qhh.jpg" className="flex w-100 h-80"/>
                                <img src="\qhh2.jpg" className="flex w-100 h-80"/>
                            </div>
                            <h4 className="text-4xl font-semibold mb-4">Achievements</h4>
                            <CustomCarousel images={images}/>
                        </div>
        </div>
    );
};

export default HighSchool;