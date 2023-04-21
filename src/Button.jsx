import { uGlobal_users } from "./App";
import uGlobal from "./globalContext";

function Button({ suscript }) {
  const { _get_, _set_ } = uGlobal_users([suscript]);

  return (
    <button
      type="button"
      onClick={() =>
        _set_({
          [suscript]: { ..._get_[suscript], name: "Alexis" },
        })
      }
    >
      Cambiar usuario
    </button>
  );
}

export default Button;
