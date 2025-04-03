
import React, { createContext, useState, useContext, ReactNode } from "react";

// Определение типов для языковых строк
type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

// Объект с переводами
const translations: Translations = {
  // Общие строки для всего приложения
  common: {
    home: {
      en: "Home",
      ru: "Главная"
    },
    anime: {
      en: "Anime",
      ru: "Аниме"
    },
    personalityTests: {
      en: "Personality Tests",
      ru: "Психологические тесты"
    },
    signIn: {
      en: "Sign in",
      ru: "Войти"
    },
    signUp: {
      en: "Sign up",
      ru: "Регистрация"
    },
    profile: {
      en: "Profile",
      ru: "Профиль"
    },
    favorites: {
      en: "Favorites",
      ru: "Избранное"
    },
    dashboard: {
      en: "Dashboard",
      ru: "Панель управления"
    },
    settings: {
      en: "Settings",
      ru: "Настройки"
    },
    logOut: {
      en: "Log out",
      ru: "Выйти"
    }
  },
  // Строки для страницы тестов
  tests: {
    title: {
      en: "Psychological Tests",
      ru: "Психологические тесты"
    },
    description: {
      en: "Discover your personality traits and get personalized anime recommendations based on your psychological profile.",
      ru: "Узнайте свои личностные черты и получите персонализированные рекомендации аниме на основе вашего психологического профиля."
    },
    allTests: {
      en: "All Tests",
      ru: "Все тесты"
    },
    startTest: {
      en: "Start Test",
      ru: "Начать тест"
    },
    duration: {
      en: "minutes",
      ru: "минут"
    },
    questions: {
      en: "questions",
      ru: "вопросов"
    },
    popular: {
      en: "Popular",
      ru: "Популярный"
    }
  },
  // Категории тестов
  categories: {
    Personality: {
      en: "Personality",
      ru: "Личность"
    },
    Preferences: {
      en: "Preferences",
      ru: "Предпочтения"
    },
    Affinity: {
      en: "Affinity",
      ru: "Сходство"
    },
    Mood: {
      en: "Mood",
      ru: "Настроение"
    },
    Cognitive: {
      en: "Cognitive",
      ru: "Когнитивный"
    }
  },
  // Строки для теста
  test: {
    question: {
      en: "Question",
      ru: "Вопрос"
    },
    next: {
      en: "Next",
      ru: "Далее"
    },
    previous: {
      en: "Previous",
      ru: "Назад"
    },
    submit: {
      en: "Submit",
      ru: "Отправить"
    }
  },
  // Результаты теста
  results: {
    title: {
      en: "Your Test Results",
      ru: "Результаты вашего теста"
    },
    recommendations: {
      en: "Your Anime Recommendations",
      ru: "Рекомендации аниме для вас"
    }
  }
};

// Поддерживаемые языки
export type Language = "en" | "ru";

// Тип для контекста
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
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
  // Проверяем сохраненный язык в localStorage или используем английский по умолчанию
  const savedLanguage = localStorage.getItem("language") as Language;
  const [language, setLanguage] = useState<Language>(savedLanguage || "en");

  // Функция для установки языка и сохранения в localStorage
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  // Функция для получения перевода
  const t = (section: string, key: string): string => {
    if (translations[section] && translations[section][key]) {
      return translations[section][key][language] || translations[section][key]["en"];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
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
