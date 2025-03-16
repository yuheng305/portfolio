import React, { useState, useEffect} from 'react';
import SideBar from '../components/SideBar';
import BottomBar from '../components/BottomBar';
import { useLocation } from "react-router-dom";



const About = () => {
    const location = useLocation();

    useEffect(() => {
      if (location.hash === "#bottom") {
        document.getElementById("bottom")?.scrollIntoView({ behavior: "smooth" });
      }
    }, [location]);

    const images=["hsgqg.jpg","DSC03261.jpg","avatar wca.png"];
    const [currentIndex,setCurrentIndex]=useState(0);
    const goToSlide = (index) =>{
        setCurrentIndex(index);
    };
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Chuyển đổi ảnh mỗi 3 giây
    
        return () => clearInterval(interval); // Cleanup khi component unmount
      }, []);
    return (
        <div>
        <SideBar/>
        <div className="w-4/5 ml-auto h-20" >
            <div className="p-3 space-y-3 bg-gray-100">
                <h4 className="text-4xl font-semibold">About Me</h4>
                <p className="text-2xl">My name is Nguyen Quang Huy. I am currently a third-year student at Ho Chi Minh City University of Technology, majoring in Computer Science under the Honor Program. I have a deep passion for programming, problem-solving, especially related to cognitive skills. My goal is to become a Software Engineer in the near future to create some useful products for society. Beyond my academic and professional aspirations, I have a strong interest in Japanese culture, cuisine, and lifestyle. With a clear determination to work in Japan, I am dedicated to learning Japanese every day to achieve this dream.</p>
                <h4 className="text-4xl font-semibold">Some photos</h4>

                <div className="flex justify-center">
                    <div className="max-w-[900px] w-full">
                        <div className="w-full flex justify-center">
                            <img
                                src={images[currentIndex]}
                                alt={`Slide ${currentIndex + 1}`}
                                className="object-contain max-w-full max-h-[600px]"
                            />
                        </div>
                        <div className="flex justify-center mt-4 space-x-2">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-3 h-3 rounded-full ${
                                        currentIndex === index ? "bg-blue-500" : "bg-gray-300"
                                    } transition-all duration-300`}
                                ></button>
                            ))}
                        </div>
                    </div>
                </div>
                          



            </div>
            <div id="bottom"><BottomBar/></div>
              
        </div>
        </div>
    );
};

export default About;