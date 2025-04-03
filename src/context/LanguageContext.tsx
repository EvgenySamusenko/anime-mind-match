
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
    },
    notFound: {
      en: "404 - Page Not Found",
      ru: "404 - Страница не найдена"
    },
    returnHome: {
      en: "Return to Home",
      ru: "Вернуться на главную"
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
  },
  // Авторизация и регистрация
  auth: {
    login: {
      en: "Log in to your account",
      ru: "Вход в учетную запись"
    },
    email: {
      en: "Email",
      ru: "Электронная почта"
    },
    password: {
      en: "Password",
      ru: "Пароль"
    },
    loginButton: {
      en: "Sign in",
      ru: "Войти"
    },
    forgotPassword: {
      en: "Forgot password?",
      ru: "Забыли пароль?"
    },
    noAccount: {
      en: "Don't have an account?",
      ru: "Нет учетной записи?"
    },
    createAccount: {
      en: "Create an account",
      ru: "Создать учетную запись"
    },
    register: {
      en: "Create an account",
      ru: "Создание учетной записи"
    },
    confirmPassword: {
      en: "Confirm password",
      ru: "Подтверждение пароля"
    },
    registerButton: {
      en: "Sign up",
      ru: "Зарегистрироваться"
    },
    hasAccount: {
      en: "Already have an account?",
      ru: "Уже есть учетная запись?"
    },
    resetPassword: {
      en: "Reset your password",
      ru: "Сброс пароля"
    },
    resetInfo: {
      en: "Enter your email address below and we'll send you a link to reset your password.",
      ru: "Введите вашу электронную почту, и мы отправим ссылку для сброса пароля."
    },
    resetButton: {
      en: "Send reset link",
      ru: "Отправить ссылку"
    },
    backToLogin: {
      en: "Back to login",
      ru: "Вернуться к входу"
    }
  },
  // Профиль пользователя
  profile: {
    createProfile: {
      en: "Create Your Profile",
      ru: "Создание профиля"
    },
    profileSettings: {
      en: "Profile Settings",
      ru: "Настройки профиля"
    },
    username: {
      en: "Username",
      ru: "Имя пользователя"
    },
    bio: {
      en: "Bio",
      ru: "О себе"
    },
    save: {
      en: "Save changes",
      ru: "Сохранить изменения"
    },
    favoriteGenres: {
      en: "Favorite Genres",
      ru: "Любимые жанры"
    },
    avatar: {
      en: "Profile Picture",
      ru: "Фото профиля"
    },
    changeAvatar: {
      en: "Change picture",
      ru: "Изменить фото"
    }
  },
  // Страница аниме
  animeList: {
    title: {
      en: "Anime Database",
      ru: "База данных аниме"
    },
    filter: {
      en: "Filter",
      ru: "Фильтр"
    },
    search: {
      en: "Search",
      ru: "Поиск"
    },
    genre: {
      en: "Genre",
      ru: "Жанр"
    },
    year: {
      en: "Year",
      ru: "Год"
    },
    rating: {
      en: "Rating",
      ru: "Рейтинг"
    },
    episodes: {
      en: "Episodes",
      ru: "Эпизоды"
    },
    status: {
      en: "Status",
      ru: "Статус"
    },
    apply: {
      en: "Apply",
      ru: "Применить"
    },
    reset: {
      en: "Reset",
      ru: "Сбросить"
    }
  },
  // Подробная информация об аниме
  animeDetail: {
    addToFavorites: {
      en: "Add to Favorites",
      ru: "Добавить в избранное"
    },
    removeFromFavorites: {
      en: "Remove from Favorites",
      ru: "Удалить из избранного"
    },
    synopsis: {
      en: "Synopsis",
      ru: "Синопсис"
    },
    information: {
      en: "Information",
      ru: "Информация"
    },
    characters: {
      en: "Characters",
      ru: "Персонажи"
    },
    reviews: {
      en: "Reviews",
      ru: "Отзывы"
    },
    similar: {
      en: "Similar Anime",
      ru: "Похожие аниме"
    },
    rateThis: {
      en: "Rate this anime",
      ru: "Оценить это аниме"
    }
  },
  // Панель управления
  dashboard: {
    title: {
      en: "Your Dashboard",
      ru: "Ваша панель управления"
    },
    recentActivity: {
      en: "Recent Activity",
      ru: "Недавняя активность"
    },
    yourRecommendations: {
      en: "Your Recommendations",
      ru: "Ваши рекомендации"
    },
    watchProgress: {
      en: "Watch Progress",
      ru: "Прогресс просмотра"
    },
    testHistory: {
      en: "Test History",
      ru: "История тестов"
    },
    favoriteAnime: {
      en: "Favorite Anime",
      ru: "Избранное аниме"
    }
  },
  // Настройки
  settings: {
    title: {
      en: "Settings",
      ru: "Настройки"
    },
    account: {
      en: "Account",
      ru: "Учетная запись"
    },
    notifications: {
      en: "Notifications",
      ru: "Уведомления"
    },
    appearance: {
      en: "Appearance",
      ru: "Внешний вид"
    },
    privacy: {
      en: "Privacy",
      ru: "Конфиденциальность"
    },
    language: {
      en: "Language",
      ru: "Язык"
    },
    darkMode: {
      en: "Dark Mode",
      ru: "Тёмная тема"
    },
    lightMode: {
      en: "Light Mode",
      ru: "Светлая тема"
    },
    systemTheme: {
      en: "System Theme",
      ru: "Системная тема"
    },
    deleteAccount: {
      en: "Delete Account",
      ru: "Удалить учетную запись"
    },
    deleteWarning: {
      en: "This action is permanent and cannot be undone.",
      ru: "Это действие необратимо и не может быть отменено."
    }
  },
  // Главная страница
  home: {
    hero: {
      title: {
        en: "Discover Anime That Matches Your Mind",
        ru: "Находите аниме, соответствующее вашему мышлению"
      },
      subtitle: {
        en: "Find the perfect anime for your personality type, mood, and psychological preferences.",
        ru: "Найдите идеальное аниме для вашего типа личности, настроения и психологических предпочтений."
      },
      getStarted: {
        en: "Get Started",
        ru: "Начать"
      },
      takeTest: {
        en: "Take a Personality Test",
        ru: "Пройти психологический тест"
      }
    },
    features: {
      title: {
        en: "How AnimeMind Match Works",
        ru: "Как работает AnimeMind Match"
      },
      subtitle: {
        en: "Our unique approach combines psychological profiling with anime preferences to create a personalized viewing experience.",
        ru: "Наш уникальный подход сочетает психологическое профилирование с предпочтениями аниме для создания персонализированного опыта просмотра."
      }
    },
    howItWorks: {
      title: {
        en: "Your Journey to Perfect Anime",
        ru: "Ваш путь к идеальному аниме"
      },
      subtitle: {
        en: "Follow these simple steps to discover anime that resonates with your unique psychology.",
        ru: "Следуйте этим простым шагам, чтобы найти аниме, которое соответствует вашей уникальной психологии."
      },
      step1: {
        title: {
          en: "Take a Personality Test",
          ru: "Пройдите тест личности"
        },
        description: {
          en: "Complete our psychological assessment to identify your personality traits, preferences, and emotional responses.",
          ru: "Пройдите наше психологическое тестирование, чтобы определить черты вашей личности, предпочтения и эмоциональные реакции."
        }
      },
      step2: {
        title: {
          en: "Create Your Profile",
          ru: "Создайте свой профиль"
        },
        description: {
          en: "Build your anime profile by adding your favorites, rating shows you've watched, and setting genre preferences.",
          ru: "Создайте свой профиль аниме, добавляя избранное, оценивая просмотренные шоу и устанавливая жанровые предпочтения."
        }
      },
      step3: {
        title: {
          en: "Customize Your Preferences",
          ru: "Настройте свои предпочтения"
        },
        description: {
          en: "Fine-tune your recommendation settings based on mood, content preferences, and viewing habits.",
          ru: "Настройте параметры рекомендаций на основе настроения, контентных предпочтений и привычек просмотра."
        }
      },
      step4: {
        title: {
          en: "Discover Perfect Matches",
          ru: "Откройте для себя идеальные совпадения"
        },
        description: {
          en: "Receive personalized anime recommendations that align with your psychological profile and preferences.",
          ru: "Получайте персонализированные рекомендации аниме, соответствующие вашему психологическому профилю и предпочтениям."
        }
      },
      startJourney: {
        en: "Start Your Anime Journey",
        ru: "Начните свое путешествие по аниме"
      }
    },
    cta: {
      title: {
        en: "Ready to Discover Your Perfect Anime Match?",
        ru: "Готовы найти свое идеальное аниме?"
      },
      subtitle: {
        en: "Take the personality test now and unlock personalized anime recommendations tailored to your unique psychological profile.",
        ru: "Пройдите тест личности прямо сейчас и разблокируйте персонализированные рекомендации аниме, адаптированные к вашему уникальному психологическому профилю."
      },
      createAccount: {
        en: "Create Free Account",
        ru: "Создать бесплатный аккаунт"
      },
      tryTest: {
        en: "Try a Test First",
        ru: "Сначала попробуйте тест"
      }
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
