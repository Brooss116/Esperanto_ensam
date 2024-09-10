import filters from "../assets/filters.svg";
import trash from "../assets/trash.svg";
import arrow from "../assets/arrow.svg";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from "react";
import Filter from "../components/Filter";
import Loader from "../components/Loader";
import { getAllTags } from "../components/apolloClient/Queries";

export default function Sidebar({
  setFilters,
  tagsCount,
}: {
  setFilters: Dispatch<SetStateAction<string[]>>;
  tagsCount: { [index: string]: number };
}) {
  const initialState = {
    props: {
      rotate90: true,
    },
  };
  const [state1, dispatch1] = useReducer(
    (prev: any, next: any) => ({ ...prev, ...next }),
    initialState
  );
  const [state2, dispatch2] = useReducer(
    (prev: any, next: any) => ({ ...prev, ...next }),
    initialState
  );

  const [tags, setTags] = useState<{ name: string; id: number }[]>([]);
  useEffect(() => {
    getAllTags().then((result) => {
      result.forEach((tag: { id: number; name: string }) =>
        dispatch1({ [tag.name]: false })
      );
      setTags(result);
    });
  }, []);
  useEffect(() => {
    const selectedFilters = Object.keys(state1).map((key, index) =>
      key !== "props" ? (Object.values(state1)[index] === true ? key : "") : ""
    );
    setFilters(selectedFilters.filter((item) => item !== ""));
  }, [state1]);
  return (
      <form className={`p-2 w-60 h-screen fixed bg-white -mt-3 overflow-scroll pt-16`}>
        <h2 className="flex items-center justify-center mb-4">
          <img src={filters} alt="" className="!w-4 mr-4" />
          Filtres
        </h2>
        <div className={`${
          state1.props.rotate90 ? "" : "pr-4"
          } `}>
          <div className="hover:bg-primary-hover hover:rounded py-1 ">
            <label htmlFor="reset" className="flex items-center cursor-pointer">
              <img src={trash} alt="" className="!w-4 mr-4" />
              Effacer les filtres
            </label>
            <input
              type="reset"
              name="reset"
              id="reset"
              hidden
              onClick={() => tags.map((tag) => dispatch1({ [tag.name]: false }))}
            />
          </div>
          <div className="mt-4">
            <span
              className="flex items-center justify-between cursor-pointer"
              onClick={() =>
                dispatch1({ props: { rotate90: !state1.props.rotate90 } })
              }
            >
              Spécialités
              <img
                src={arrow}
                alt=""
                className={`w-2 transition ${
                  state1.props.rotate90 ? "-rotate-90" : ""
                }`}
              />
            </span>
            <div
              className={`${
                state1.props.rotate90 ? "h-0" : "h-auto"
              } transition overflow-hidden`}
            >
              {tagsCount ? (
                Object.keys(tagsCount).map((tag, index) => (
                  <Filter
                    rotate={state1.props.rotate90}
                    info={{
                      id: tags[index].id,
                      name: tag,
                      count: Object.values(tagsCount)[index],
                    }}
                    state={state1}
                    dispatch={dispatch1}
                    key={tag}
                  />
                ))
              ) : (
                <Loader />
              )}
            </div>
          </div>
          <div className="mt-4">
            <span
              className="flex items-center justify-between cursor-pointer"
              onClick={() =>
                dispatch2({ props: { rotate90: !state2.props.rotate90 } })
              }
            >
              Ville d'exercice 
              <img
                src={arrow}
                alt=""
                className={`w-2 transition ${
                  state2.props.rotate90 ? "-rotate-90" : ""
                }`}
              />
            </span>
            <div
              className={`${
                state2.props.rotate90 ? "h-0" : "h-auto"
              } transition overflow-hidden `}
              
            >
              {tagsCount ? (
                Object.keys(tagsCount).map((tag, index) => (
                  <Filter
                    rotate={state2.props.rotate90}
                    info={{
                      id: tags[index].id,
                      name: tag,
                      count: Object.values(tagsCount)[index],
                    }}
                    state={state2}
                    dispatch={dispatch2}
                    key={tag}
                  />
                ))
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </form>
      
  );
}
