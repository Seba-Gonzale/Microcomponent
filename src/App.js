import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Componente from "./Componente";
import uGlobal from "./globalContext";
import uMicrocomponents, { _NEW_ } from "./uMicrocomponents/Microcomponents";
import Componente2 from "./Componente-copy";
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
const test1 = uMicrocomponents(false, {
  map: [new Map(), "hola"],
  10: "Garcia",
});

function App() {
  const test2 = uMicrocomponents({ ...collaborators });
  console.log(test2);
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
      <h1>{test2[0].id.mC}</h1>
      <h1>{test2[2].id.mC}</h1>
      <OtherComp name={test2[0]} />
      <OtherComp name={test2[2]} />
      <button
        onClick={() => {
          test2[0].id.v = "Lopez";
          test2[2].id.v = "Mernez";
          test2._set_(0, 2);
        }}
      >
        Clickkkk
      </button>
      <button
        onClick={() => {
          test2[0].id.mC = "Ramirez";
        }}
      >
        Clickkkk
      </button>
    </div>
  );
}

function OtherComp({ name }) {
  return <h3>{name.id.v}</h3>;
}

export { uGlobal_users };
export default App;
