import type { LocalizedText, SupportedLanguageCode } from "@/types";

export function getLocalizedText(
  text: LocalizedText,
  language: SupportedLanguageCode = "en",
): string {
  return text[language] ?? text.en;
}
