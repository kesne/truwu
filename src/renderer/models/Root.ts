import { types } from "mobx-state-tree";

import { Settings } from "./Settings";
import { Routines } from "./Routines";

export const RootModel = types.model({
  settings: Settings,
  routines: Routines,
});
