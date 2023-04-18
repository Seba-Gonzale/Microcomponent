import { useState } from "react";
import Component_2 from "./Component_2";
import myContext from "@/utils/myContext";

export default function Component_1() {
  myContext({ bColor7: "blue" });

  const { unoParaTodos } = myContext(useState, { unoParaTodos: false });

  console.log("hola soy COMPONENT_1, me he renderizado!");
  console.log("unoParaTodos es: " + unoParaTodos());

  return (
    <div className="Component_1">
      <h1 className="Component_1__title">myContext</h1>
      <p className="Component_1__description">
        No <b>useContext</b>, no <b>Props</b>, no <b>useMemo</b>
      </p>
      <p className="Component_1__description">
        more readable, faster, easier
      </p>
      <p className="Component__title">&quot; Component_1 &quot;</p>
      <Component_2 />
    </div>
  );
}
