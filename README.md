# TypeRush - Typing Speed Test Application

## Overview

This is a client-side typing speed test application built with vanilla HTML, CSS, and JavaScript. The application provides users with a gamified typing experience featuring multiple difficulty levels, real-time statistics tracking, and a modern, responsive user interface.

## Project Features

- **Real-time Typing Test**: 15-second typing challenges with live feedback
- **Time Bonus System**: +2 seconds per correct word, +5 seconds for 5-word streaks
- **Three Difficulty Levels**: Beginner, Intermediate (programming terms), and Advanced
- **Live Statistics**: WPM, CPM, accuracy, and correct answer tracking
- **Local Storage**: Personal best scores saved locally
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## System Architecture

### Frontend Architecture
- **Technology Stack**: Pure vanilla web technologies (HTML5, CSS3, JavaScript ES6+)
- **Architecture Pattern**: Single Page Application (SPA) with object-oriented JavaScript
- **Design Pattern**: Class-based architecture with centralized game state management
- **Styling Approach**: CSS3 with modern features including gradients, flexbox, and responsive design

### Key Design Decisions
- **No Framework Dependency**: Chosen for simplicity, fast loading, and minimal overhead
- **Class-based Game Logic**: Encapsulates game state and methods in a single `TypingGame` class for better organization
- **Responsive Design**: Mobile-first approach ensuring compatibility across devices

## Key Components

### 1. Game Engine (`TypingGame` class)
- **Purpose**: Core game logic and state management
- **Responsibilities**: 
  - Word generation and difficulty management
  - Timer and statistics calculation
  - Game flow control (start, pause, restart)
  - Real-time performance tracking

### 2. User Interface Components
- **Header**: Title and difficulty selector
- **Stats Bar**: Real-time display of WPM, CPM, accuracy, time, and streak
- **Word Display**: Current word presentation
- **Input Controls**: Start/restart buttons and text input field

### 3. Difficulty System
- **Beginner Mode**: Common English words (60 basic words)
- **Intermediate Mode**: Programming and tech-related terms (48 words)
- **Advanced Mode**: Complex vocabulary including technical terms (40+ challenging words)
- **Rationale**: Provides scalable challenge levels for different skill levels

## Data Flow

### 1. Game Initialization
```
User loads page → TypingGame class instantiated → DOM elements bound → Default state set
```

### 2. Game Session Flow
```
User selects difficulty → Clicks start → Word generated → User types → 
Real-time validation → Statistics updated → Timer countdown → Game ends → Results displayed
```

### 3. Statistics Calculation
- **WPM**: Words per minute based on completed words
- **CPM**: Characters per minute including spaces
- **Accuracy**: Percentage of correct characters typed
- **Streak**: Consecutive correct words

## External Dependencies

### Runtime Dependencies
- **None**: Pure vanilla JavaScript implementation
- **Browser APIs**: Standard DOM manipulation and timer functions

### Development Dependencies
- **None**: No build process or compilation required
- **Deployment**: Static file hosting compatible

## Getting Started

### Quick Setup
1. Clone or download this repository
2. Open `index.html` in any modern web browser
3. Start typing to test your speed!

### Hosting
- **Compatible with**: GitHub Pages, Netlify, Vercel, or any static file hosting
- **Requirements**: Modern browser with ES6+ support
- **No build process**: Ready to deploy as-is

### How to Play
1. Select your difficulty level (Beginner/Intermediate/Advanced)
2. Click "Start Game" to begin the 15-second challenge
3. Type the displayed words and press Enter to submit
4. Earn +2 seconds for each correct word
5. Get +5 bonus seconds for every 5 correct words in a row
6. View your final statistics and try to beat your personal best!

## Technical Implementation

### Architecture
- **Frontend**: Pure vanilla JavaScript with ES6+ features
- **Design Pattern**: Object-oriented programming with centralized state management
- **Styling**: Modern CSS3 with gradients, animations, and responsive design
- **No Dependencies**: Zero external libraries for fast loading and reliability

### Key Code Features
- Real-time letter-by-letter highlighting with visual feedback
- Dynamic time bonus system rewarding accuracy and speed
- Local storage integration for persistent high scores  
- Responsive design optimized for both desktop and mobile
- Comprehensive error handling and accessibility support

## Color Palette
- Primary: `#667eea` to `#764ba2` (gradient)
- Success: `#48bb78` (correct answers)
- Error: `#f56565` (incorrect inputs)
- Neutral: `#f7fafc`, `#4a5568` (backgrounds and text)

## License
This project is open source and available under the MIT License.