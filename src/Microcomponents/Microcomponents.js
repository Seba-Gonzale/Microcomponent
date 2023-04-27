import validateSubscribers from "./validateSubscribers";
import addNewValues from "./addNewValues";
import inicializeVariables from "./inicializeVariables";
import createProperty_v from "./createProperty_v";
import subscriptionsOnly from "./subscriptionsOnly";
import renderValues from "./renderValues";
import checkIntegrity from "./checkIntegrity";

export const NEW = "N*-_#$E*-_%W1+}";
export const _RECURSION_ = "-*/g_dataList-*/";

function createListOfMicrocomponents() {
  let g_dataList;
  let g_publicDataList;
  // * Es obligatorio inicializar como objeto
  let g_mCRenderList = {};
  // * Es obligatorio inicializar como objeto
  let g_cRenderList = {};

  function uMicroC(..._data) {
    let render = true;

    function requestRendering(..._indices) {
      renderValues(_indices, { ...g_dataList }, g_cRenderList);
    }

    function wantToStayUpdated(_data, _render) {
      if (typeof _data[0] === "boolean" && _data[0] === false) {
        _render = _data[0];
        _data.shift();
      }
      return _render;
    }

    checkIntegrity(_data[_data.length - 1], g_dataList, g_publicDataList);

    if (_data.length === 0) return g_publicDataList;
    if (_data[0] === NEW) return createListOfMicrocomponents();
    render = wantToStayUpdated(_data, render);

    const validSubscribers = validateSubscribers(_data[0]);
    if (validSubscribers) {
      //
      if (g_dataList === undefined) {
        //
        g_dataList = inicializeVariables(validSubscribers);
        g_publicDataList = inicializeVariables(validSubscribers);
        if (_data[_data.length - 1] !== _RECURSION_) {
          Object.defineProperty(g_publicDataList, "_set_", {
            value: requestRendering,
          });
          Object.defineProperty(g_publicDataList, "_get_", {
            value: () => g_dataList,
          });
        }
      }
      addNewValues(
        validSubscribers,
        g_dataList,
        g_publicDataList,
        g_mCRenderList
      );
      if (render) {
        subscriptionsOnly(
          Object.keys(validSubscribers),
          g_cRenderList,
          g_dataList
        );
      }
    } else if (_data[0] instanceof Object) {
      if (g_dataList === undefined) {
        g_dataList = _data[0];
        g_publicDataList = {};
        createProperty_v(g_publicDataList, g_dataList);
      } else {
        console.error("Cannot convert object!");
      }
    } else {
      subscriptionsOnly(_data, g_cRenderList, g_dataList);
    }

    if (_data[_data.length - 1] === _RECURSION_) {
      return [g_publicDataList, g_dataList];
    } else {
      return g_publicDataList;
    }
  }

  return uMicroC;
}
const uMicroC = createListOfMicrocomponents();

export default uMicroC;
