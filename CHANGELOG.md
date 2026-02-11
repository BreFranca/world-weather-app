# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-11

### Added

- 🗺️ Interactive map with click-to-select location functionality
- 🌤️ Real-time current weather display with detailed metrics
- 📊 5-day weather forecast with visual cards
- 🔍 Location search with autocomplete and debouncing
- 🌡️ Temperature unit toggle (Celsius/Fahrenheit)
- ⚡ React Query caching for optimized performance
- 📱 Fully responsive design for all devices
- 🧪 Comprehensive test coverage (79 tests)
  - 41 unit tests
  - 26 integration tests
  - 12 E2E tests with Playwright
- 🚀 CI/CD pipeline with GitHub Actions
- 📖 Complete documentation (README, ARCHITECTURE, CONTRIBUTING)
- ♿ Accessible components with ARIA labels
- 🎨 Loading skeletons for better UX
- ❌ Error handling with retry mechanism
- 💾 localStorage persistence for user preferences

### Technical Highlights

- Next.js 16.1 with App Router
- TypeScript strict mode
- TanStack Query v5 for server state
- React-Leaflet for maps
- Vitest + Playwright for testing
- ESLint + Prettier for code quality
- Vercel deployment ready

### Performance Optimizations

- Debounced search (300ms)
- React Query caching (10min stale, 30min cache)
- Dynamic map imports to avoid SSR issues
- Optimized re-renders with useMemo/useCallback
- Lazy loading for non-critical components

---

## [Unreleased]

### Planned Features

- [ ] Dark mode support
- [ ] User accounts with saved locations
- [ ] Historical weather data
- [ ] Weather alerts and notifications
- [ ] Advanced weather visualizations
- [ ] PWA support for offline functionality
- [ ] Multi-language support (i18n)

---

[1.0.0]: https://github.com/BreFranca/world-weather-app/releases/tag/v1.0.0
