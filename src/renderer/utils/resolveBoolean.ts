import Parser from "morph-expressions";

var parser = new Parser();
parser.registerFunction("max", Math.max);
parser.registerFunction("min", Math.min);
parser.registerFunction("random", Math.random);
parser.registerFunction("round", Math.round);
parser.registerFunction("floor", Math.floor);

export default function resolveBoolean(
  source: string,
  variables: Record<string, any>
) {
  const template = parser.parse(String(source));
  const value = template.eval(variables);
  return Boolean(value);
}
