import { USERS } from "../components/gql/GetAllUsers";
import Sidebar from "../layout/Sidebar";

import { globalUserProps } from "../utils/types";
import { NavLink, useLocation } from "react-router-dom";
import Professionnels from "./subpages/professionnels";
// import Materiels from "./subpages/materiels";
// import Infrastructures from "./subpages/infrastructures";
import { HEALTH_ACTOR_SEARCH } from "../components/gql/HealthActorSearch";
import { INDUSTRIAL_SEARCH } from "../components/gql/IndustrialSearch";
import { RESEARCHER_SEARCH } from "../components/gql/ResearcherSearch";
import { getSearchedUser } from "../components/apolloClient/Queries";
// import AddButton from "../components/AddButton";
import { useEffect, useState } from "react";

type Tags = "healthActor" | "researcher" | "industrial" | "";

export default function Search() {
  const location = useLocation();
  const pathname = location.pathname;
  const tags = {
    sante: "healthActor",
    chercheur: "researcher",
    industriel: "industrial",
  };
  const queries = {
    healthActor: HEALTH_ACTOR_SEARCH,
    researcher: RESEARCHER_SEARCH,
    industrial: INDUSTRIAL_SEARCH,
    default: USERS,
  };
  const tag = Object.values(tags)[
    Object.keys(tags).indexOf(pathname.split("/")[2])
  ] as Tags;
  const [noResult, setNoResult] = useState(false);
  const [users, setUsers] = useState<globalUserProps[]>([]);
  const [allUsers, setAllUsers] = useState<globalUserProps[]>([]);
  const [input, setInput] = useState<string>("");
  const [filters, setFilters] = useState<string[]>([]);
  const [tagsCount, setTagsCount] = useState<{ [index: string]: number }>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  function getUsersByTagFilters(filters: string[], users: globalUserProps[]) {
    return users.filter((user) => {
      const userTags = user.tags.map((tag) => tag.name);
      return filters.every((filter) => userTags.includes(filter));
    });
  }

  function normalizeString(input: string): string {
    input ? input : (input = " ");
    return input
      .normalize("NFD") // Décompose les caractères accentués en base et accents séparés
      .replace(/[\u0300-\u036f]/g, "") // Supprime les caractères d'accent
      .replace(/[^\w\s]/gi, "") // Supprime les caractères spéciaux
      .toLowerCase(); // Convertit en minuscules
  }

  useEffect(() => {
    getSearchedUser(queries[tag ? tag : "default"], input).then((result) => {
      switch (tag) {
        case "healthActor":
          setErrorMessage("");
          setUsers(result.healthActorsBySearch.rows);
          setAllUsers(result.healthActorsBySearch.rows);
          setNoResult(result.healthActorsBySearch.count === 0);
          console.log(result.healthActorsBySearch.rows);
          break;
        case "researcher":
          setErrorMessage("");
          setUsers(result.researchersBySearch.rows);
          setAllUsers(result.researchersBySearch.rows);
          setNoResult(result.researchersBySearch.count === 0);
          console.log(result.researchersBySearch.rows);
          break;
        case "industrial":
          setErrorMessage("");
          setUsers(result.industrialsBySearch.rows);
          setAllUsers(result.industrialsBySearch.rows);
          setNoResult(result.industrialsBySearch.count === 0);
          console.log(result.industrialsBySearch.rows);
          break;
        default:
          setErrorMessage("Veuillez choisir une catégorie");
          setUsers(result.users);
          setAllUsers(result.users);
          setNoResult(result.users.length === 0);
          console.log(result.users);
          break;
      }
    });
  }, [input, tag]);

  useEffect(() => {
    if (filters.length !== 0) {
      const matchedUsers = getUsersByTagFilters(filters, users);
      setUsers(matchedUsers);
    } else {
      setUsers(allUsers);
    }
  }, [filters]);

  useEffect(() => {
    if (users.length !== 0) {
      const allTags: string[] = [];
      users.map((user) => user.tags.map((tag) => allTags.push(tag.name)));
      const tagsCountTemp: { [index: string]: number } = {};
      for (const num of allTags) {
        tagsCountTemp[num] = tagsCountTemp[num] ? tagsCountTemp[num] + 1 : 1;
      }
      setTagsCount(tagsCountTemp);
    }
  }, [users]);

  return (
    <>
      <Sidebar
        setFilters={setFilters}
        tagsCount={
          tagsCount as {
            [index: string]: number;
          }
        }
      />
      <div className="ml-64 pt-10 ">
        <div className="flex">
          {["Santé", "Industriel", "Chercheur"].map((role) => (
            <NavLink
              className={({ isActive }) =>
                `flex-1 bg-white py-4 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white ${
                  isActive ? "border-b-4 border-blue-500" : ""
                }`
              }
              to={normalizeString(role)}
              replace={true}
              key={role}
            >
              {role}
            </NavLink>
          ))}
        </div>
        <div className="p-3">
          <div className="flex items-center justify-center pb-2">
            {errorMessage}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setInput(e.currentTarget.search.value);
            }}
            className="flex justify-between items-center w-full"
          >
            <input
              type="search"
              name="search"
              className=" bg-white !w-4/5"
              placeholder="Rechercher un profil..."
            />
            <input
              type="submit"
              value="Rechercher"
              className="!w-1/5 !bg-primary"
            />
          </form>

          <div className=" px-12 mt-24 w-full ">
            {noResult ? (
              <h2 className="text-2xl text-center">Aucun résultat</h2>
            ) : pathname.split("/")[1] === "professionnels" ? (
              <Professionnels users={users} />
            ) : (
              ""
            )}
          </div>
        </div>
        {/* <AddButton /> */}
      </div>
    </>
  );
}
