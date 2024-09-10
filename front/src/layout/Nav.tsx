import { NavLink, useNavigate } from "react-router-dom";
import profil from "../assets/profile.svg";
import { useState,useEffect, useRef} from "react";
import Logo from "../components/Logo";
import { globalUserProps } from "../utils/types";
import { CURRENT_USER } from "../components/loggedUser/userLoged";
import { getUserById } from "../components/apolloClient/Queries";
import cross from "../assets/cross.svg";
import Cookies from "js-cookie";



// import FormInput from "../components/FormInput";

export default function Nav() {
  const [user, setUser] = useState<globalUserProps>();

  const navigate = useNavigate();
  const [openA, setOpenA] = useState(false);
  const [openN, setOpenN] = useState(false);
  const [openProfil, setOpenProfil] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  function isAuthenticated() {
    const userId = Cookies.get("userId"); // Récupérez l'ID de l'utilisateur à partir du local storage
    const userEmail = Cookies.get("userEmail"); // Récupérez l'e-mail de l'utilisateur à partir du local storage

    // Vérifiez si l'utilisateur est connecté en fonction des valeurs récupérées du local storage
    return userId && userEmail;
  }

  function removeSession() {
    Cookies.remove("userId");
    Cookies.remove("userEmail");
    Cookies.remove("userFirstname");
    Cookies.remove("userLastname")
    navigate("/login");
    window.location.reload();
  }

  




  function handleClickOutside(event: MouseEvent) {
    if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
      // Check if the clicked element is the profile icon
      if (event.target !== profileRef.current.firstChild?.nextSibling ) {
        setOpenProfil(false);
      }
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getUserById(CURRENT_USER)
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
    
  






  // const submit = useSubmit();
  return (
    <div className="flex flex-col top-0 left-0 z-10 fixed w-full ">
      
      {isAuthenticated() ? ("") : (
        <div className="flex justify-end items-center bg-gray-200 h-8">
          <div className="flex gap-2 text-[14px] pr-8">
            <div className="cursor-pointer">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "bg-primary text-white p-2" : "p-2"
                }
              >
                Se connecter
              </NavLink>
            </div>
            <span>|</span>
            <div className="cursor-pointer">
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "bg-primary text-white p-2" : "h-full w-full p-2"
                }
              >
                S'enregistrer
              </NavLink>
            </div>
          </div>
        </div>
      )}
      
      <nav className="px-4 top-0 left-0 bg-white">
        <ul>
          <li className="p-1">
            <NavLink to="/accueil">
              <Logo />
            </NavLink>
          </li>
        </ul>

        <nav className=" flex items-center gap-4">

          <div onMouseLeave={() => setOpenN(false)} className="relative">
            <div onMouseOver={() => setOpenN(true)} className="">
              <NavLink
                to="/besoin/mine"
                className={(() => {
                  const currentPath = window.location.pathname;
                  console.log(currentPath);
                  switch (currentPath) {
                    case "/besoin/mine":
                      return "flex items-center bg-primary text-white";
                    case "/besoin/exprimer":
                      return "flex items-center bg-primary text-white";
                    case "/besoin/repondre":
                      return "flex items-center bg-primary text-white";
                    default:
                      return "flex items-center hover:bg-primary-hover";
                  }
                })()}
              >
                Mes besoins
                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </NavLink>
            </div>
            <ul
              className={`absolute right-0 w-40 py-2 mt-2 rounded-lg shadow-xl bg-white ${
                openN ? "block" : "hidden"
              }`}
            >
              <li className="mx-1 w-full">
                <NavLink
                  to="/besoin/mine"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-white w-full"
                      : "w-full hover:bg-primary-hover"
                  }
                >
                  Mes besoins
                </NavLink>
              </li>

              <li className="mx-1 w-full">
                <NavLink
                  to="/besoin/exprimer"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-white w-full"
                      : "w-full hover:bg-primary-hover "
                  }
                >
                  Exprimer un besoin
                </NavLink>
              </li>

              
            </ul>
          </div>

          <div onMouseLeave={() => setOpenN(false)} className="relative">
            <div onMouseOver={() => setOpenN(false)} className="">
              <NavLink
                to="/ressource"
                className={({ isActive }) =>
                isActive
                  ? "bg-primary text-white px-2"
                  : "hover:bg-primary-hover px-2"
              }
              >
                Ressources
              </NavLink>
            </div>
              
          </div>

          <div onMouseLeave={() => setOpenA(false)} className="relative">
            <div onMouseOver={() => setOpenA(true)} className="">
              <NavLink
                to="professionnels/sante"
                className={(() => {
                  const currentPath = window.location.pathname;

                  switch (currentPath) {
                    case "/professionnels/sante":
                      return "flex items-center bg-primary text-white";
                    case "/professionnels/industriel":
                      return "flex items-center bg-primary text-white";
                    case "/professionnels/chercheur":
                      return "flex items-center bg-primary text-white";
                    case "/professionels/thehub":
                      return "flex items-center bg-primary text-white";
                    default:
                      return "flex items-center hover:bg-primary-hover";
                  }
                })()}
              >
                Annuaire
                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </NavLink>
            </div>
            <ul
              className={`absolute right-0 w-40 py-2 mt-2 rounded-lg shadow-xl bg-white ${
                openA ? "block" : "hidden"
              }`}
            >
              <li className="mx-1 w-full">
                <NavLink
                  to="/professionnels/sante"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-white w-full"
                      : "w-full hover:bg-primary-hover"
                  }
                >
                  Santé
                </NavLink>
              </li>

              <li className="mx-1 w-full">
                <NavLink
                  to="/professionnels/industriel"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-white w-full"
                      : "w-full hover:bg-primary-hover "
                  }
                >
                  Industriel
                </NavLink>
              </li>

              <li className="mx-1 w-full">
                <NavLink
                  to="/professionnels/chercheur"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-white w-full"
                      : "w-full hover:bg-primary-hover"
                  }
                >
                  Chercheur
                </NavLink>
              </li>
              <li className="mx-1 w-full">
                <NavLink
                  to="/thehub"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-white w-full"
                      : "w-full hover:bg-primary-hover"
                  }
                >
                  The Hub
                </NavLink>
              </li>
            </ul>
          </div>          

          <div  className="relative">
            {isAuthenticated() ? 
              (
                <div>
                  {openProfil ? (
                    <div ref={profileRef}  className="">
                        <div className="p-3 hover:bg-primary-hover">
                          <img src ={profil} alt="" className="w-4" />
                        </div>
                    </div>)
                    :
                    ( <div ref={profileRef} onClick={() => setOpenProfil(true)}  className="">
                        <div className="p-3 cursor-pointer hover:bg-primary-hover">
                          <img src ={profil} alt="" className="w-4" />
                        </div>
                      </div>)}
                </div>
              ) : (
                
                <div  className="">
                  <div className="p-3 hover:bg-primary-hover">
                    <NavLink to="/login"><img src ={profil} alt="" className="w-4" /></NavLink>
                  </div>
                </div>

              ) 

            }
            
            <div  
              
                  className={`absolute right-0 w-96 mt-2 rounded-xl shadow-xl bg-gray-200 p-2 ${
                    openProfil ? "block" : "hidden"
                  }`
                  }
            >
                <div className="flex flex-col">         
                  
                  <div className="pb-6 flex justify-between items-center">  
                    <div className="text-xs font-semibold w-6"></div>                  
                    <div className="text-xs font-semibold">
                      {Cookies.get("userEmail")} 
                    </div>
                    <div className="flex justify-end">
                      <img src ={cross} alt="" className="w-6 cursor-pointer hover:scale-110 transition transition-duration-500ms" onClick={()=>setOpenProfil(false)} />
                    </div>
                  </div>
                  <div className="flex-col gap-2 flex ">
                    <div className="pt-8 flex justify-center ">
                      <img
                        src={user?.profilePicture ?? "/test.png"}
                        alt=""
                        className="rounded-full w-24 h-24 border-2 border-solid border-black -mt-10"
                      />
                    </div>
                    
                    <div className="flex justify-center">
                      <div className="text-lg font-semibold">
                        Bonjour, {Cookies.get("userFirstname")} !
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <div className="border-2 border-primary border-opacity-50 rounded-full px-4 py-2 hover:bg-primary-hover text-xs ">
                        <a href="/feed">Gerer votre compte Esperanto</a>
                      </div>
                    </div>

                    <div className=" flex justify-center bottom-0 items-center">
                      <div className=" cursor-pointer w-1/2 hover:font-semibold text-center rounded-lg " onClick={() => removeSession()}>
                        Se deconnecter
                      </div>
                    </div>
                  </div>
                </div>
                

            </div>
          </div>
        </nav>
      </nav>
    </div>
  );
}
