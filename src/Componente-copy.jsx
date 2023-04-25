import { v4 } from "uuid";

function Componente2({ obj }) {
  return (
    <>
      <h1> Hola soy {obj.name.mC} </h1>
      <button onClick={() => (obj.name.mC = v4())}>Haz Click!</button>
    </>
  );
}
export default Componente2;
