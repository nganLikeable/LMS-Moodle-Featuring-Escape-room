export function typeOnScreen(
  typewriter: any,
  lines: string[],
  pause: number = 500
) {
  lines.forEach((line, index) => {
    typewriter.typeString(line).pauseFor(pause).typeString("<br/>"); // move to next line
  });
  typewriter.start();
}
