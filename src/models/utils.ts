import { types } from "mobx-state-tree";

export type VariableValue = string | number;

export const createVariable = (defaultValue: VariableValue) =>
  types.optional(types.union(types.string, types.number), defaultValue);

export const createLiteral = (literal: string) =>
  types.optional(types.literal(literal), literal);
