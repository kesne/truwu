import React from "react";
import { observer } from "mobx-react-lite";
import useRoutines from "./useRoutines";

export default observer(() => {
  const routines = useRoutines();

  console.log(routines);

  return <div>{routines.map((routine) => routine.name)}</div>;
});
