import React from "react";
import { observer } from "mobx-react-lite";
import { motion, AnimatePresence } from "framer-motion";
import useRoutines from "./useRoutines";
import Header from "../Header";
import Routine from "./Routine";

export default observer(() => {
  const [routines, completeRoutine] = useRoutines();

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header title="Listening..." />
      <div className="mt-4">
        <motion.ul className="space-y-2" layout>
          <AnimatePresence>
            {routines.map((routineTrigger) => (
              <Routine
                key={routineTrigger.id}
                routineTrigger={routineTrigger}
                onDone={() => completeRoutine(routineTrigger.id)}
              />
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </div>
  );
});
