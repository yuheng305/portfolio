import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMap } from "@fortawesome/free-solid-svg-icons";

export default function BottomBar() {
  return (
    <div className="bg-gray-300 min-h-[100px] flex p-3">
      <div className="w-1/3 bg-gray-600 flex flex-col items-center justify-center p-4">
        <FontAwesomeIcon icon={faEnvelope} className="text-4xl text-white mb-2" />
        <span className="text-white text-lg">huydt04@gmail.com</span>
      </div>
      <div className="w-1/3 bg-green-500 flex flex-col items-center justify-center p-4">
        <FontAwesomeIcon icon={faPhone} className="text-4xl text-white mb-2" />
        <span className="text-white text-lg">0865706314</span>
      </div>
      <div className="w-1/3 bg-gray-600 flex flex-col items-center justify-center p-4">
        <FontAwesomeIcon icon={faMap} className="text-4xl text-white mb-2" />
        <span className="text-white text-lg">Dak To, Kon Tum</span>
      </div>
    </div>
  );
}
