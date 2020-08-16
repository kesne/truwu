import template from "lodash/template";

export default function resolveString(
  source: string,
  variables: Record<string, any>
) {
  const compiled = template(source, {
    interpolate: /\$([A-Za-z0-9]+)/g,
  });

  return compiled(
    Object.fromEntries(
      Object.entries(variables).map(([key, value]) => [key.slice(1), value])
    )
  );
}
