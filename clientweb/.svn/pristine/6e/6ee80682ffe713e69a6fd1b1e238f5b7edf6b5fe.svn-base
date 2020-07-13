import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import languages from "./languages/index";

export const initLanguage = (language) => ({
    // we init with resources
    resources: Object.freeze(languages),
    fallbackLng: "vi",
    lng: language || "vi",
    debug: false,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false
    }
})

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(initLanguage());

export default i18n;

