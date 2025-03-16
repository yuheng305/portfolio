import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faEnvelope,faPenToSquare,faThLarge, faP } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram,faLinkedin,faYoutube } from '@fortawesome/free-brands-svg-icons'; 

const SideBar = () => {

  return (
    <nav className="bg-white shadow-md">
      <div className="fixed left-0 top-0 w-1/5 h-screen text-white flex flex-col shadow-md">
        {/* Danh sách các lựa chọn */}
        <img src="/DSC_4096.jpg" alt="Portrait"
          className="w-1/2 h-auto" ></img>
        <br></br>
        <h1 className="text-4xl text-black p-3">PORTFOLIO</h1>
        <ul className="">
            <a href="/about" className="text-lg text-black hover:text-gray-900">
            <li className="flex items-center space-x-3 p-3 hover:bg-gray-300 cursor-pointer">
                <FontAwesomeIcon 
                    icon={faUser} 
                    className="text-4xl text-black"
                    style={{ width: '20px', height: '20px' }} // Thêm kích thước cụ thể
                />
                
                <h1>ABOUT</h1>
                
            </li>
            </a>
          <a
            href="/studyprocess"
            className="block text-lg text-black hover:text-gray-900"
          >
          <li className="flex items-center space-x-3 p-3 hover:bg-gray-300 cursor-pointer">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="text-4xl text-black"
              style={{ width: '20px', height: '20px' }}
            />
            
              <h1>STUDY PROCESS</h1>
            
          </li>
          </a>
          <a
              href="/about#bottom"
              className="block text-lg text-black hover:text-gray-900"
            >
          <li className="flex items-center space-x-3 p-3 hover:bg-gray-300 cursor-pointer">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-4xl text-black"
              style={{ width: '20px', height: '20px' }}
            />
            
              <h1>CONTACT</h1>
            
          </li>
          </a>
        </ul>
        <div className="space-x-3 p-3">
          <a href="https://www.facebook.com/dratadius.manchel/">
          <FontAwesomeIcon
            icon={faFacebook}
            className="text-4xl text-blue-500"
            style={{ width: '24px', height: '24px' }}
          />
          </a>
          <a href="https://www.instagram.com/yuheng10092/">
          <FontAwesomeIcon
            icon={faInstagram}
            className="text-4xl text-blue-500"
            style={{ width: '24px', height: '24px' }}
          />
          </a>
          <a href="https://www.linkedin.com/in/huynq305/">
          <FontAwesomeIcon
            icon={faLinkedin}
            className="text-4xl text-blue-500"
            style={{ width: '24px', height: '24px' }}
            
          />
          </a>
          <a href="https://www.youtube.com/@nguyenquanghuy-rcs669">
          <FontAwesomeIcon
            icon={faYoutube}
            className="text-4xl text-blue-500"
            style={{ width: '24px', height: '24px' }}
            
          />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;