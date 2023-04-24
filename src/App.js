import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Componente from "./Componente";
import uGlobal from "./globalContext";
import uMicrocomponents, { _NEW_ } from "./uMicrocomponents/Microcomponents";
const uGlobal_users = uGlobal("new");

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
// const test = uMicrocomponents({ nano: "Encinas", data: "perris" });
// const test2 = uMicrocomponents({ emi: "Garcia" });
const newList = uMicrocomponents(_NEW_);
const test3 = newList({ map: [new Map(), "hola"] });

// console.log(test);
console.log(test3);
function App() {
  return (
    <div className="App">
      {Object.keys(_get_).map((key) => (
        <Componente suscript={key} key={key} />
      ))}

      {/* <Componente user={"user2"} /> */}
      {/* <h1>{test[0].emi.nano.mC}</h1> */}
      {/* <button onClick={() => (test[0].emi.nano.mC = "romi")}> */}
      {/* Quiero a Romi
      </button> */}
    </div>
  );
}

export { uGlobal_users };
export default App;
