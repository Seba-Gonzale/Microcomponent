import "./App.css";
import Componente from "./Componente";
import utilizeGlobal from "./globalContext";

utilizeGlobal({ user: { user2: "Franco", user: "David" } });
// const keys = Object.keys;

function App() {
  return (
    <div className="App">
      <Componente user={"user"} />
      <Componente user={"user2"} />
    </div>
  );
}

export default App;
