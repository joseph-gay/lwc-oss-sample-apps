import { LightningElement, api } from 'lwc';

const greetings = [
    'Hello',
    'Bonjour',
    '你好',
    'Hola',
    'Привет',
    'こんにちは',
    'Guten Tag',
    'ጤና ይስጥልኝ',
    'Ciao',
    'नमस्ते',
    '안녕하세요',
    'مرحبا'
]
const SPEED_CLASS_MAP = {
    slow: 'fade-slow',
    fast: 'fade-fast',
    medium: 'fade-medium'
}
const DEFAULT_SPEED = 'medium'

interface IGreeting {
    animationSpeed: string;
    index: number;
    isAnimating: boolean;
    speed: string;
    greeting: string;
    animationClass: string;
    handleAnimationEnd: () => void;
    updateGreeting: () => void;
}

export default class Greeting extends LightningElement implements IGreeting {
    animationSpeed = DEFAULT_SPEED;
    index = 0;
    isAnimating = true;

    @api
    set speed(value) {
        if (SPEED_CLASS_MAP[value as keyof typeof SPEED_CLASS_MAP]) {
            this.animationSpeed = value;
        } else {
            this.animationSpeed = DEFAULT_SPEED;
        }
        this.isAnimating = true;
    }

    // Return the internal speed property
    get speed() {
        return this.animationSpeed;
    }

    // Get the current greeting
    get greeting() {
        return greetings[this.index];
    }

    // Map slow, medium, fast to CSS Animations
    get animationClass() {
        if (this.isAnimating) {
            return SPEED_CLASS_MAP[this.speed as keyof typeof SPEED_CLASS_MAP];
        }
        return 'hide';
    }

    //Handle the animation ending, update to next hello
    handleAnimationEnd() {
        this.isAnimating = false;
        this.index = (this.index + 1) % greetings.length;

        setTimeout(() => this.updateGreeting(), 500);
    }

    // Update to the next greeting and start animating
    updateGreeting() {
        this.isAnimating = true;
    }
}