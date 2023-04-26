import validateSubscribers from "./validateSubscribers";
import addNewValues from "./addNewValues";
import inicializeVariables from "./inicializeVariables";
import createProperty_v from "./createProperty_v";
import subscriptionsOnly from "./subscriptionsOnly";
import renderValues from "./renderValues";

export const _NEW_ = "N*-_#$E*-_%W1+}";
export const _SUPER_ = "-*/g_dataList-*/";

function createListOfMicrocomponents() {
  let g_dataList;
  let g_publicDataList;
  // * Es obligatorio inicializar como objeto
  let g_mCRenderList = {};
  // * Es obligatorio inicializar como objeto
  let g_cRenderList = {};
  let g_parentList;

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

    if (_data.length === 0) return g_publicDataList;
    if (_data[0] === _NEW_) return createListOfMicrocomponents();
    render = wantToStayUpdated(_data, render);

    const validSubscribers = validateSubscribers(_data[0]);
    if (validSubscribers) {
      //
      if (g_dataList === undefined) {
        //
        g_dataList = inicializeVariables(validSubscribers);
        g_publicDataList = inicializeVariables(validSubscribers);
        if (!(_SUPER_ in _data[_data.length - 1])) {
          Object.defineProperty(g_publicDataList, "_set_", {
            value: requestRendering,
          });
          Object.defineProperty(g_publicDataList, "_get_", {
            value: g_dataList,
          });
          g_parentList = g_dataList;
        } else {
          g_parentList = _data[_data.length - 1][_SUPER_];
        }
      }
      addNewValues(
        validSubscribers,
        g_dataList,
        g_publicDataList,
        g_mCRenderList,
        g_parentList
      );
      if (render) {
        subscriptionsOnly(
          Object.keys(validSubscribers),
          g_cRenderList,
          g_dataList
        );
      }
      return g_publicDataList;
    } else {
      if (_data[0] instanceof Object) {
        g_dataList = _data[0];
        g_publicDataList = {};
        createProperty_v(g_publicDataList, g_dataList);
        return g_publicDataList;
      }
    }

    if (subscriptionsOnly(_data, g_cRenderList, g_dataList)) {
      return g_publicDataList;
    }
  }

  return uMicroC;
}
const uMicroC = createListOfMicrocomponents();

export default uMicroC;
