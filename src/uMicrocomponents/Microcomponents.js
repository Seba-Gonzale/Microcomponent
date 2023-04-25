// import { useState } from "react";
import { validateSubscribers } from "./validateSubscribers";
import { addNewValues } from "./addNewValues";
import { addNewConsumableValues } from "./addNewConsumableValues";
import inicializeVariables from "./inicializeVariables";
import { useState } from "react";
import addConsumableObject from "../addConsumableObject";
import subscriptionsOnly from "./subscriptionsOnly";

function createListOfMicrocomponents() {
  let g_dataList;
  let g_publicDataList;
  // * Es obligatorio inicializar como objeto
  let g_mCRenderList = {};
  // * Es obligatorio inicializar como objeto
  let g_cRenderList = {};

  function uMicrocomponents(..._data) {
    let render = [true];

    function CreateStatusClip() {
      const [v, stateFunction] = useState();
      return stateFunction;
    }

    function renderValues(..._data) {
      if (typeof _data[0] === "string" || typeof _data[0] === "number") {
        const validData = _data.filter(
          (value) =>
            (typeof value === "string" || typeof value === "number") &&
            value in g_cRenderList
        );
        if (validData.length !== 0) {
          let aux_list = [];
          validData.forEach((value) => {
            aux_list = [...aux_list, ...g_cRenderList[value]];
          });
          const aux_set = new Set(aux_list);
          console.log(aux_set);
          [...aux_set].forEach((fx) => {
            fx(1);
          });
          return true;
        }
      }
      return false;
    }

    function wantToStayUpdated(_data, _render) {
      if (typeof _data[0] === "boolean") {
        _render[0] = _data[0];
        return _data.shift();
      }
    }

    if (_data.length === 0) return g_publicDataList;
    if (_data[0] === _NEW_) return createListOfMicrocomponents();
    wantToStayUpdated(_data, render);

    const validSubscribers = validateSubscribers(_data[0]);

    if (validSubscribers) {
      if (g_dataList === undefined) {
        g_dataList = inicializeVariables(validSubscribers);
        g_publicDataList = inicializeVariables(validSubscribers);
        if (_data[_data.length - 1] !== false)
          Object.defineProperty(g_publicDataList, "_set_", {
            value: renderValues,
          });
      }
      addNewValues(validSubscribers, g_dataList);
      addNewConsumableValues(g_publicDataList, g_dataList, g_mCRenderList);
      if (render[0]) {
        subscriptionsOnly(
          Object.keys(validSubscribers),
          g_cRenderList,
          g_dataList,
          CreateStatusClip
        );
      }
      return g_publicDataList;
    } else {
      if (_data[0] instanceof Object) {
        g_dataList = _data[0];
        g_publicDataList = {};
        addConsumableObject(g_publicDataList, g_dataList);
        return g_publicDataList;
      }
    }

    if (subscriptionsOnly(_data, g_cRenderList, g_dataList, CreateStatusClip)) {
      return g_publicDataList;
    }
  }

  return uMicrocomponents;
}
const uMicrocomponents = createListOfMicrocomponents();

export const _NEW_ = "N*-_#$E*-_%Wñ1+}";
export default uMicrocomponents;
