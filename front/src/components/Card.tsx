import { Link } from "react-router-dom";
import { cardProps } from "../utils/types";
import Cookies from "js-cookie";
import lock from "../assets/lock-alt-svgrepo-com.svg"

export default function Card({ user }: cardProps) {
  function isAuthenticated() {
    const userId = Cookies.get("userId"); // Récupérez l'ID de l'utilisateur à partir du local storage
    const userEmail = Cookies.get("userEmail"); // Récupérez l'e-mail de l'utilisateur à partir du local storage

    // Vérifiez si l'utilisateur est connecté en fonction des valeurs récupérées du local storage
    return userId && userEmail;
  }
  return (
    <article className="mx-auto rounded-lg">
      <div className="flex items-center w-full">
        <div>
          <div className="grid grid-cols-6 grid-rows-2 gap-2 items-center mr-2">
            {user?.tags?.map((tag, index) => {
              return index < 12 ? (
                <span
                  className="w-full h-fit bg-primary-100 py-0.5 px-1 rounded text-xxs line-clamp-1"
                  key={tag.name + index + tag.id}
                >
                  {tag.name}
                </span>
              ) : (
                ""
              );
            })}
          </div>

          <h2 className="text-lg mt-2">
            {user.firstname} {user.lastname}
          </h2>
          <p className="text-sm">{user.description}</p>
        </div>
        <div className="flex items-center justify-center !w-fit ">
          <img
            src={user.profilePicture}
            alt=""
            className="!max-w-[150px] w-[150px] rounded-full"
          />
        </div>
      </div>
      <footer>
        
          {isAuthenticated() ? (<Link
            to={`/user/${user.id}`}
            className="p-1 text-black hover:bg-primary hover:text-white border-none"
          >
            Voir plus
          </Link>) :
              (<div className="flex ">
              <div
                className="p-1 border-none text-black"
              >
                Voir plus 
              </div>
              <img src={lock} alt="" className="!w-4 mr-4" />
              </div>
          )
        }
      </footer>
    </article>
  );
}
