# Прохор Ефимов — Portfolio Landing

Персональный сайт-портфолио fullstack-разработчика с архитектурным уклоном и AI-Native подходом.

## 🏗️ Архитектура

**Stack**: React 18 + TypeScript + Vite + Three.js

**Структура проекта**:
```
/
├── src/
│   ├── main.tsx              # Entry point
│   ├── App.tsx               # Main app component
│   ├── components/           # React components
│   │   ├── Hero.tsx
│   │   ├── HeroHalo.tsx
│   │   ├── About.tsx
│   │   ├── AI.tsx
│   │   ├── Architecture.tsx
│   │   ├── Stack.tsx
│   │   ├── Contacts.tsx
│   │   ├── ContactForm.tsx
│   │   ├── ThreeScene.tsx    # Three.js animated background
│   │   └── ParallaxBackground.tsx
│   ├── data/                 # Content as JSON (edit here!)
│   │   ├── profile.json
│   │   ├── about.json
│   │   ├── ai.json
│   │   ├── architecture.json
│   │   ├── stack.json
│   │   └── contacts.json
│   ├── types/
│   │   └── data.ts           # TypeScript interfaces
│   └── styles/
│       └── global.css
├── assets/
│   └── img/
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## ✏️ Редактирование контента

**Весь контент находится в JSON-файлах** `src/data/` — можно редактировать без изменения кода компонентов:

- **`profile.json`** — имя, заголовок, фото, ссылки (Telegram, Email, GitHub)
- **`about.json`** — раздел "Обо мне"
- **`ai.json`** — раздел "Как я работаю с ИИ" (карточки A-D)
- **`architecture.json`** — раздел "Архитектурная экспертиза" (список экспертиз)
- **`stack.json`** — раздел "Технологический стек" (категории и теги)
- **`contacts.json`** — раздел "Контакты" (форма, ссылки, информация)

Типы данных описаны в `src/types/data.ts` (TypeScript интерфейсы).

## 🎨 Дизайн

**Archex Brand System**:
- Чёрный фон (`#06070A`)
- Золотые акценты (`#D6B36A`, `#F0D7A1`)
- Оранжевые метки (`#D86A2D`)
- Space Grotesk для заголовков
- Inter для основного текста
- JetBrains Mono для меток
- Нумерация секций `01 / НАЗВАНИЕ`
- Three.js анимация (вращающийся wireframe куб)
- Parallax фон (сетка blueprints)

## 📝 Настройка формы связи

**Formspree**:
1. Создайте форму на [formspree.io](https://formspree.io) для email `prohorweb@gmail.com`
2. Подтвердите email
3. В файле `src/components/ContactForm.tsx` замените `YOUR_FORM_ID` на ваш ID:
   ```typescript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
   ```

Форма использует honeypot защиту от спама и имеет fallback на mailto-ссылку.

## 🚀 Разработка

```bash
# Установка зависимостей
npm install

# Dev-сервер (http://localhost:5173)
npm run dev

# Сборка продакшна
npm run build

# Превью собранного сайта
npm run preview
```

## 🌐 GitHub Pages деплой

**Настройка** (после первого merge в main):
1. Зайдите в Settings → Pages
2. Source: **GitHub Actions**
3. Workflow `.github/workflows/deploy.yml` запустится автоматически при push в `main`

**Workflow**:
- Устанавливает Node.js 20
- Запускает `npm ci && npm run build`
- Деплоит `dist/` через `actions/deploy-pages`

Сайт доступен на `https://prohorweb.github.io`

## 📦 Основные зависимости

- **React** 18.2 — UI библиотека
- **TypeScript** 5.3 — строгая типизация
- **Vite** 5.0 — быстрый dev-сервер и сборщик
- **Three.js** 0.160 — 3D анимация фона

---

**Автор**: Prokhor Efimov  
**Telegram**: [@proef](https://t.me/proef)  
**Email**: [prohorweb@gmail.com](mailto:prohorweb@gmail.com)
