import myContext from "@/utils/myContext";
import Component_4 from "./Component_4";
import { useState } from "react";

export default function Component_3() {
  //
  const { bColor3 } = myContext(useState, ["bColor3"]);

  return (
    <div
      className="Component_3 Component_"
      style={{ backgroundColor: bColor3() }}
    >
      <p className="Component__title">&quot; Component_3 &quot;</p>
      <Component_4 />
    </div>
  );
}
