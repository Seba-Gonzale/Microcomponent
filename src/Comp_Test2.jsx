import { uM_test1 } from "./Comp_Test3";

const collaborators = uM_test1();

export default function CompTest2() {
  uM_test1(collaborators);
  console.log("hola");
  return (
    <>
      <div
        style={{ width: "100%", height: "100px", backgroundColor: "orange" }}
        onClick={() => console.log((collaborators[0].id.v = 123123))}
      >
        id={collaborators[0].id.mC}
        id={collaborators[0].id.v}
      </div>
      <div
        onClick={() => (collaborators[0].id.v = 789789)}
        style={{ width: "100%", height: "20px" }}
      ></div>
    </>
  );
}
