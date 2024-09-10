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

export default function Resource() {
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
      <div className="ml-64 pt-10 h-screen">
        
        <div className="p-3">
          {/* <div className="flex items-center justify-center pb-2">
            {errorMessage}
          </div> */}
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
              placeholder="Rechercher une ressource..."
            />
            <input
              type="submit"
              value="Rechercher"
              className="!w-1/5 !bg-primary"
            />
          </form>

          <div className=" px-12 mt-24 w-full">
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
