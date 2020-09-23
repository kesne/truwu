import React from "react";
import { observer } from "mobx-react-lite";
import useRoutines from "./useRoutines";
import Header from "../Header";
import Routine from "./Routine";
import ActionsBar from "../ActionsBar";

export default observer(() => {
  const [routines, completeRoutine] = useRoutines();

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header title="Listening...">
        <ActionsBar />
      </Header>
      <div className="mt-4">
        {routines.map((routineTrigger) => (
          <Routine
            key={routineTrigger.id}
            routineTrigger={routineTrigger}
            onDone={() => completeRoutine(routineTrigger.id)}
          />
        ))}
      </div>
    </div>
  );
});
