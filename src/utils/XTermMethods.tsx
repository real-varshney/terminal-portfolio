import { Terminal } from "xterm";
import prompts from "../assets/templates/prompts.json";
import { availableCommands } from "../assets/constants/Constants";
import highlightDynamicLinks from "./highlightDynamicLinks";



type CommandMap = Record<string, string>;
export const XTermMethods = {
  terminalState: { originalLineY: 1, linesJumped: 0 },
  history: [] as string[],
  historyIndex: -1,

  type: (
    term: any,
    key: string,
    promptName: string,
    domEvent: KeyboardEvent
  ) => {
    if (!term) return;

    const cursorY = term.buffer.active.cursorY;
    const cursorX = term.buffer.active.cursorX;
    const isPrintableCharacter = domEvent.key.length === 1;

    XTermMethods.terminalState.linesJumped =
      cursorY - XTermMethods.terminalState.originalLineY;

    if (domEvent.key === "ArrowUp") {
      XTermMethods.showHistory(term, promptName, -1);
    } else if (domEvent.key === "Tab") {
      XTermMethods.autocomplete(term, promptName);
      return;
    } else if (domEvent.key === "ArrowLeft") {
      XTermMethods.handleLine(term, promptName, domEvent);
    } else if (domEvent.key === "ArrowRight") {
      XTermMethods.handleLine(term, promptName, domEvent);
    }
    if (
      cursorY < XTermMethods.terminalState.originalLineY &&
      isPrintableCharacter
    ) {
      return;
    }

    if (XTermMethods.terminalState.linesJumped > 0) {
      term.write(key);
      return;
    } else if (cursorX < promptName.length - 1 && isPrintableCharacter) {
      return;
    }

    term.write(key);
  },

  backspace: (term: any, promptName: string) => {
    if (!term) return;

    const cursorX = term.buffer.active.cursorX;
    const cursorY = term.buffer.active.cursorY;
    const promptLength = promptName.length - 1;

    if (cursorY < XTermMethods.terminalState.originalLineY) {
      return;
    }

    if (cursorX == 0 && cursorY > XTermMethods.terminalState.originalLineY) {
      term.write("\x1b[A\x1b[999C \x1b[D");
      term.write("\x1b[C");
      XTermMethods.terminalState.linesJumped--;
      return;
    }

    if (cursorY > XTermMethods.terminalState.originalLineY) {
      term.write("\b \b");
      return;
    }

    // Allow deletion but stop at prompt
    if (cursorX > promptLength) {
      term.write("\b \b");
    }
  },

  enter: (term: any, promptName: string) => {
    if (!term) return;

    const buffer = (term as any)._core.buffer;
    const currentLine = buffer.lines
      .get(buffer.ybase + buffer.y)
      ?.translateToString()
      .trim();

    // Extract command by removing the full prompt
    const command = currentLine.startsWith(promptName)
      ? currentLine.slice(promptName.length).trim()
      : currentLine;

    if (command) {
      XTermMethods.history.push(command); // Save command in history
      XTermMethods.historyIndex = XTermMethods.history.length; // Reset index
    }
    term.write("\r\n");
    handleCommand(term, command);
    term.write(`\r\n${promptName}`); // Ensure space after prompt

    setTimeout(() => {
      XTermMethods.terminalState.linesJumped = 0;
      XTermMethods.terminalState.originalLineY = term.buffer.active.cursorY; // Correctly update original Y position
    }, 0);
  },

  setValue: (term: any) => {
    XTermMethods.terminalState.originalLineY = term.buffer.active.cursorY;
    return;
  },

  showHistory(term: Terminal, prompt: string, direction: number) {
    const { originalLineY } = this.terminalState;

    if (term.buffer.active.cursorY !== originalLineY && direction == 1) {
      // term.write("\x1b[B");
      return;
    } else if (
      term.buffer.active.cursorY !== originalLineY &&
      direction == -1
    ) {
      return;
    }

    if (this.history.length === 0) return;

    const newIndex = this.historyIndex + direction;
    if (newIndex < 0) return;
    if (newIndex >= this.history.length) {
      term.write(`\x1b[J`); // Clears everything below
      term.write(`\x1b[2K\r${prompt}`); // Clears current line
      this.historyIndex = this.history.length;
      return;
    }
    this.historyIndex = newIndex;
    const historyCommand = this.history[this.historyIndex];

    term.write(`\x1b[J`); // Clears everything below
    term.write(`\x1b[2K\r${prompt}${historyCommand}`); // Clears current line & writes history
  },

  handleLine: (term: Terminal, prompt: string, domEvent: KeyboardEvent) => {
    const { originalLineY } = XTermMethods.terminalState;
    const { cursorY, cursorX } = term.buffer.active;
    var totalLength = term.buffer.active.getLine(cursorY)?.length;
    if (
      cursorX == 0 &&
      domEvent.key === "ArrowLeft"
    ) {
      domEvent.preventDefault();
      term.write("\x1b[A\x1b[999C");
    } else if (
      cursorX == (totalLength || 0) -1 &&
      domEvent.key === "ArrowRight"
    ) {
      domEvent.preventDefault();
      term.write("\x1b[B\x1b[999D");
    }
  },

  autocomplete(term: Terminal, prompt: string) {
    const currentInput =
      term.buffer.active
        .getLine(term.buffer.active.cursorY)
        ?.translateToString()
        .replace(prompt, "")
        .trim() || "";

    if (!currentInput) return;

    const matches = availableCommands.filter((cmd) =>
      cmd.startsWith(currentInput)
    );
    if (matches.length === 1) {
      term.write(matches[0].slice(currentInput.length));
    } else if (matches.length > 1) {
      term.writeln("\r\n" + matches.join("  "));
      term.write(`\r\n${prompt}${currentInput}`);
    }
  },
};


const handleCommand = (term: Terminal, command: string | undefined) => {
  if (!command) return "";

  const normalizedCommand = command.toLowerCase();
  
  if (normalizedCommand === "clear" || normalizedCommand === "cls") {
    term.clear();
    return "";
  }
  const output = commandMap[normalizedCommand] || prompts.VISIBLE.UNKNOWN;
  highlightDynamicLinks(term, output);
  return output;
};

const commandMap: any = {
  ...Object.fromEntries(
    Object.entries(prompts.VISIBLE).map(([key, value]) => [key.toLowerCase(), value])
  ),
  ...Object.fromEntries(
    Object.entries(prompts.HIDDEN)
      .filter(([key]) => key !== "LINKS") // Exclude LINKS array from being mapped
      .map(([key, value]) => [key.toLowerCase(), value])
  ),
};