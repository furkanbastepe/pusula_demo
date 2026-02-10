/**
 * A Linear Congruential Generator (LCG) for deterministic randomness.
 * Ensures that the demo always produces the same "random" results for the same seed.
 */
export class SeededRNG {
    private seed: number;

    constructor(seed: string) {
        this.seed = this.hashString(seed);
    }

    private hashString(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0; // Convert to 32bit integer
        }
        return Math.abs(hash);
    }

    /**
     * Returns a pseudo-random number between 0 (inclusive) and 1 (exclusive).
     */
    next(): number {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }

    /**
     * Returns a pseudo-random integer between min (inclusive) and max (inclusive).
     */
    nextInt(min: number, max: number): number {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }

    /**
     * Returns a random element from an array.
     */
    pick<T>(array: T[]): T {
        return array[this.nextInt(0, array.length - 1)];
    }

    /**
     * Shuffles an array in place.
     */
    shuffle<T>(array: T[]): T[] {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(this.next() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
}
