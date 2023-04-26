import { v4 as uuidv4 } from "uuid";
import uMicroC, { _NEW_ } from "./Microcomponents/Microcomponents";

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

export const uM_test3 = uMicroC(_NEW_);
const test3 = uM_test3(false, { name: "Emi", age: "27", gender: "female" });

export default function CompTest3() {
  const test2 = uMicroC(collaborators);

  return (
    <>
      <button
        onClick={() => {
          test2[0].id.v = "Miguel";
          test2[2].id.v = "Cogote";
          test3.name.v = "Mimi";
          test2._set_(0);
        }}
      >
        Clickkkk
      </button>
      <button
        onClick={() => {
          test2[0].id.mC = "123456789";
          test2[0].name.mC = "Ramirez Mabel";
        }}
      >
        Clickkkk
      </button>
    </>
  );
}
