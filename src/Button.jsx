import utilizeGlobal from "./globalContext";

function Button() {
  const uG = utilizeGlobal(["user"]);
  // utilizeGlobal("debug");

  return (
    <button
      type="button"
      onClick={() => uG._set_({ user2: "Franco", user: "javier" })}
    >
      Cambiar usuario
    </button>
  );
}

export default Button;
