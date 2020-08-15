import { useEffect, useReducer } from "react";

export type QueueType = Array<any>;

export type ReducerStateType = {
  isProcessing: boolean;
  queue: QueueType;
};

export type ReducerActionType = {
  type: string;
  payload?: any;
};

export function reducer(state: ReducerStateType, action: ReducerActionType) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        queue: [...state.queue, action.payload],
      };
    case "PROCESSING":
      return {
        ...state,
        isProcessing: true,
      };

    case "PROCESSED":
      return {
        isProcessing: false,
        queue: state.queue.slice(1),
      };
    default:
      return state;
  }
}

type ProcessFnType = (item: any, done: () => void) => void;

const useQueue = (process: ProcessFnType) => {
  const initialState: ReducerStateType = {
    isProcessing: false,
    queue: [],
  };
  const [{ isProcessing, queue }, dispatch] = useReducer(reducer, initialState);

  function add(payload: any) {
    dispatch({
      type: "ADD",
      payload,
    });
  }

  useEffect(() => {
    if (typeof process !== "function") return;

    if (queue.length > 0 && !isProcessing) {
      dispatch({
        type: "PROCESSING",
      });
      process(queue[0], () => {
        dispatch({
          type: "PROCESSED",
        });
      });
    }
  }, [queue, isProcessing]);

  return [queue, add];
};

export default useQueue;
