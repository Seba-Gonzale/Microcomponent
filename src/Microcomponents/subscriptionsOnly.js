import { useState } from "react";
function CreateStatusClip() {
  try {
    const [, stateFunction] = useState();
    return stateFunction;
  } catch (error) {}
}
function subscriptionsOnly(data, g_cRenderList, g_dataList) {
  if (typeof data[0] === "string" || typeof data[0] === "number") {
    //
    const validData = data.filter(
      (value) =>
        (typeof value === "string" || typeof value === "number") &&
        value in g_dataList
    );
    if (validData.length !== 0) {
      const stateClip = CreateStatusClip();
      if (stateClip !== undefined) {
        validData.forEach((value) => {
          if (value in g_cRenderList) {
            g_cRenderList[value].add(stateClip);
          } else {
            g_cRenderList[value] = new Set([stateClip]);
          }
        });
      }
    }
  } else {
    console.error("The parameters to be subscribed are not found in the list");
  }
}

export default subscriptionsOnly;
