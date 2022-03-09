import { Formattable } from "./Formattable";


export type Formatter<T> = (fmt: Formattable<T>) => string[];
