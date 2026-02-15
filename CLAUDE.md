# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js 16 frontend application for a data union platform where users can contribute data (voice, text, documents, sensor), manage their data, and track earnings. The app includes a landing page, onboarding flow, user dashboard, and admin panel.

## Development Commands

```bash
# Start development server on http://localhost:3000
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture

### State Management & Navigation

The application uses a **single-page client-side routing pattern** via the main `DataUnionApp` component:

- **No Next.js App Router navigation** - all routing is handled by React state (`view` state variable)
- Four main views: `'landing' | 'onboard' | 'dashboard' | 'admin'`
- User state and contributions state are managed at the top level in `DataUnionApp.tsx`
- View transitions are triggered by callbacks (e.g., `onStart`, `onComplete`, `onBack`, `onLogout`)

### Component Structure

```
app/
├── components/
│   ├── DataUnionApp.tsx          # Root component, state management, view routing
│   ├── landing/Landing.tsx       # Marketing/landing page
│   ├── onboarding/Onboarding.tsx # User registration flow
│   ├── dashboard/                # User dashboard with tabs
│   │   ├── Dashboard.tsx         # Tab container
│   │   ├── ContributeTab.tsx     # Data submission interface
│   │   ├── DataTab.tsx          # User's contributed data
│   │   ├── EarningsTab.tsx      # Earnings history
│   │   └── SettingsTab.tsx      # User preferences
│   ├── admin/                    # Admin panel with tabs
│   │   ├── Admin.tsx            # Admin tab container
│   │   ├── ReviewTab.tsx        # Review contributions
│   │   ├── DatasetsTab.tsx      # Manage datasets
│   │   └── UnionsTab.tsx        # Manage unions
│   └── ui/                       # Reusable UI components
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── Textarea.tsx
│       └── ...
├── page.tsx                      # Next.js entry point
└── layout.tsx                    # Root layout with fonts
```

### Styling System

**All styling is done via inline styles** - there are no CSS modules or Tailwind utility classes in components:

- Theme constants in `lib/theme.ts` (colors exported as `T`, data type colors as `DTC`)
- Custom fonts injected via `lib/styles.ts` (`inject()` function)
- Uses DM Sans (sans-serif) and DM Mono (monospace) loaded from Google Fonts
- Global CSS animations injected programmatically: `.du-fade`, `.du-pulse`, `.du-blink`, `.du-drop`
- Dark theme throughout with consistent color palette

When creating or modifying components:
- Use inline `style` prop with theme constants from `T` and `DTC`
- Reference existing components for styling patterns
- Do NOT use Tailwind classes or CSS-in-JS libraries
- Apply `.du-fade` class for fade-in animations, `.du-pulse` for pulsing effects

### Type System

All types are centralized in `types/index.ts`:

- `User` - User profile with language preferences, data types, pricing
- `Contribution` - Individual data contributions with status tracking
- `Dataset` - Dataset metadata for admin views
- `Language`, `DataType`, `VoicePrompt`, `TextPrompt` - Configuration types

### Constants & Mock Data

`constants/` directory contains:
- `mockData.ts` - Mock contributions for development
- `languages.ts` - Supported languages with emoji flags
- `dataTypes.ts` - Data type definitions (voice, text, documents, sensor)
- `prompts.ts` - Sample prompts for voice/text contributions
- `license.ts` - License templates

## Key Patterns

1. **Client Components**: Most components are `'use client'` directives since the app is heavily interactive
2. **Path Aliases**: Use `@/` prefix for imports (maps to project root via tsconfig paths)
3. **Component Props**: Callbacks are passed down for navigation (e.g., `onStart`, `onComplete`, `onBack`)
4. **Status-based Rendering**: Contributions have `'approved' | 'pending' | 'rejected'` status
5. **Tab Pattern**: Both Dashboard and Admin use tab-based navigation with local state
