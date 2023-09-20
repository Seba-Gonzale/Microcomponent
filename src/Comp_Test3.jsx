import { v4 as uuidv4 } from "uuid";
import uMicroC, { NEW } from "./Microcomponents/uMicroC.js";

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

export const uM_test1 = uMicroC(NEW);
export const uM_test3 = uMicroC(NEW);
export const uM_test4 = uMicroC(NEW);
const test1 = uM_test1(null, collaborators);
const test3 = uM_test3(null, {
  name: { otherName: "Emi" },
  age: "27",
  gender: "female",
});
uM_test3(null, { perro: [new Map()] });
const test4 = uM_test4(false, {
  fullName: { name: "sebi" },
});

export default function CompTest3() {
  const test2 = uMicroC(collaborators);
  uM_test4(true, {
    pets: { perro: "Atom", perro2: "Akamaru" },
    sister: "Nayla",
  });
  return (
    <>
      <p>Hola soy {test4.sister.v}</p>
      <button
        onClick={() => {
          test2[0].id.v = "Miguel";
          test2[2].id.v = "Cogote";
          test3.name.otherName.v = "Mimi";
          test4.sister.v = "Naylon?";
          test2._set_(0);
        }}
      >
        Clickkkk
      </button>
      <button
        onClick={() => {
          test2[0].id.mC = "123456789";
          test2[0].name.mC = "Ramirez Mabel";
          test4.sister.v = "Dario?";
          test4._set_("sister");
        }}
      >
        Clickkkk
      </button>
    </>
  );
}
