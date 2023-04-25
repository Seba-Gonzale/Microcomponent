function addConsumableObject(g_publicDataList, g_dataList) {
  Object.defineProperties(g_publicDataList, {
    value: {
      get: () => g_dataList,
      set: (value) => (g_dataList = value),
    },
    v: {
      get: () => g_dataList,
      set: (value) => (g_dataList = value),
    },
  });
}

export default addConsumableObject;
