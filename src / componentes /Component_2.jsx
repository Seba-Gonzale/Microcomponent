import myContext from "@/utils/myContext";
import Component_3 from "./Component_3";
import { useState } from "react";

export default function Component_2() {

  const { bColor2 } = myContext(useState, ["bColor2"]);

  return (
    <div
      className="Component_2 Component_"
      style={{ backgroundColor: bColor2() }}
    >
      <p className="Component__title">&quot; Component_2 &quot;</p>
      <Component_3 />
    </div>
  );
}
