import { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import { getAllTags } from "../components/apolloClient/Queries";
import { createNeed } from "../components/apolloClient/Mutations";
import { CURRENT_USER } from "../components/loggedUser/userLoged";
import { useNavigate } from "react-router-dom";

export interface Tag {
  id: number;
  name: string;
}

export enum NeedType {
  Material = "Material",
  Professional = "Professional",
  Infrastructure = "Infrastructure",
}

export interface Need {
  title: string;
  type: string;
  infrastructure: string;
  description: string;
  tags: Tag[];
  typeNeed: string;
}

export default function Need() {
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
 

  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [isSelectTagOpen, setIsSelectTagOpen] = useState(false);

  const [title, setTitlte] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<NeedType | string>(NeedType.Professional);
  const [infrastructure, setInfrastructure] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [typeNeed, setTypeNeed] = useState<string>("idee");

  

  const toggleSelectVisibility = (): void => {
    setIsSelectTagOpen(!isSelectTagOpen);
  };

  const handleTagSelection = (tag: Tag): void => {
    setIsSelectTagOpen(false);
    setTags([...tags, { id: tag.id, name: tag.name }]);
    setAllTags(allTags.filter((t) => t.id !== tag.id));
  };

  const submitForm = (): void => {
    const needData: Need = {
      title: title,
      type: type,
      infrastructure: infrastructure,
      description: description,
      tags: tags,
      typeNeed: typeNeed,
    };
    createNeed(CURRENT_USER, needData)
      .then(() => {
        setMessage("Votre besoin a été créé avec succès");
      })
      .then(() => {
        navigate(0);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  

  useEffect(() => {
    getAllTags()
      .then((tagData) => {
        setAllTags(tagData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  return (
    <div className="bg-gray-100 py-6 pt-4 w-screen">
      <div className=" py-3  sm:mx-auto w-[50%] ">
        <div className="px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 ">
          <div>
            <h1 className="text-2xl font-semibold">Exprimer un besoin </h1>
          </div>
          <div className="flex justify-evenly py-10">
            <div onClick={()=>setTypeNeed("idee")} className={typeNeed==="idee"                  
                      ? "px-2 text-center w-[35%] flex items-center justify-center border-primary border-2 border-opacity-50 py-6 rounded-xl bg-primary text-white"
                      : "px-2 text-center w-[35%] flex items-center justify-center border-primary border-2 border-opacity-50 py-6 rounded-xl hover:bg-primary-hover"
                  } >
              Vous avez une idée !
            </div>
            <div onClick={()=>setTypeNeed("projet")} className={typeNeed==="projet"                  
                      ? "px-2 text-center w-[35%] flex items-center justify-center border-primary border-2 border-opacity-50 py-6 rounded-xl bg-primary text-white "
                      : "px-2 text-center w-[35%] border-primary border-2 border-opacity-50 py-6 rounded-xl hover:bg-primary-hover flex items-center justify-center"
                  } >
              Vous avez un projet concret ! 
            </div>
          </div>
          {errorMessage && (
            <div className="text-red-400 text-sm mb-4">{errorMessage}</div>
          )}
          {!errorMessage && message && (
            <div className="text-primary-400 text-sm mb-4">{message}</div>
          )}
          <div
            className="flex flex-col gap-8 bg-white rounded-lg relative "
            id="add-need"
          >
            
            


            <div > {typeNeed==="idee" ?  
            
            // Partie idée
            (
              <div className="flex flex-col gap-2 px-4 pt-6 pb-2">
                <FormInput
                  id="title"
                  type="text"
                  label="Titre de votre idée"
                  value={title}
                  setValue={setTitlte}
                />
              
                <FormInput
                  id="description"
                  type="textarea"
                  label="Description de votre idée"
                  value={description}
                  setValue={setDescription}
              
                />
                <div className="flex flex-col items-start justify-center mb-4">
                  {tags.length > 0 ? (
                    <h3 className="text-sm text-gray-400">Domaine d'expertise requis</h3>
                  ) : (
                    ""
                  )}
                  <div className="text-xxs flex flex-wrap mt-2 items-center ">
                    {tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="bg-primary-100 rounded py-0.5 px-1 m-0.5"
                        >
                          {tag.name}
                        </span>
                      ))}
                    {isSelectTagOpen && (
                      <div>
                        <select
                          className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring text-[14px]"
                          value={""}
                          onChange={(e) => {
                            const selectedTagId = e.target.value;
                            const tag = allTags.find(
                              (tag) => tag.id == parseInt(selectedTagId)
                            );
                            if (tag) {
                              handleTagSelection(tag);
                            }
                          }}
                        >
                          <option value="">-- Sélectionnez un domaine d'expertise --</option>
                          {allTags.map((tag) => (
                            <option key={tag.id} value={tag.id}>
                              {tag.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
              
                    <a
                      href="#"
                      className="text-primary hover:font-semibold mt-[3px] py-0.5 px-1 m-0.5 flex "
                      onClick={toggleSelectVisibility}
                    >
                      Ajouter un domaine d'expertise
                    </a>
                  </div>
              
                </div>
                <div className="pt-4 flex items-center space-x-4">
                  <button
                    onClick={() => submitForm()}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
                  >
                    Créer le besoin
                  </button>
                </div>
              </div>
              )




              : 


                              
              //Partie projet

              (
              <div className="flex flex-col gap-2 px-4 pt-6 pb-2">
              <FormInput
                id="title"
                type="text"
                label="Titre de votre projet"
                value={title}
                setValue={setTitlte}
              />
            
              <FormInput
                id="infrastructure"
                type="text"
                label="Infrastructure utile à votre projet"
                value={infrastructure}
                setValue={setInfrastructure}
              />
              <FormInput
                id="description"
                type="textarea"
                label="Description détaillée de votre projet"
                value={description}
                setValue={setDescription}
            
              />
              <div className="flex flex-col items-start justify-center mb-4">
                {tags.length > 0 ? (
                  <h3 className="text-sm text-gray-400">Domaine d'expertise requis</h3>
                ) : (
                  ""
                )}
                <div className="text-xxs flex flex-wrap mt-2 items-center ">
                  {tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="bg-primary-100 rounded py-0.5 px-1 m-0.5"
                      >
                        {tag.name}
                      </span>
                    ))}
                  {isSelectTagOpen && (
                    <div>
                      <select
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring text-[14px]"
                        value={""}
                        onChange={(e) => {
                          const selectedTagId = e.target.value;
                          const tag = allTags.find(
                            (tag) => tag.id == parseInt(selectedTagId)
                          );
                          if (tag) {
                            handleTagSelection(tag);
                          }
                        }}
                      >
                        <option value="">-- Sélectionnez un domaine d'expertise --</option>
                        {allTags.map((tag) => (
                          <option key={tag.id} value={tag.id}>
                            {tag.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
            
                  <a
                    href="#"
                    className="text-primary hover:font-semibold mt-[3px] py-0.5 px-1 m-0.5 flex "
                    onClick={toggleSelectVisibility}
                  >
                    Ajouter un domaine d'expertise
                  </a>
                </div>
            
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <button
                  onClick={() => submitForm()}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
                >
                  Créer le besoin
                </button>
              </div>
            </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
