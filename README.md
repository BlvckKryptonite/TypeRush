# TypeRush – Typing Speed Test Application

## Overview

**TypeRush** is a fully client-side typing speed test application developed using HTML, CSS, and vanilla JavaScript. The app delivers a gamified typing experience with real-time feedback, difficulty progression, live statistics tracking, and a responsive, modern UI. It's designed to showcase proficiency in DOM manipulation, OOP principles, and performance-focused front-end development.

## 🚀 Live Demo

[🔗 View the Live App](https://blvckkryptonite.github.io/TypeRush/)

---

## Features

- **Real-Time Typing Test** – 15-second challenge with immediate word validation.
- **Time Bonus System** – +2 seconds for every correct word; +5 seconds for every 5-word streak.
- **Difficulty Progression** – Three levels: Beginner (common words), Intermediate (tech terms), Advanced (complex vocabulary).
- **Live Statistics Display** – WPM, CPM, accuracy, and streak tracking updated in real-time.
- **Persistent High Scores** – Local storage used to save personal bests.
- **Responsive Design** – Optimized for both desktop and mobile devices.

---

## Technologies Used

| Area       | Stack / Tools                             |
|------------|--------------------------------------------|
| Frontend   | HTML5, CSS3 (Flexbox, Gradients), JavaScript (ES6+) |
| Architecture | SPA (Single Page App), OOP design using `TypingGame` class |
| Storage    | Browser `localStorage` (no external DB)    |
| Deployment | GitHub Pages                               |

---

## Key Components

### Game Engine (`TypingGame` class)

- Manages core logic: timer, word generation, difficulty, scoring.
- Handles all game state transitions (start, pause, finish).
- Encapsulates game logic for testability and scalability.

### Difficulty System

- **Beginner**: 60 common English words.
- **Intermediate**: 48 programming/tech-related terms.
- **Advanced**: 40+ complex or uncommon words.
- Dynamic progression encourages skill building and replayability.

### Live Statistics

- **WPM (Words Per Minute)**: Based on correctly submitted words.
- **CPM (Characters Per Minute)**: Total characters typed, including spaces.
- **Accuracy %**: Percentage of correct characters.
- **Streak**: Tracks consecutive correct entries.

---

## System Architecture

### Game Flow

```text
User loads page → Game initializes → User selects difficulty → Clicks Start →
Random word displayed → User types and submits → Stats and timer update →
Game ends after time runs out → Final score shown and saved

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
