function Componente2({ obj }) {
  return (
    <>
      <h1> Hola soy {obj.name.mC} </h1>
      <Button2 name={obj.name} />
    </>
  );
}

function Button2({ name }) {
  return <button onClick={() => (name.mC = "William")}>Haz Click!</button>;
}

export default Componente2;
