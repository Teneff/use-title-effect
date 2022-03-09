import { useEffect, useMemo, useState } from "react";
import fmtr from "./formatter";
import { Options } from "./types/Options";

export const useTitleEffect = <Message>(
  title: string,
  {
    duration = 800,
    formatter = fmtr.message,
    messages = [],
  }: Options<Message> = {}
) => {
  const [messageIndex, setMessageIndex] = useState(0);

  const formatted = useMemo(
    () =>
      formatter({
        title,
        messages,
      }),
    [formatter, title, messages]
  );

  useEffect(() => {
    document.title = formatted[messageIndex];
  }, [formatted, messageIndex]);

  useEffect(() => {
    const intvId = formatted.length > 1 && setInterval(() => {
      setMessageIndex(
        messageIndex < formatted.length - 1 ? messageIndex + 1 : 0
      );
    }, duration);

    return () => {
      intvId && clearInterval(intvId);
    };
  }, [duration, formatted, setMessageIndex, messageIndex]);
};
