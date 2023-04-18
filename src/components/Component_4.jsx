import myContext from "@/utils/myContext";
import Component_5 from "./Component_5";
import { useState } from "react";

export default function Component_4() {
  //
  const { bColor4 } = myContext(useState, ["bColor4"]);
  return (
    <div
      className="Component_4 Component_"
      style={{ backgroundColor: bColor4() }}
    >
      <p className="Component__title">&quot; Component_4 &quot;</p>
      <Component_5 />
    </div>
  );
}
