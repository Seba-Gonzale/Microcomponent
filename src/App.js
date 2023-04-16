import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Header from "./components/Header/Header.jsx";
import Form from "./components/Form/Form.jsx";
import MiOrg from "./components/MiOrg/MiOrg";
import { useEffect, useState } from "react";
import Team from "./components/Team/Team";
import Footer from "./components/Footer";
import myContext from "./utils/myContext";

// Lista de equipos
const initialTeams = [
  {
    title: "Programación",
    primaryColor: "#57C278",
    secondaryColor: "#D9F7E9",
  },
  {
    title: "Front End",
    primaryColor: "#82CFFA",
    secondaryColor: "#E8F8FF",
  },
  {
    title: "Data Science",
    primaryColor: "#A6D157",
    secondaryColor: "#F0F8E2",
  },
  {
    title: "DevOps",
    primaryColor: "#E06B69",
    secondaryColor: "#FDE7E8",
  },
  {
    title: "UX y Diseño",
    primaryColor: "#DB6EBF",
    secondaryColor: "#FAE9F5",
  },
  {
    title: "Móvil",
    primaryColor: "#FFBA05",
    secondaryColor: "#FFF5D9",
  },
  {
    title: "Innovación y Gestión",
    primaryColor: "#FF8A29",
    secondaryColor: "#FFEEDF",
  },
];
// lista de colaboradores
const initialCollaborators = [
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

function App() {
  myContext({
    perro: "pitbull",
    gato: "siames",
  });
  // const all = myContext(useState);
  // console.log(all);
  // sebi("Sebi");

  // const $1 = myContext({ perro: "perro", gato: "" });
  // const $2 = myContext(["perro", "gato", "tucan"]);
  // const $3 = myContext({});
  // const $4 = myContext([]);
  // const $5 = myContext(useState);
  // const $6 = myContext(useState, []);
  // const $7 = myContext(useState, {});
  // const $8 = myContext(useState, { $8: "$8", $88: "$88" });
  // const xxx = myContext(useState, { $8: "$5", $88: "$55" });
  // const $9 = myContext(useState, ["$9", "$99"]);
  // const $10 = myContext();

  // console.log($1);
  // console.log($2);
  // console.log($3);
  // console.log($4);
  // console.log($5);
  // console.log($6);
  // console.log($7);
  // console.log($8);
  // console.log($9);
  // console.log($10);
  // // console.log(ic());

  // console.log($1.perro());
  // console.log($2.tucan());
  // console.log($3.get.gato);
  // console.log($4.get.tucan);
  // console.log($5.get.perro);
  // console.log($6.get.$8);
  // console.log($7.get.$88);
  // console.log($8.$8());
  // console.log($9.$9());
  // console.log($10.get);

  // useEffect(() => {
  //   $10.set();
  //   // $2.tucan();
  //   // $3.get.gato;
  //   // $4()
  //   // $5()
  //   // $6()
  //   // $7()
  //   // $8()
  //   // $9()
  //   // $10()
  // }, []);
  //
  const [showForm, setShowForm] = useState(false);
  const [collaborators, setCollaborators] = useState(initialCollaborators);
  const [teams, setTeams] = useState(initialTeams);
  const teamsNotEmpty = new Set(collaborators.map((collab) => collab.team));

  function handleShowForm() {
    setShowForm(!showForm);
  }

  function addCollaborator(newCollaborator) {
    setCollaborators([...collaborators, newCollaborator]);
  }

  function delCollaborator(collaboratorId) {
    setCollaborators(
      collaborators.filter((collab) => collaboratorId !== collab.id)
    );
  }

  function addTeam(newTeam) {
    // console.log(newTeam);
    setTeams([...teams, newTeam]);
  }

  function like(id) {
    setCollaborators(
      collaborators.map((collab) => {
        if (collab.id === id) collab.fav = !collab.fav;
        return collab;
      })
    );
  }

  return (
    <div className="App">
      <Header />
      {showForm && (
        <Form
          teams={teams}
          addCollaborator={addCollaborator}
          addTeam={addTeam}
        />
      )}
      <MiOrg handleShowForm={handleShowForm} />
      {teams.map(
        (team, index) =>
          teamsNotEmpty.has(team.title) && (
            <Team
              key={index}
              {...team}
              collaborators={collaborators}
              delCollaborator={delCollaborator}
              like={like}
            />
          )
      )}
      <Footer />
    </div>
  );
}

export default App;
