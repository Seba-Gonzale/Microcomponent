import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Componente from "./Componente";
import uGlobal from "./globalContext";
import CompTest3 from "./Comp_Test3";
import CompTest4 from "./Comp_Test4";
import CompTest2 from "./Comp_Test2";
const uGlobal_users = uGlobal("new");

if (sessionStorage.getItem("p")) console.log(sessionStorage.getItem("p"));
else {
  sessionStorage.setItem("p", JSON.stringify({ hola: "universo" }));
  console.log(sessionStorage.getItem("p"));
}

const collaborators = [
  {
    id: uuidv4(),
    team: "Front End",
    photo: "https://github.com/harlandlohora.png",
    name: "Harland Lohora",
    position: "Instructor",
    fav: true,
  },
  {
    id: uuidv4(),
    team: "Programación",
    photo: "https://github.com/genesysaluralatam.png",
    name: "Genesys Rondón",
    position: "Desarrolladora de software e instructora",
    fav: false,
  },
  {
    id: uuidv4(),
    team: "UX y Diseño",
    photo: "https://github.com/JeanmarieAluraLatam.png",
    name: "Jeanmarie Quijada",
    position: "Instructora en Alura Latam",
    fav: false,
  },
  {
    id: uuidv4(),
    team: "Programación",
    photo: "https://github.com/christianpva.png",
    name: "Christian Velasco",
    position: "Head de Alura e Instructor",
    fav: false,
  },
  {
    id: uuidv4(),
    team: "Innovación y Gestión",
    photo: "https://github.com/JoseDarioGonzalezCha.png",
    name: "Jose Gonzalez",
    position: "Dev FullStack",
    fav: false,
  },
];
const { _get_ } = uGlobal_users({ ...collaborators });
// const test1 = uMicrocomponents(false, {
//   map: [new Map(), "hola"],
//   10: "Garcia",
// });

function App() {
  console.log(window.location.host);
  return (
    <div className="App">
      {Object.keys(_get_).map((key) => (
        <Componente suscript={key} key={key} />
      ))}
      {/* {test.map((value, index) => {
        return <Componente2 obj={value} key={index} />;
      })} */}

      {/* <Componente user={"user2"} /> */}
      {/* <h1>{test[0].emi.nano.mC}</h1> */}
      {/* <button onClick={() => (test[0].emi.nano.mC = "romi")}> */}
      {/* Quiero a Romi
      </button> */}
      <CompTest3 />
      <CompTest2 />
      <CompTest4 />
    </div>
  );
}

export { uGlobal_users };
export default App;
