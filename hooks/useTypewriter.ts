import { useState, useEffect } from 'react';

/**
 * A custom hook for a typewriter effect.
 * @param text The string to be typed.
 * @param speed The delay between characters in milliseconds.
 * @returns A tuple containing the currently displayed text and a boolean indicating if the animation is finished.
 */
export const useTypewriter = (text: string, speed: number = 50): [string, boolean] => {
  const [displayedText, setDisplayedText] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  // Effect to reset the state whenever the input text changes (e.g., on language switch).
  useEffect(() => {
    setDisplayedText('');
    setIsFinished(false);
  }, [text]);

  // Main effect for the typing logic.
  useEffect(() => {
    // Only run the typing effect if it's not finished yet.
    if (!isFinished) {
      if (displayedText.length < text.length) {
        const timeoutId = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length + 1));
        }, speed);
        return () => clearTimeout(timeoutId);
      } else {
        // Once the text is fully typed, set the finished flag to true.
        setIsFinished(true);
      }
    }
  }, [displayedText, text, speed, isFinished]);

  return [displayedText, isFinished];
};
