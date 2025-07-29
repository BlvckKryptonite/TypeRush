# TypeRush - Typing Speed Test Application

## Overview

TypeRush is a client-side typing speed test application built with vanilla HTML, CSS, and JavaScript. It provides users with a gamified typing experience featuring multiple difficulty levels, real-time statistics, and time-based challenges with bonus mechanics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Technology Stack**: Pure vanilla web technologies (HTML5, CSS3, JavaScript ES6+)
- **Architecture Pattern**: Single Page Application (SPA) with object-oriented JavaScript
- **Design Pattern**: Class-based architecture with centralized game state management
- **No Framework Dependencies**: Chosen for simplicity, fast loading times, and minimal overhead

### Key Architectural Decisions

**Problem**: Need for a lightweight, fast-loading typing test application
**Solution**: Vanilla JavaScript with class-based organization
**Rationale**: Eliminates framework overhead while maintaining code organization through OOP principles

**Problem**: Managing complex game state across different interactions
**Solution**: Centralized `TypingGame` class with encapsulated state management
**Rationale**: Provides clear separation of concerns and easier debugging

## Key Components

### 1. Game Engine (`TypingGame` class)
- **Purpose**: Core game logic and state management
- **Responsibilities**: 
  - Word generation based on difficulty level
  - Timer management with bonus system (+2 seconds per correct word, +5 for streaks)
  - Real-time statistics calculation (WPM, CPM, accuracy)
  - Game flow control (start, pause, restart)

### 2. User Interface System
- **Header Component**: Logo, title, and difficulty selector
- **Statistics Bar**: Live display of performance metrics
- **Game Area**: Word display and input controls
- **Responsive Design**: Mobile-first approach with flexbox layouts

### 3. Difficulty Management System
- **Beginner Mode**: 60 common English words for basic practice
- **Intermediate Mode**: 48 programming and tech-related terms
- **Advanced Mode**: 40+ complex vocabulary including technical terms
- **Dynamic Word Selection**: Random selection from appropriate word lists

### 4. Scoring and Statistics System
- **Real-time Metrics**: WPM, CPM, accuracy percentage
- **Streak Tracking**: Consecutive correct answers with visual feedback
- **Time Bonus Mechanics**: Extended gameplay through successful typing

## Data Flow

1. **Game Initialization**: User selects difficulty and starts game
2. **Word Generation**: Random word selected from appropriate difficulty list
3. **User Input Processing**: Real-time validation and statistics updates
4. **Performance Calculation**: Live WPM/CPM calculations based on elapsed time
5. **Bonus Time Management**: Time extensions for correct answers and streaks
6. **Local Storage**: Best scores saved to browser's local storage

## External Dependencies

### Fonts
- **Google Fonts**: Alfa Slab One font family for enhanced typography
- **Fallback**: Arial as system font fallback

### Assets
- **Logo**: Local logo.png file for branding
- **No External Libraries**: Pure vanilla implementation without third-party JavaScript libraries

## Deployment Strategy

### Static File Hosting
- **Architecture**: Client-side only application requiring basic static file hosting
- **Files**: HTML, CSS, JavaScript, and image assets
- **Compatibility**: Works on any web server or CDN that can serve static files
- **Local Storage**: All user data stored locally in browser, no backend required

### Performance Optimizations
- **CSS Versioning**: Cache-busting with version parameters
- **Font Preloading**: Google Fonts preconnection for faster loading
- **Responsive Images**: Optimized logo sizing
- **Minimal Dependencies**: Reduced load times through vanilla implementation

### Browser Compatibility
- **Modern Browsers**: Targets ES6+ compatible browsers
- **Mobile Support**: Responsive design for touch devices
- **Progressive Enhancement**: Graceful degradation for older browsers