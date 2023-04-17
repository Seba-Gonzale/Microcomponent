import myContext from "@/utils/myContext";
import { useState } from "react";

export default function Component_7() {
  //
  const [value, setValue] = useState("1");

  // Creamos un arreglo de strings con "bColor1", "bColor2", etc...
  const array_bColors = [];
  for (let i = 1; i < 8; i++) {
    array_bColors.push("bColor" + i);
  }

  // ! ****************AQUÍ ESTA LA MAGIA******************* */
  /**/ const bC = myContext(useState, array_bColors);
  /**/ const { unoParaTodos } = myContext(["unoParaTodos"]);
  // ? ***************************************************** */

  // Función para cambiar colores de otros componentes y en el que estamos
  function changeColor(_color) {
    const selectedComponent = document.querySelector("[data-select]").value;
    bC["bColor" + selectedComponent](_color);
  }

  return (
    <div
      className="Component_7 Component_"
      style={{ backgroundColor: bC.bColor7() }}
    >
      <p className="Component__title">&quot; Component_7 &quot;</p>
      <label htmlFor="color">Cambiar el color de algun componente</label>
      <br />
      <input
        type="color"
        name="color"
        onChange={(e) => changeColor(e.target.value)}
        data-color
      />
      <select
        onChange={(e) => changeColor(() => setValue(e.target.value))}
        defaultValue={value}
        data-select
      >
        <option value="2">Component_2</option>
        <option value="3">Component_3</option>
        <option value="4">Component_4</option>
        <option value="5">Component_5</option>
        <option value="6">Component_6</option>
        <option value="7">Component_7</option>
      </select>
      <br />
      <label className="Component_7__button" htmlFor="render">
        Abre la consola, limpiala y luego presiona para renderizar Component_1
      </label>
      <br />
      <button name="render" onClick={() => unoParaTodos(!unoParaTodos())}>
        renderizar Component_1
      </button>
    </div>
  );
}
