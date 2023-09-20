import { _RECURSION_ } from "./uMicroC";

function checkIntegrity(_isRecursion, _originalList, _publicList) {
  if (_isRecursion !== _RECURSION_ && _originalList !== undefined) {
    Object.keys(_publicList).forEach((key) => {
      if (!(key in _originalList)) {
        delete _publicList[key];
      }
    });
  }
}

export default checkIntegrity;
