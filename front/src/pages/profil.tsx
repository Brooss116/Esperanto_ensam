import ProfilFeed from "../components/ProfilFeed";
import UserMenu from "../components/UserMenu";
import ProfilCard from "../components/ProfilCard";
import Suggestions from "../components/Suggestions";
import { Navigate, useLocation } from "react-router-dom";

export default function Profil() {
  const current = 1;
  const pathname = useLocation().pathname;
  return (
    <>
      {pathname.split("/")[pathname.split("/").length - 1] === "suivis" ? (
        <Navigate to="/feed/suivis/abonnements"/>
      ) : (
        <div className="grid grid-cols-5 gap-4 px-20 pt-2 w-full h-[120vh]">
          <ProfilCard />
          <div className="col-span-3">
            <UserMenu />
            <ProfilFeed />
          </div>
          <Suggestions userId={current ? +current : 0} />
        </div>
      )}
    </>
  );
}
