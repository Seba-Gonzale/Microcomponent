import uMicroC, { NEW, _RECURSION_ } from "./Microcomponents";
import createProperties_v_mC from "./createProperties_v_mC";
import createProperty_v from "./createProperty_v";

function addToPublicDataObject(
  _key,
  g_dataList,
  g_publicDataList,
  g_mCRenderList,
  _addStatus
) {
  if (g_dataList[_key] instanceof Object) {
    if (typeof _addStatus !== "boolean") {
      const newMicroComp = uMicroC(NEW);
      const [newPublicData, newData] = newMicroComp(
        null,
        g_dataList[_key],
        _RECURSION_
      );
      Object.defineProperty(g_publicDataList, _key, {
        value: newPublicData,
        enumerable: true,
      });
      Object.defineProperty(g_dataList, _key, {
        value: newData,
        enumerable: true,
      });
    } else {
      g_publicDataList[_key] = {};
      createProperty_v(g_publicDataList[_key], g_dataList[_key]);
    }
  } else {
    Object.defineProperty(g_publicDataList, _key, {
      value: createProperties_v_mC(_key, g_dataList, g_mCRenderList),
      enumerable: true,
    });
  }
}

export default addToPublicDataObject;
