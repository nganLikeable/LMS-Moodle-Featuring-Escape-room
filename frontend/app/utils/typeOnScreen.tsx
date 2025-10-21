export function typeOnScreen(
  typewriter: any,
  lines: string[],
  onComplete: () => void,
  pause: number = 500
) {
  lines.forEach((line, index) => {
    typewriter.typeString(line).pauseFor(pause).typeString("<br/>"); // move to next line

    // After the last line, trigger onComplete
    if (index === lines.length - 1) {
      typewriter.callFunction(() => {
        if (onComplete) onComplete();
      });
    }
  });
  typewriter.start();
}
