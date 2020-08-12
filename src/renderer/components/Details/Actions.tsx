import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProvided,
} from "react-beautiful-dnd";
import Action from "./Action";
import { Routine } from "../../models/Routines";
import { Instance } from "mobx-state-tree";
import { observer } from "mobx-react-lite";

type Props = {
  routine: Instance<typeof Routine>;
};

const DroppableParent = observer(
  ({ provided, routine }: { provided: DroppableProvided } & Props) => (
    <div
      className="space-y-2"
      {...provided.droppableProps}
      ref={provided.innerRef}
    >
      {routine.actions.map((action, index) => (
        <React.Fragment key={index}>
          <Draggable draggableId={String(index)} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <Action key={index} action={action} />
                {index !== routine.actions.length - 1 && (
                  <div
                    className="text-gray-400 flex justify-center font-semibold"
                    style={{ fontVariant: "small-caps" }}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="chevron-down w-8 h-8"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            )}
          </Draggable>
        </React.Fragment>
      ))}
      {provided.placeholder}
    </div>
  )
);

export default observer(({ routine }: Props) => {
  return (
    <>
      {routine.variables.length > 0 && (
        <div className="mb-2 rounded-md bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm leading-5 text-blue-700">
                The following variables are available in actions:{" "}
                {routine.variables.map((variable, i) => (
                  <span className="font-semibold">
                    ${variable}
                    {i !== routine.variables.length - 1 && ", "}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      )}

      <DragDropContext
        onDragEnd={(result) => {
          if (result.destination) {
            routine.reorderAction(
              result.source.index,
              result.destination.index
            );
          }
        }}
      >
        <Droppable droppableId="actions">
          {(provided) => (
            <DroppableParent provided={provided} routine={routine} />
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
});
