/**
 * Typing Speed Test Game Logic
 * A complete typing game with difficulty levels, time bonuses, and performance tracking
 */
class TypingGame {
    constructor() {
        // Word lists for different difficulty levels
        this.wordLists = {
            beginner: [
                'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'it',
                'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this',
                'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or',
                'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so',
                'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when',
                'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people'
            ],
            intermediate: [
                'computer', 'program', 'function', 'variable', 'method', 'object', 'class', 'string',
                'number', 'boolean', 'array', 'return', 'condition', 'loop', 'break', 'continue',
                'import', 'export', 'module', 'package', 'library', 'framework', 'database', 'server',
                'client', 'request', 'response', 'header', 'body', 'status', 'error', 'exception',
                'handle', 'catch', 'throw', 'async', 'await', 'promise', 'callback', 'event',
                'listener', 'element', 'document', 'window', 'console', 'debug', 'test', 'build'
            ],
            advanced: [
                'algorithm', 'architecture', 'beautiful', 'challenging', 'development', 'extraordinary',
                'fascinating', 'government', 'hierarchy', 'implementation', 'javascript', 'knowledge',
                'language', 'magnificent', 'necessary', 'opportunity', 'performance', 'question',
                'responsibility', 'sophisticated', 'technology', 'understanding', 'versatile',
                'wonderful', 'excellent', 'yourself', 'zebra', 'achievement', 'background',
                'construction', 'democracy', 'environment', 'frequency', 'generation', 'helicopter',
                'independence', 'jurisdiction', 'kindergarten', 'laboratory', 'mathematics',
                'negotiation', 'observation', 'possibility', 'qualification', 'refrigerator'
            ]
        };

        // Game state
        this.gameState = {
            isPlaying: false,
            isPaused: false,
            timeLeft: 15,
            currentWord: '',
            wordsTyped: 0,
            correctWords: 0,
            totalCharacters: 0,
            correctCharacters: 0,
            currentStreak: 0,
            bestStreak: 0,
            startTime: null,
            difficulty: 'beginner'
        };

        // DOM elements
        this.elements = {
            startBtn: document.getElementById('start-btn'),
            restartBtn: document.getElementById('restart-btn'),
            wordInput: document.getElementById('word-input'),
            currentWordDisplay: document.getElementById('current-word'),
            timer: document.getElementById('timer'),
            wpm: document.getElementById('wpm'),
            cpm: document.getElementById('cpm'),
            accuracy: document.getElementById('accuracy'),
            streak: document.getElementById('streak'),
            progressBar: document.getElementById('progress-bar'),
            difficulty: document.getElementById('difficulty'),
            gameOverModal: document.getElementById('game-over-modal'),
            playAgainBtn: document.getElementById('play-again-btn'),
            finalWords: document.getElementById('final-words'),
            finalWpm: document.getElementById('final-wpm'),
            finalCpm: document.getElementById('final-cpm'),
            finalAccuracy: document.getElementById('final-accuracy'),
            finalStreak: document.getElementById('final-streak'),
            highScore: document.getElementById('high-score'),
            personalBestWpm: document.getElementById('personal-best-wpm')
        };

        this.timer = null;
        this.statsUpdateInterval = null;
        
        this.init();
    }

    /**
     * Initialize the game by binding events and loading saved data
     */
    init() {
        this.bindEvents();
        this.loadPersonalBest();
        this.updateDisplay();
    }

    /**
     * Bind all event listeners for user interactions
     */
    bindEvents() {
        // Game control events
        this.elements.startBtn.addEventListener('click', () => this.startGame());
        this.elements.restartBtn.addEventListener('click', () => this.restartGame());
        this.elements.playAgainBtn.addEventListener('click', () => this.playAgain());

        // Input events
        this.elements.wordInput.addEventListener('input', (e) => this.handleInput(e));
        this.elements.wordInput.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Difficulty change
        this.elements.difficulty.addEventListener('change', (e) => {
            this.gameState.difficulty = e.target.value;
            if (!this.gameState.isPlaying) {
                this.generateNewWord();
            }
        });

        // Prevent right-click context menu on input
        this.elements.wordInput.addEventListener('contextmenu', (e) => e.preventDefault());

        // Focus management
        document.addEventListener('keydown', (e) => {
            if (this.gameState.isPlaying && e.target !== this.elements.wordInput) {
                this.elements.wordInput.focus();
            }
        });
    }

    /**
     * Start a new game session with fresh timer and stats
     */
    startGame() {
        this.gameState.isPlaying = true;
        this.gameState.startTime = Date.now();
        this.gameState.timeLeft = 15;

        // Reset stats
        this.resetStats();

        // Update UI
        this.elements.startBtn.style.display = 'none';
        this.elements.restartBtn.style.display = 'inline-block';
        this.elements.wordInput.disabled = false;
        this.elements.wordInput.focus();

        // Generate first word
        this.generateNewWord();

        // Start timer
        this.startTimer();

        // Start real-time stats updates
        this.startStatsUpdates();
    }

    restartGame() {
        this.stopGame();
        this.startGame();
    }

    stopGame() {
        this.gameState.isPlaying = false;
        
        // Clear timers
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        if (this.statsUpdateInterval) {
            clearInterval(this.statsUpdateInterval);
            this.statsUpdateInterval = null;
        }

        // Update UI
        this.elements.wordInput.disabled = true;
        this.elements.wordInput.value = '';
        this.elements.startBtn.style.display = 'inline-block';
        this.elements.restartBtn.style.display = 'none';
    }

    playAgain() {
        this.elements.gameOverModal.style.display = 'none';
        this.startGame();
    }

    resetStats() {
        this.gameState.wordsTyped = 0;
        this.gameState.correctWords = 0;
        this.gameState.totalCharacters = 0;
        this.gameState.correctCharacters = 0;
        this.gameState.currentStreak = 0;
        this.gameState.bestStreak = 0;
        this.updateDisplay();
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.gameState.timeLeft--;
            this.updateTimerDisplay();
            this.updateProgressBar();

            if (this.gameState.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    startStatsUpdates() {
        this.statsUpdateInterval = setInterval(() => {
            this.updateLiveStats();
        }, 100);
    }

    /**
     * Generate a random word from the current difficulty word list
     */
    generateNewWord() {
        const wordList = this.wordLists[this.gameState.difficulty];
        const randomIndex = Math.floor(Math.random() * wordList.length);
        this.gameState.currentWord = wordList[randomIndex];
        
        // Display word with letter highlighting
        this.displayWordWithHighlighting();
    }

    /**
     * Display the current word with real-time letter highlighting
     * Shows correct (green), incorrect (red), and current (blue) letters
     */
    displayWordWithHighlighting() {
        const word = this.gameState.currentWord;
        const input = this.elements.wordInput.value;
        
        let html = '';
        
        for (let i = 0; i < word.length; i++) {
            const letter = word[i];
            let className = 'letter';
            
            if (i < input.length) {
                if (input[i] === letter) {
                    className += ' correct';
                } else {
                    className += ' incorrect';
                }
            } else if (i === input.length) {
                className += ' current';
            }
            
            html += `<span class="${className}">${letter}</span>`;
        }
        
        this.elements.currentWordDisplay.innerHTML = html;
    }

    handleInput(e) {
        if (!this.gameState.isPlaying) return;

        const input = e.target.value.toLowerCase().trim();
        this.displayWordWithHighlighting();
        
        // Update input styling
        if (input === this.gameState.currentWord) {
            this.elements.wordInput.className = 'word-input correct';
        } else if (this.gameState.currentWord.startsWith(input)) {
            this.elements.wordInput.className = 'word-input';
        } else {
            this.elements.wordInput.className = 'word-input incorrect';
        }
    }

    handleKeydown(e) {
        if (!this.gameState.isPlaying) return;

        // Handle enter for word completion
        if (e.key === 'Enter') {
            e.preventDefault();
            this.checkWord();
        }
    }

    /**
     * Check if the typed word is correct and update game state
     * Handles time bonuses and streak tracking
     */
    checkWord() {
        const input = this.elements.wordInput.value.toLowerCase().trim();
        const currentWord = this.gameState.currentWord;

        // Update statistics
        this.gameState.wordsTyped++;
        this.gameState.totalCharacters += input.length;

        if (input === currentWord) {
            // Correct word - increment streak for each correct answer
            this.gameState.correctWords++;
            this.gameState.correctCharacters += input.length;
            this.gameState.currentStreak++;
            
            if (this.gameState.currentStreak > this.gameState.bestStreak) {
                this.gameState.bestStreak = this.gameState.currentStreak;
            }

            // Add 2 seconds for each correct answer
            this.gameState.timeLeft += 2;
            
            // Add 5 seconds bonus for every 5 correct words without errors
            if (this.gameState.currentStreak % 5 === 0) {
                this.gameState.timeLeft += 5;
                this.showTimeBonus('+5 sec bonus for 5 in a row!');
            } else {
                this.showTimeBonus('+2 sec');
            }

            // Visual feedback
            this.elements.currentWordDisplay.className = 'current-word correct';
            
            setTimeout(() => {
                this.elements.currentWordDisplay.className = 'current-word';
                this.generateNewWord();
            }, 200);
        } else {
            // Incorrect word - reset streak and don't add time
            this.gameState.currentStreak = 0;
            
            // Visual feedback
            this.elements.currentWordDisplay.className = 'current-word incorrect';
            
            setTimeout(() => {
                this.elements.currentWordDisplay.className = 'current-word';
            }, 500);
        }

        // Clear input
        this.elements.wordInput.value = '';
        this.elements.wordInput.className = 'word-input';
        
        // Update display
        this.updateDisplay();
    }

    updateDisplay() {
        // Update streak
        this.elements.streak.textContent = this.gameState.currentStreak;
    }

    updateTimerDisplay() {
        this.elements.timer.textContent = this.gameState.timeLeft;
    }

    updateProgressBar() {
        const progress = ((15 - this.gameState.timeLeft) / 15) * 100;
        this.elements.progressBar.style.width = `${progress}%`;
    }

    /**
     * Update WPM, CPM, and accuracy statistics in real-time during gameplay
     */
    updateLiveStats() {
        if (!this.gameState.isPlaying || !this.gameState.startTime) return;

        const elapsedTime = (Date.now() - this.gameState.startTime) / 1000 / 60; // in minutes
        
        if (elapsedTime > 0) {
            // Calculate WPM (Words Per Minute)
            const wpm = Math.round(this.gameState.correctWords / elapsedTime);
            this.elements.wpm.textContent = wpm;

            // Calculate CPM (Characters Per Minute)
            const cpm = Math.round(this.gameState.correctCharacters / elapsedTime);
            this.elements.cpm.textContent = cpm;

            // Calculate Accuracy
            const accuracy = this.gameState.totalCharacters > 0 
                ? Math.round((this.gameState.correctCharacters / this.gameState.totalCharacters) * 100)
                : 100;
            this.elements.accuracy.textContent = `${accuracy}%`;
        }
    }

    /**
     * End the game, calculate final stats, check for high scores, and show results modal
     */
    endGame() {
        this.stopGame();
        
        // Calculate final stats
        const elapsedTime = 15 / 60; // 15 seconds in minutes
        const finalWpm = Math.round(this.gameState.correctWords / elapsedTime);
        const finalCpm = Math.round(this.gameState.correctCharacters / elapsedTime);
        const finalAccuracy = this.gameState.totalCharacters > 0 
            ? Math.round((this.gameState.correctCharacters / this.gameState.totalCharacters) * 100)
            : 100;

        // Update final stats display
        this.elements.finalWords.textContent = this.gameState.correctWords;
        this.elements.finalWpm.textContent = finalWpm;
        this.elements.finalCpm.textContent = finalCpm;
        this.elements.finalAccuracy.textContent = `${finalAccuracy}%`;
        this.elements.finalStreak.textContent = this.gameState.bestStreak;

        // Check for high score
        const personalBest = this.getPersonalBest();
        if (finalWpm > personalBest) {
            this.savePersonalBest(finalWpm);
            this.elements.highScore.style.display = 'block';
        } else {
            this.elements.highScore.style.display = 'none';
        }

        this.elements.personalBestWpm.textContent = Math.max(finalWpm, personalBest);

        // Show game over modal
        this.elements.gameOverModal.style.display = 'flex';
        
        // Focus on play again button for accessibility
        setTimeout(() => {
            this.elements.playAgainBtn.focus();
        }, 100);
    }

    getPersonalBest() {
        try {
            return parseInt(localStorage.getItem('typingGamePersonalBest') || '0');
        } catch (error) {
            console.warn('Failed to load personal best from localStorage:', error);
            return 0;
        }
    }

    savePersonalBest(wpm) {
        try {
            localStorage.setItem('typingGamePersonalBest', wpm.toString());
        } catch (error) {
            console.warn('Failed to save personal best to localStorage:', error);
        }
    }

    loadPersonalBest() {
        const personalBest = this.getPersonalBest();
        this.elements.personalBestWpm.textContent = personalBest;
    }

    /**
     * Display animated time bonus notification to the user
     * @param {string} message - The bonus message to display
     */
    showTimeBonus(message) {
        // Create or get the time bonus display element
        let bonusElement = document.getElementById('time-bonus');
        if (!bonusElement) {
            bonusElement = document.createElement('div');
            bonusElement.id = 'time-bonus';
            bonusElement.className = 'time-bonus';
            document.querySelector('.container').appendChild(bonusElement);
        }

        bonusElement.textContent = message;
        bonusElement.style.display = 'block';
        bonusElement.style.opacity = '1';

        // Animate and hide the bonus message
        setTimeout(() => {
            bonusElement.style.opacity = '0';
            setTimeout(() => {
                bonusElement.style.display = 'none';
            }, 300);
        }, 1500);
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check for localStorage support
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
    } catch (error) {
        console.warn('localStorage is not available. High scores will not be saved.');
    }

    // Create and start the game
    const game = new TypingGame();

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // ESC to close modal
        if (e.key === 'Escape') {
            const modal = document.getElementById('game-over-modal');
            if (modal && modal.style.display === 'flex') {
                modal.style.display = 'none';
            }
        }
        
        // Space to start game (when not playing)
        if (e.key === ' ' && !game.gameState.isPlaying && e.target === document.body) {
            e.preventDefault();
            const startBtn = document.getElementById('start-btn');
            if (startBtn && startBtn.style.display !== 'none') {
                startBtn.click();
            }
        }
    });

    // Prevent space from scrolling the page
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ' && e.target === document.body) {
            e.preventDefault();
        }
    });

    // Handle visibility change (pause when tab is not active)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && game.gameState.isPlaying) {
            // Game automatically continues when tab becomes visible again
            // This is intentional to maintain game flow
        }
    });

    // Handle window resize for responsive adjustments
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Force recalculation of layout-dependent elements
            if (game.gameState.isPlaying) {
                game.displayWordWithHighlighting();
            }
        }, 250);
    });

    // Add touch support for mobile devices
    if ('ontouchstart' in window) {
        const wordInput = document.getElementById('word-input');
        const startBtn = document.getElementById('start-btn');
        
        // Ensure input field is properly focused on mobile
        startBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            setTimeout(() => {
                if (wordInput && !wordInput.disabled) {
                    wordInput.focus();
                }
            }, 100);
        });
    }

    // Service Worker registration for offline support (if needed)
    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
        window.addEventListener('load', () => {
            // Service worker would be registered here if needed
            // Currently not implemented as it's not required for basic functionality
        });
    }

    console.log('Typing Speed Test Game initialized successfully!');
});

// Export for potential testing (if running in Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TypingGame;
}
