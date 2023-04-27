import uMicroC, { NEW, _RECURSION_ } from "./Microcomponents";
import createProperties_v_mC from "./createProperties_v_mC";

function addToPublicDataArray(
  _i,
  g_dataList,
  g_publicDataList,
  g_mCRenderList
) {
  if (g_dataList[_i] instanceof Object) {
    const newMicroComp = uMicroC(NEW);
    const [newPublicData, newData] = newMicroComp(
      false,
      g_dataList[_i],
      _RECURSION_
    );
    g_publicDataList[_i] = newPublicData;
    g_dataList[_i] = newData;
    // });
  } else {
    g_publicDataList[_i] = createProperties_v_mC(
      _i,
      g_dataList,
      g_mCRenderList
    );
  }
}

export default addToPublicDataArray;
