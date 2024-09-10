import { createRoot } from "react-dom/client";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import App from "./Layout.tsx";
import "./index.css";
import Search from "./pages/search.tsx";
import Profil from "./pages/profil.tsx";
import User from "./pages/user.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import Need from "./pages/Besoin.tsx";
import Acceuil from "./pages/Accueil.tsx";
import Ressource from "./pages/ressource.tsx";
import Myneeds from "./pages/mesBesoins.tsx";
import Repondre from "./pages/repondreBesoins.tsx";
import TheHub from "./pages/theHub.tsx";
import Cookies from "js-cookie";

function isAuthenticated() {
  const userId = Cookies.get("userId"); // Récupérez l'ID de l'utilisateur à partir du local storage
  const userEmail = Cookies.get("userEmail"); // Récupérez l'e-mail de l'utilisateur à partir du local storage

  // Vérifiez si l'utilisateur est connecté en fonction des valeurs récupérées du local storage
  return userId && userEmail;
}

const root = createRoot(
  document.getElementById("root") as Element | DocumentFragment
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App/>}>
        <Route path="accueil" element={isAuthenticated() ? <Repondre /> : <Acceuil />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route
          index
          element={
            isAuthenticated() ? (
              <Navigate to={"/besoin/mine"} />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>

        <Route
          path="feed"
          element={isAuthenticated() ? <Profil /> : <Navigate to="/login" />}
        >
          <Route path="actualites" element={<Profil />} />
          <Route path="suivis" element={<Profil />}>
            <Route path="abonnes" element={<Profil />} />
            <Route path="abonnements" element={<Profil />} />
          </Route>
          <Route path="listes" element={<Profil />}>
            <Route path="utilisateurs" element={<Profil />} />
            <Route path="materiels" element={<Profil />} />
            <Route path="besoins" element={<Profil />} />
          </Route>
        </Route>
        <Route path="professionnels" element={<Search />}>
          <Route path="sante" element={<Search />} />
          <Route path="chercheur" element={<Search />} />
          <Route path="industriel" element={<Search />} />
        </Route>
        <Route path="thehub" element={<TheHub />} />

        <Route
          path="besoin"
        >
          <Route path="mine" element={isAuthenticated() ? <Myneeds /> : <Navigate to="/login" />} />
          <Route path="exprimer" element={isAuthenticated() ? <Need /> : <Navigate to="/login" />} />
        </Route>
        <Route path="ressource" element={<Ressource />} />       

        <Route
          path="user/:id"
          element={isAuthenticated() ? <User /> : <Navigate to="/login" />}
        />
      </Route>
    </Route>
  )
);

root.render(
  <>
    <RouterProvider router={router} />
  </>
);
