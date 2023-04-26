import { useState } from "react";

function CreateStatusClip() {
  const [v, stateFunction] = useState();
  return stateFunction;
}
// ! revisa que no se suscriban suscriptoresValidos repetidos en g_publicDataList
// ! revisa si puedes usar un solo useState para todos lo que usen el valor
function subscriptionsOnly(_data, g_cRenderList, _dataList) {
  if (typeof _data[0] === "string" || typeof _data[0] === "number") {
    //
    const validData = _data.filter(
      (value) =>
        (typeof value === "string" || typeof value === "number") &&
        value in _dataList
    );
    if (validData.length !== 0) {
      const stateClip = CreateStatusClip();
      validData.forEach((value) => {
        if (value in g_cRenderList) {
          g_cRenderList[value].add(stateClip);
        } else {
          g_cRenderList[value] = new Set([stateClip]);
        }
      });
      return true;
    }
  }
  return false;
}

export default subscriptionsOnly;
