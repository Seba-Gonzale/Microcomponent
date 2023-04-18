import myContext from "@/utils/myContext";
import Component_6 from "./Component_6";
import { useState } from "react";

export default function Component_5() {
  //

  const { bColor5 } = myContext(useState, ["bColor5"]);
  return (
    <div
      className="Component_5 Component_"
      style={{ backgroundColor: bColor5() }}
    >
      <p className="Component__title">&quot; Component_5 &quot;</p>
      <Component_6 />
    </div>
  );
}
