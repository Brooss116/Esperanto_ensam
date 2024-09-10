import esperanto from "../assets/Esperanto.svg"


export default function TheHub() {
  return (
    <div className="flex flex-col pb-[100vh] pt-[10vh] items-center justify-center bg-gray-100 ">
      <h1 className="text-4xl font-bold my-10">Bienvenue sur Esperanto</h1>
      {/* <div className="absolute left-0">
        <img className="w-[80vw]" src={esperanto} />
      </div> */}
      <p className="text-lg text-center max-w-md mb-8">
        Le pont entre les acteurs de la santé et les industriels pour une collaboration efficace.
      </p>
      <div className="flex space-x-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Rejoindre Esperanto
        </button>

      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Nos fonctionnalités :</h2>
        <ul className="list-disc list-inside">
          <li>Connectez-vous avec des professionnels de la santé ou des industriels.</li>
          <li>Partagez des informations et collaborez sur des projets en temps réel.</li>

          <li>Accédez à une base de données de ressources et d'informations sectorielles.</li>
        </ul>
      </div>
    </div>
  );
}   