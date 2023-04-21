import { useState } from "react";
import Button from "./Button.jsx";
import utilizeGlobal from "./globalContext";

function Componente(p_) {
  const uG = utilizeGlobal(useState, "user");
  return (
    <>
      <h1> Hola soy {uG.user[p_.user]()} </h1>
      <Button />
    </>
  );
}

export default Componente;
