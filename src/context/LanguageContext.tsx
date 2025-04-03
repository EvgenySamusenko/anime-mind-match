
import React, { createContext, useState, useContext, ReactNode } from "react";

// Определение типов для языковых строк
type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

// Объект с переводами только на русском
const translations: Translations = {
  // Общие строки для всего приложения
  common: {
    home: "Главная",
    anime: "Аниме",
    personalityTests: "Психологические тесты",
    signIn: "Войти",
    signUp: "Регистрация",
    profile: "Профиль",
    favorites: "Избранное",
    dashboard: "Панель управления",
    settings: "Настройки",
    logOut: "Выйти",
    notFound: "404 - Страница не найдена",
    returnHome: "Вернуться на главную"
  },
  // Строки для страницы тестов
  tests: {
    title: "Психологические тесты",
    description: "Узнайте свои личностные черты и получите персонализированные рекомендации аниме на основе вашего психологического профиля.",
    allTests: "Все тесты",
    startTest: "Начать тест",
    duration: "минут",
    questions: "вопросов",
    popular: "Популярный"
  },
  // Категории тестов
  categories: {
    Personality: "Личность",
    Preferences: "Предпочтения",
    Affinity: "Сходство",
    Mood: "Настроение",
    Cognitive: "Когнитивный"
  },
  // Строки для теста
  test: {
    question: "Вопрос",
    next: "Далее",
    previous: "Назад",
    submit: "Отправить"
  },
  // Результаты теста
  results: {
    title: "Результаты вашего теста",
    recommendations: "Рекомендации аниме для вас"
  },
  // Авторизация и регистрация
  auth: {
    login: "Вход в учетную запись",
    email: "Электронная почта",
    password: "Пароль",
    loginButton: "Войти",
    forgotPassword: "Забыли пароль?",
    noAccount: "Нет учетной записи?",
    createAccount: "Создать учетную запись",
    register: "Создание учетной записи",
    confirmPassword: "Подтверждение пароля",
    registerButton: "Зарегистрироваться",
    hasAccount: "Уже есть учетная запись?",
    resetPassword: "Сброс пароля",
    resetInfo: "Введите вашу электронную почту, и мы отправим ссылку для сброса пароля.",
    resetButton: "Отправить ссылку",
    backToLogin: "Вернуться к входу"
  },
  // Профиль пользователя
  profile: {
    createProfile: "Создание профиля",
    profileSettings: "Настройки профиля",
    username: "Имя пользователя",
    bio: "О себе",
    save: "Сохранить изменения",
    favoriteGenres: "Любимые жанры",
    avatar: "Фото профиля",
    changeAvatar: "Изменить фото"
  },
  // Страница аниме
  animeList: {
    title: "База данных аниме",
    filter: "Фильтр",
    search: "Поиск",
    genre: "Жанр",
    year: "Год",
    rating: "Рейтинг",
    episodes: "Эпизоды",
    status: "Статус",
    apply: "Применить",
    reset: "Сбросить"
  },
  // Подробная информация об аниме
  animeDetail: {
    addToFavorites: "Добавить в избранное",
    removeFromFavorites: "Удалить из избранного",
    synopsis: "Синопсис",
    information: "Информация",
    characters: "Персонажи",
    reviews: "Отзывы",
    similar: "Похожие аниме",
    rateThis: "Оценить это аниме"
  },
  // Панель управления
  dashboard: {
    title: "Ваша панель управления",
    recentActivity: "Недавняя активность",
    yourRecommendations: "Ваши рекомендации",
    watchProgress: "Прогресс просмотра",
    testHistory: "История тестов",
    favoriteAnime: "Избранное аниме"
  },
  // Настройки
  settings: {
    title: "Настройки",
    account: "Учетная запись",
    notifications: "Уведомления",
    appearance: "Внешний вид",
    privacy: "Конфиденциальность",
    language: "Язык",
    darkMode: "Тёмная тема",
    lightMode: "Светлая тема",
    systemTheme: "Системная тема",
    deleteAccount: "Удалить учетную запись",
    deleteWarning: "Это действие необратимо и не может быть отменено."
  },
  // Главная страница
  home: {
    hero: {
      title: "Находите аниме, соответствующее вашему мышлению",
      subtitle: "Найдите идеальное аниме для вашего типа личности, настроения и психологических предпочтений.",
      getStarted: "Начать",
      takeTest: "Пройти психологический тест"
    },
    features: {
      title: "Как работает AnimeMind Match",
      subtitle: "Наш уникальный подход сочетает психологическое профилирование с предпочтениями аниме для создания персонализированного опыта просмотра."
    },
    howItWorks: {
      title: "Ваш путь к идеальному аниме",
      subtitle: "Следуйте этим простым шагам, чтобы найти аниме, которое соответствует вашей уникальной психологии.",
      step1: {
        title: "Пройдите тест личности",
        description: "Пройдите наше психологическое тестирование, чтобы определить черты вашей личности, предпочтения и эмоциональные реакции."
      },
      step2: {
        title: "Создайте свой профиль",
        description: "Создайте свой профиль аниме, добавляя избранное, оценивая просмотренные шоу и устанавливая жанровые предпочтения."
      },
      step3: {
        title: "Настройте свои предпочтения",
        description: "Настройте параметры рекомендаций на основе настроения, контентных предпочтений и привычек просмотра."
      },
      step4: {
        title: "Откройте для себя идеальные совпадения",
        description: "Получайте персонализированные рекомендации аниме, соответствующие вашему психологическому профилю и предпочтениям."
      },
      startJourney: "Начните свое путешествие по аниме"
    },
    cta: {
      title: "Готовы найти свое идеальное аниме?",
      subtitle: "Пройдите тест личности прямо сейчас и разблокируйте персонализированные рекомендации аниме, адаптированные к вашему уникальному психологическому профилю.",
      createAccount: "Создать бесплатный аккаунт",
      tryTest: "Сначала попробуйте тест"
    }
  }
};

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
    if (translations[section] && translations[section][key]) {
      return translations[section][key];
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
