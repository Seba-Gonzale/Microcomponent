import { _RECURSION_ } from "./Microcomponents";

function checkIntegrity(_isRecursion, _originalList, _copyList) {
  if (_isRecursion !== _RECURSION_ && _originalList !== undefined) {
    Object.keys(_copyList).forEach((i) => {
      if (!(i in _originalList)) {
        delete _copyList[i];
      }
    });
  }
}

export default checkIntegrity;
