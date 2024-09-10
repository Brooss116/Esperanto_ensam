import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";

export default function TheHub() {
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [resultsNumber, setresultsNumber] = useState(0);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingNextPage, setLoadingNextPage] = useState(false);
  useEffect(() => {
    // Réinitialiser searchResults à un tableau vide lorsque searchText change
    setPageNumber(0); // Réinitialiser pageNumber à 0 également
  }, [searchText]);

  const fetchData = async () => {
    if (pageNumber === 0) {
      setLoading(true);
    } else {
      setLoadingNextPage(true);
    }

    try {
      const response = await fetch(
        `https://zuul-proxy.u-bordeaux.fr/search-service/search?text=${searchText}&resourceTypeIds=6306259fa95672000184662d&pageSize=4&pageNumber=${pageNumber}&date=Thu%20Mar%2021%202024&userConnected=true&userUB=false`,
        {
          method: "GET",
          headers: {
            Authorization:
              "",
          },
          redirect: "follow",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setPageNumber(pageNumber + 1);
      const data = await response.json();
      setresultsNumber(data.resultsNumber);
      setSearchResults((prevSearchResults) => [
        ...prevSearchResults,
        ...data.results,
      ]);
      console.log(searchResults)
    } catch (error) {
      console.error(error);
    } finally {
      if (pageNumber === 0) {
        setLoading(false);
      } else {
        setLoadingNextPage(false);
      }
    }
  };

  const handleSearch = () => {
    if (pageNumber === 0) {
      setSearchResults([]); // Réinitialiser searchResults à un tableau vide lorsque vous lancez une nouvelle recherche
      fetchData();
      setresultsNumber(0);
    }
  };

  const handleNextPage = () => {
    fetchData();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="p-3 pt-14" onKeyDown={handleKeyDown}>
      <div className="flex justify-between items-center w-full">
        <input
          type="text"
          placeholder="Rechercher dans TheHub"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="bg-white !w-4/5"
        />
        <input
          type="Submit"
          value="Rechercher"
          onClick={handleSearch}
          className="!w-1/5 !bg-primary text-white h-10 "
        />
      </div>

      {loading && <Loader />}

      {resultsNumber > 0 && <p>{resultsNumber} résultats</p>}

      <div className="px-12 mt-10 w-full">
        {searchResults.map((result, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-md p-2 mb-2"
          >
            <p className="text-lg">
              {result.result.firstName} {result.result.name} -{" "}
              {result.result.statut}
            </p>
            <p className="text-gray-600"> {result.result.employer}</p>
          </div>
        ))}
      </div>
      {pageNumber > 0 && (
        <button onClick={handleNextPage}>
          {loadingNextPage ? "Recherche en cours..." : "Afficher plus"}
        </button>
      )}
    </div>
  );
}
