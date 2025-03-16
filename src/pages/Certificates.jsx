import React,{ useState} from "react";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";

const Certificates=() => {
    return(
        <div>
            <SideBar/>
            <TopBar/>
            <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col items-center space-y-6">
                <div className="w-[800px] h-[400px] flex flex-col justify-center items-center mt-10">
                <img src="/Chứng chỉ TOEIC_Nguyễn Quang Huy.jpg" className="w-full h-full object-contain " />
                <p className="text-lg font-semibold ">TOEIC Reading/Listening - IIG</p>
                </div>

                <div className="w-[800px] h-[480px] flex flex-col justify-center items-center p-10">
                <img src="/ML_coursera.jpeg" className="w-full h-full object-contain " />
                <p className="text-lg font-semibold ">Machine Learning Specialization - Coursera</p>
                </div>

                <div className="w-[800px] h-[480px] flex flex-col justify-center items-center p-10">
                <img src="/DL_coursera.jpeg" className="w-full h-full object-contain " />
                <p className="text-lg font-semibold mb-5">Deep Learning Specialization - Coursera</p>
                </div>

                <div className="w-[800px] h-[600px] flex flex-col justify-center items-center">
                <img src="/2211235_MinhChung10.jpg" className="w-full h-full object-contain " />
                <p className="text-lg font-semibold ">Certificate of Participation in the Communist Party Admission Course</p>
                </div>
            </div>
            </div>


        </div>
    );
};

export default Certificates;