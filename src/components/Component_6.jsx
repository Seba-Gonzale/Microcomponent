import myContext from "@/utils/myContext";
import Component_7 from "./Component_7";
import { useState } from "react";

export default function Component_6() {
  //
  const { bColor6 } = myContext(useState, ["bColor6"]);
  return (
    <div
      className="Component_6 Component_"
      style={{ backgroundColor: bColor6() }}
    >
      <p className="Component__title">&quot; Component_6 &quot;</p>
      <Component_7 />
    </div>
  );
}
