# Прохор Ефимов — Portfolio Landing

Персональный сайт-портфолио Fullstack AI-Driven Engineer с архитектурным уклоном.

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
│   │   ├── Stack.tsx
│   │   ├── Contacts.tsx
│   │   ├── ContactForm.tsx
│   │   ├── ThreeScene.tsx    # Three.js animated background
│   │   └── ParallaxBackground.tsx
│   ├── data/                 # Content as JSON (edit here!)
│   │   ├── profile.json
│   │   ├── about.json
│   │   ├── ai.json
│   │   ├── stack.json
│   │   └── contacts.json
│   ├── types/
│   │   └── data.ts           # TypeScript interfaces
│   └── styles/
│       └── tailwind.css
├── assets/
│   └── img/
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## ✏️ Редактирование контента

**Весь контент находится в JSON-файлах** `src/data/` — можно редактировать без изменения кода компонентов:

- **`profile.json`** — имя, роль, стек, ссылки (Telegram, Email, GitHub)
- **`stack.json`** — раздел "Технологический стек" (категории и теги, включая Python/Go)
- **`ai.json`** — раздел "AI-Driven Development" (8 карточек)
- **`about.json`** — раздел "Обо мне"
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

## 📝 Форма связи

Форма настроена с Formspree (form id: `mppqkryk`, email: `prohorweb@gmail.com`).

Имеет honeypot защиту от спама и fallback на mailto-ссылку.

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
4. После первого деплоя включите **Enforce HTTPS** в Settings → Pages

**Workflow**:
- Устанавливает Node.js 20
- Запускает `npm ci && npm run build`
- Деплоит `dist/` через `actions/deploy-pages`
- Автоматически копирует `public/CNAME` в `dist/` для кастомного домена

## 🌐 Кастомный домен prohordev.ru

**DNS настройка** (у вашего регистратора доменов):

1. **A записи** (apex домен):
   ```
   Type: A    Name: @    Value: 185.199.108.153
   Type: A    Name: @    Value: 185.199.109.153
   Type: A    Name: @    Value: 185.199.110.153
   Type: A    Name: @    Value: 185.199.111.153
   ```

2. **CNAME запись** (www поддомен):
   ```
   Type: CNAME    Name: www    Value: prohorweb.github.io
   ```

3. Дождитесь DNS propagation (до 24 часов, обычно быстрее)

**После DNS настройки**:
- Сайт будет доступен на `https://prohordev.ru`
- HTTPS сертификат выпустится автоматически (GitHub Pages + Let's Encrypt)
- Файл `public/CNAME` гарантирует, что GitHub Pages знает о кастомном домене

## 📦 Основные зависимости

- **React** 18.2 — UI библиотека
- **TypeScript** 5.3 — строгая типизация
- **Vite** 5.0 — быстрый dev-сервер и сборщик
- **Three.js** 0.160 — 3D анимация фона

---

**Автор**: Prohor Efimov  
**Telegram**: [@proef](https://t.me/proef)  
**Email**: [prohorweb@gmail.com](mailto:prohorweb@gmail.com)
