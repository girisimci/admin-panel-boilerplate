import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationTR from "@/translations/tr.json"
import translationEN from "@/translations/en.json"

const resources = {
  en: { translation: translationEN },
  tr: { translation: translationTR },
};

i18n
  .use(LanguageDetector) // Tarayıcı dilini algılar
  .use(initReactI18next) // React entegrasyonu
  .init({
    resources,
    fallbackLng: "en", // Dil bulunamazsa varsayılan olarak İngilizce kullanılır
    interpolation: { escapeValue: false }, // React için gerekli
  });

export default i18n;
