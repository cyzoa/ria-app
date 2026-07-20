import type { SpeechStyle } from "@/types/database";

export type SpeechStyleCopy<T = string> = Record<SpeechStyle, T>;

export type MessageVariables = Record<string, string | number>;

export interface CountMessage {
  one: string;
  few: string;
  many: string;
  other: string;
}

export function getSpeechStyleCopy<T>(copy: SpeechStyleCopy<T>, style: SpeechStyle): T {
  return copy[style];
}

export function formatMessage(template: string, variables: MessageVariables): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(variables, key) ? String(variables[key]) : match
  );
}

export function formatCountMessage(
  message: CountMessage,
  count: number,
  intlLocale = "ko-KR"
): string {
  const category = new Intl.PluralRules(intlLocale).select(count);
  const template =
    category === "one" || category === "few" || category === "many"
      ? message[category]
      : message.other;

  return formatMessage(template, { count });
}

export type WidenDictionary<T> = T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? readonly WidenDictionary<Item>[]
    : T extends object
      ? { [Key in keyof T]: WidenDictionary<T[Key]> }
      : T;
