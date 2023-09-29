import validateSubscribers from "./validateSubscribers";
import addNewValues from "./addNewValues";
import inicializeVariables from "./inicializeVariables";
import createProperty_v from "./createProperty_v";
import subscriptionsOnly from "./subscriptionsOnly";
import renderValues from "./renderValues";
import checkIntegrity from "./checkIntegrity";
// import storageAvailable from "./storageAvailable";

export const NEW = "N*-_#$E*-_%W1+}";
export const _RECURSION_ = "-*/g_dataList-*/";

function createListOfMicrocomponents() {
  // console.log(storageAvailable("sessionStorage"));
  let g_dataList;
  let g_publicDataList;
  // * Es obligatorio inicializar como objeto
  let g_mCRenderList = {};
  // * Es obligatorio inicializar como objeto
  let g_cRenderList = {};

  function uMicroC(...data) {
    let addStatus;

    function requestRendering(..._indices) {
      renderValues(_indices, { ...g_dataList }, g_cRenderList);
    }

    function wantToStayUpdated(data) {
      const addStatus = data[0];
      if (addStatus === null) {
        data.shift();
        return null;
      } else if (typeof addStatus === "boolean" && addStatus === true) {
        data.shift();
        return true;
      } else if (typeof addStatus === "boolean" && addStatus === false) {
        data.shift();
        return false;
      }
    }

    checkIntegrity(data[data.length - 1], g_dataList, g_publicDataList);

    if (data.length === 0) return g_publicDataList;
    if (data[0] === NEW) return createListOfMicrocomponents();
    addStatus = wantToStayUpdated(data);

    const validSubscribers = validateSubscribers(data[0]);
    if (validSubscribers) {
      //
      if (g_dataList === undefined) {
        //
        g_dataList = inicializeVariables(validSubscribers);
        g_publicDataList = inicializeVariables(validSubscribers);
        if (data[data.length - 1] !== _RECURSION_) {
          Object.defineProperty(g_publicDataList, "_set_", {
            value: requestRendering,
          });
          Object.defineProperty(g_publicDataList, "_get_", {
            value: (key) => (key === undefined ? g_dataList : g_dataList[key]),
          });
        }
      }
      addNewValues(
        validSubscribers,
        g_dataList,
        g_publicDataList,
        g_mCRenderList,
        addStatus
      );
      if (addStatus || addStatus === undefined) {
        subscriptionsOnly(
          Object.keys(validSubscribers),
          g_cRenderList,
          g_dataList
        );
      }
    } else if (data[0] instanceof Object) {
      if (g_dataList === undefined) {
        g_dataList = data[0];
        g_publicDataList = {};
        createProperty_v(g_publicDataList, g_dataList);
      } else {
        console.error("Cannot convert object!");
      }
    } else {
      subscriptionsOnly(data, g_cRenderList, g_dataList);
    }

    if (data[data.length - 1] === _RECURSION_) {
      return [g_publicDataList, g_dataList];
    } else {
      return g_publicDataList;
    }
  }

  return uMicroC;
}
const uMicroC = createListOfMicrocomponents();

export default uMicroC;
