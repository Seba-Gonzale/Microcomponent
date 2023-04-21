import { uGlobal_users } from "./App.js";
import Button from "./Button.jsx";
import uGlobal from "./globalContext";

function Componente({ suscript }) {
  const { _get_ } = uGlobal_users(true, [suscript]);
  console.log(suscript);
  return (
    <>
      <h1> Hola soy {_get_[suscript].name} </h1>
      <Button suscript={suscript} />
    </>
  );
}

export default Componente;
