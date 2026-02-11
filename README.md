# World Weather App 🌤️

> A production-grade weather application built with Next.js, TypeScript, and React-Leaflet. Features real-time weather data, 5-day forecasts, an interactive map interface, and comprehensive test coverage.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![React](https://img.shields.io/badge/React-18+-61DAFB)
![Tests](https://img.shields.io/badge/Tests-88%20passing-success)
![Coverage](https://img.shields.io/badge/Coverage-97%25-brightgreen)

## ✨ Live Demo

> **Note**: This project is designed to run locally. Follow the setup instructions below to run on your machine.

## 🌟 Features

### Core Features

- **🗺️ Interactive Map**: Click anywhere on the map to get weather data for that location
- **🌤️ Real-time Weather**: Current weather conditions with detailed metrics (humidity, wind, pressure, visibility)
- **📊 5-Day Forecast**: Visual forecast cards with temperature trends and weather icons
- **🔍 Smart Location Search**: Autocomplete search with debouncing (300ms) to reduce API calls
- **🌡️ Temperature Units**: Toggle between Celsius and Fahrenheit with localStorage persistence
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices

### Performance & Quality

- **⚡ Optimized Performance**: React Query caching, lazy loading, and loading skeletons
- **🧪 Comprehensive Testing**: 88 tests with 97% code coverage
  - 77 unit & integration tests
  - 11 E2E tests with Playwright
- **♿ Accessible**: WCAG compliant components
- **🚀 CI/CD Ready**: Automated testing pipeline with GitHub Actions
- **📖 Well Documented**: Architecture decisions and code documentation

## 🛠️ Tech Stack

### Core

- **Next.js 16.1** with App Router - React framework for production
- **TypeScript 5.0** - Strict mode enabled for maximum type safety
- **React 18+** - Latest features including Server Components

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS with custom design system
- **Shadcn/ui** - Reusable component library
- **Lucide React** - Modern icon library

### State & Data Management

- **TanStack Query v5** - Server state management with automatic caching
- **Custom React Hooks** - Reusable logic abstraction

### Map & Geolocation

- **React-Leaflet** - React wrapper for Leaflet
- **Leaflet** - Open-source interactive maps

### Testing

- **Vitest** - Fast unit test runner
- **React Testing Library** - Component testing
- **Playwright** - End-to-end testing

### API

- **OpenWeatherMap API** - Current weather & 5-day forecast

## 📋 Prerequisites

- **Node.js**: 20.x or higher
- **npm**: 9.x or higher
- **OpenWeatherMap API Key**: Free tier available at https://openweathermap.org/api

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/BreFranca/world-weather-app.git
cd world-weather-app
```

**Or download the ZIP file directly from GitHub.**

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Add your OpenWeatherMap API key:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

**Getting an API Key:**

1. Visit https://openweathermap.org/api
2. Sign up for a free account
3. Navigate to API keys section
4. Generate a new key (activation takes ~10 minutes)

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
world-weather-app/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Main page component
│   └── globals.css          # Global styles
├── src/
│   ├── components/          # React components
│   │   ├── Map/            # Map components
│   │   ├── Weather/        # Weather display components
│   │   ├── Search/         # Location search
│   │   ├── Layout/         # Layout components
│   │   └── common/         # Shared components
│   ├── hooks/              # Custom React hooks
│   │   ├── useWeather.ts
│   │   ├── useForecast.ts
│   │   └── useTemperatureUnit.ts
│   ├── services/           # API integration layer
│   │   ├── weatherApi.ts
│   │   └── geocodingApi.ts
│   ├── types/              # TypeScript definitions
│   ├── utils/              # Utility functions
│   └── lib/                # Configuration (React Query)
├── e2e/                    # Playwright E2E tests
├── docs/
│   ├── ARCHITECTURE.md     # Architecture decisions
│   └── CONTRIBUTING.md     # Contribution guidelines
├── .github/
│   └── workflows/          # CI/CD workflows
├── vitest.config.ts        # Vitest configuration
├── playwright.config.ts    # Playwright configuration
└── README.md
```

## 🧪 Testing

```bash
# Run all unit and integration tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run E2E tests in UI mode (interactive)
npm run test:e2e:ui

# View E2E test report
npm run test:e2e:report
```

### Test Coverage

- **Unit Tests (77)**: Utilities, hooks, API services, and components
- **E2E Tests (11)**: Full user journeys with Playwright
- **Code Coverage**: 97% (lines, statements, functions, branches)

## 🔨 Building for Production

```bash
# Create production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🎯 Key Implementation Details

### Performance Optimizations

1. **React Query Caching**
   - Stale time: 10 minutes
   - Cache time: 30 minutes
   - Automatic background refetching

2. **Debounced Search**
   - 300ms debounce on location search
   - Reduces unnecessary API calls
   - Improves user experience

3. **Code Splitting**
   - Map component lazy-loaded with `next/dynamic`
   - Prevents SSR hydration issues
   - Reduces initial bundle size

4. **Loading States**
   - Skeleton screens for weather data
   - Smooth transitions
   - Better perceived performance

### Temperature Unit Conversion

- Client-side conversion for instant feedback
- Persistent preferences via localStorage
- No additional API calls needed

### Error Handling

- Graceful API failure handling
- User-friendly error messages
- Retry mechanism with visual feedback
- Network error detection

## 🏛️ Architecture

See [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for detailed architectural decisions.

### Design Principles

1. **Separation of Concerns**: Clear boundaries between UI, business logic, and data access
2. **Reusability**: Custom hooks and utility functions for DRY code
3. **Type Safety**: Strict TypeScript with no `any` types in production code
4. **Performance First**: Optimized rendering, caching, and lazy loading
5. **Testability**: Modular design enables comprehensive test coverage
6. **Scalability**: Clean architecture ready for feature expansion

## 🚀 CI/CD Pipeline

The project includes a complete CI/CD pipeline with GitHub Actions:

### Continuous Integration

- ✅ Automated linting (ESLint)
- ✅ Type checking (TypeScript)
- ✅ Unit & integration tests (Vitest)
- ✅ E2E tests (Playwright)
- ✅ Build verification

**Note**: The pipeline runs automated tests and quality checks on every push. No deployment is configured - the app is designed to run locally.

See [.github/workflows/](.github/workflows/) for pipeline configuration.

## 📈 Future Enhancements

The architecture is designed to support:

- ✨ User accounts with saved locations
- ✨ Multiple weather data providers
- ✨ Historical weather data and trends
- ✨ Advanced weather visualizations (charts, radar)
- ✨ Push notifications for weather alerts
- ✨ Progressive Web App (PWA) support
- ✨ Offline functionality with service workers
- ✨ Multi-language support (i18n)
- ✨ Dark mode / theme customization
- ✨ Weather widgets and embeds

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Weather Data**: [OpenWeatherMap](https://openweathermap.org)
- **Maps**: [OpenStreetMap](https://www.openstreetmap.org) contributors
- **Icons**: [Lucide Icons](https://lucide.dev)
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com)

---

**Built for the P-Secure Frontend Challenge** 🚀

## ⏱️ Development Time

- Core features (map, weather, search): **4 hours**
- 5-day forecast with visualizations: **1.5 hours**
- Performance optimization & caching: **1.5 hours**
- Testing (unit, integration, E2E): **2 hours**
- Architecture & documentation: **1 hour**
- CI/CD pipeline setup: **0.5 hours**
- **Total: 10.5 hours**

## 📞 Contact

**Breno França**

- Email: bre.sfranca@gmail.com
- GitHub: [@BreFranca](https://github.com/BreFranca)
- LinkedIn: [Breno França](https://www.breno-franca.com/)

---

Made with ❤️ and TypeScript
