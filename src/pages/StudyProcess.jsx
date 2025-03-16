import React,{ useState} from "react";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";

const StudyProcess=() => {
    return(
        <div>
            <SideBar/>
            <TopBar/>
            <div className="w-4/5 fixed bottom-0 right-0">
                <BottomBar />
            </div>

            
        </div>
    );
};

export default StudyProcess;