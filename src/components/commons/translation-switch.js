import { useTranslation } from "react-i18next";
import { useState } from "react";

const TranslationSwitch = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("tr"); // Varsayılan dil Türkçe

  const languages = {
    en: {
      label: "English",
      flag: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
          <rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#fff"></rect>
          <path fill="#be2a2a" d="M31 14L18 14 18 4 14 4 14 14 1 14 1 18 14 18 14 28 18 28 18 18 31 18 31 14z"></path>
        </svg>
      ),
    },
    tr: {
      label: "Türkçe",
      flag: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
          <rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#d12d24"></rect>
          <path fill="#fff" d="M19.807 16L21 14.358 19.069 14.985 17.876 13.342 17.876 15.373 15.945 16 17.876 16.627 17.876 18.658 19.069 17.015 21 17.642 19.807 16z"></path>
          <path d="M15.953,19.325c-1.837,1.65-4.663,1.5-6.314-.337s-1.5-4.663,.337-6.314c1.837-1.65,4.663-1.5,6.314,.337-.442-.699-1.035-1.292-1.734-1.734-2.608-1.65-6.06-.874-7.711,1.734-1.65,2.608-.874,6.06,1.734,7.711,2.608,1.65,6.06,.874,7.711-1.734-.106,.118-.219,.231-.337,.337Z" fill="#fff"></path>
        </svg>
      ),
    },
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      >
        {languages[selectedLanguage].flag}
        <span className="ml-2">{languages[selectedLanguage].label}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {Object.keys(languages).map((lng) => (
              <button
                key={lng}
                onClick={() => changeLanguage(lng)}
                className="flex items-center gap-2  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                {languages[lng].flag}
                <span>{languages[lng].label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TranslationSwitch;
