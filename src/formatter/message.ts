import { Formatter } from "../types/Formatter";

export const message: Formatter<string | { toString: () => string }> = ({
  title,
  messages,
}): string[] => [
  `${messages.length ? `(${messages.length}) ` : ""}${title}`,
  ...messages.map((x) => `${x}`),
];
