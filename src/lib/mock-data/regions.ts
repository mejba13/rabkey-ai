export interface Region {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  locale: string;
}

export const regions: Region[] = [
  { code: "US", name: "United States", currency: "USD", currencySymbol: "$", locale: "en-US" },
  { code: "EU", name: "Europe", currency: "EUR", currencySymbol: "\u20ac", locale: "en-EU" },
  { code: "GB", name: "United Kingdom", currency: "GBP", currencySymbol: "\u00a3", locale: "en-GB" },
  { code: "CA", name: "Canada", currency: "CAD", currencySymbol: "CA$", locale: "en-CA" },
  { code: "AU", name: "Australia", currency: "AUD", currencySymbol: "A$", locale: "en-AU" },
  { code: "BR", name: "Brazil", currency: "BRL", currencySymbol: "R$", locale: "pt-BR" },
  { code: "JP", name: "Japan", currency: "JPY", currencySymbol: "\u00a5", locale: "ja-JP" },
  { code: "KR", name: "South Korea", currency: "KRW", currencySymbol: "\u20a9", locale: "ko-KR" },
  { code: "RU", name: "Russia", currency: "RUB", currencySymbol: "\u20bd", locale: "ru-RU" },
  { code: "IN", name: "India", currency: "INR", currencySymbol: "\u20b9", locale: "hi-IN" },
  { code: "TR", name: "Turkey", currency: "TRY", currencySymbol: "\u20ba", locale: "tr-TR" },
  { code: "AR", name: "Argentina", currency: "ARS", currencySymbol: "AR$", locale: "es-AR" },
  { code: "MX", name: "Mexico", currency: "MXN", currencySymbol: "MX$", locale: "es-MX" },
  { code: "PL", name: "Poland", currency: "PLN", currencySymbol: "z\u0142", locale: "pl-PL" },
  { code: "CN", name: "China", currency: "CNY", currencySymbol: "\u00a5", locale: "zh-CN" },
  { code: "DE", name: "Germany", currency: "EUR", currencySymbol: "\u20ac", locale: "de-DE" },
  { code: "FR", name: "France", currency: "EUR", currencySymbol: "\u20ac", locale: "fr-FR" },
  { code: "IT", name: "Italy", currency: "EUR", currencySymbol: "\u20ac", locale: "it-IT" },
  { code: "ES", name: "Spain", currency: "EUR", currencySymbol: "\u20ac", locale: "es-ES" },
  { code: "SE", name: "Sweden", currency: "SEK", currencySymbol: "kr", locale: "sv-SE" },
];

export const regionMap = new Map(regions.map(r => [r.code, r]));
export const defaultRegion = regions[0]; // US
