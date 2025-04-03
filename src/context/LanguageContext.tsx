
import React, { createContext, useContext, ReactNode } from "react";
import russianTranslations, { Translations } from "@/translations/ru";

// Тип для контекста
type LanguageContextType = {
  language: string;
  t: (section: string, key: string) => string;
};

// Создание контекста
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Пропсы для провайдера
interface LanguageProviderProps {
  children: ReactNode;
}

// Компонент-провайдер для языкового контекста
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Язык теперь всегда "ru"
  const language = "ru";
  
  // Функция для получения перевода
  const t = (section: string, key: string): string => {
    if (russianTranslations[section] && russianTranslations[section][key]) {
      return russianTranslations[section][key];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Хук для использования языкового контекста
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
