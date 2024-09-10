import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../assets/Esperanto.png";

export default function Footer() {
  return (
    <div className="bottom-0 w-full absolute z-auto">
      <footer className="px-8 bg-white w-full p-2 mt-8 ">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center gap-10">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <img src={logo} alt="Esperanto Logo" className="h-10 mr-4" />
              </div>
              <p className="text-gray-500 text mb-4">
                Connectez-vous dans un monde sans frontière avec Esperanto.                
              </p>              
              <p className="text-gray-500 text-sm">
                Politique de protection des données
              </p>
              <p className="text-gray-500 text-sm">
                Mentions légales 
              </p>
              <p className="text-gray-500 text-sm">
                Conditions générales d'utilisations
              </p>
            </div>
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h4 className="text-xl font-bold mb-4">Contact</h4>
              <p className="text-gray-500">05 56 84 53 33</p>
              <p className="text-gray-500">8 avenue de l'Université, 33400 Talence</p>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex justify-center">
              <a href="#" className="text-gray-500 hover:text-gray-700 mx-2">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 mx-2">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 mx-2">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-gray-100 py-4 ">
        <p className="text-sm text-gray-500 text-center">
          Copyright &copy; 2024
        </p>
      </div>
    </div>
  );
}
