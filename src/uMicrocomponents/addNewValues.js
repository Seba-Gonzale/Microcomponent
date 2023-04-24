function addNewValues(_validSubscribers, _dataList) {
  //
  if (!Array.isArray(_validSubscribers)) {
    if (!Array.isArray(_dataList)) {
      //
      const aux_object = Object.keys(_validSubscribers).reduce(
        (acc_dList, key) => {
          if (!(key in acc_dList)) {
            // se añade la nueva propiedad a acc_dList
            acc_dList = { ...acc_dList, [key]: _validSubscribers[key] };
            // se añade la nueva propiedad a g_publicDataList
          }
          return acc_dList;
        },
        _dataList
      );

      return aux_object;
    } else {
      throw new Error(
        "Data object syntax does not work on a channel declared as a data array"
      );
    }
  } else {
    if (!Array.isArray(_dataList)) {
      if (Object.keys(_dataList).length === 0) {
        return _validSubscribers;
      } else {
        throw new Error(
          "Data array syntax does not work on a channel declared as a data object"
        );
      }
    } else {
      return [..._dataList, ..._validSubscribers];
    }
  }
  //
}

export { addNewValues };
