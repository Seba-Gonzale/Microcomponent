import uMicroC, { NEW, _RECURSION_ } from "./Microcomponents";
import createProperties_v_mC from "./createProperties_v_mC";

function addToPublicDataObject(
  _key,
  g_dataList,
  g_publicDataList,
  g_mCRenderList
) {
  if (g_dataList[_key] instanceof Object) {
    const newMicroComp = uMicroC(NEW);
    const [newPublicData, newData] = newMicroComp(
      false,
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
    // g_dataList[_key] = newData;
  } else {
    Object.defineProperty(g_publicDataList, _key, {
      value: createProperties_v_mC(_key, g_dataList, g_mCRenderList),
      enumerable: true,
    });
  }
}

export default addToPublicDataObject;
