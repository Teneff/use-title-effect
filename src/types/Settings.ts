import { Formatter } from "../formatter";

export type Settings<T> = {
  duration: number;
  formatter: Formatter<T>;
  messages: T[];
};
