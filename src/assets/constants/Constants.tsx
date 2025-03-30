export const getTerminalIntroMessages = (termWidth: number) => {
  termWidth += 10
  const boxWidth = 75; // Fixed width of the box
  const boxPadding = Math.max(0, Math.floor((termWidth - boxWidth - 5) / 2));
  const boxIndent = " ".repeat(boxPadding);

  const centerText = (text: string) => {
    const padding = Math.max(0, Math.floor((boxWidth - text.length) / 2)) + 4;
    return boxIndent + " ".repeat(padding) + text;
  };

  return [
    "",
    centerText("\x1b[93mWelcome, explorer...\x1b[0m"), // Yellow text
    centerText("\x1b[96mYou have entered a realm where ideas become reality.\x1b[0m"), // Cyan text
    "",
    boxIndent + "\x1b[94m┌───────────────────────────────────────────────────────────────────────┐\x1b[0m",
    boxIndent + "\x1b[94m│                                                                       │\x1b[0m",
    boxIndent + `\x1b[94m│\x1b[0m  \x1b[92m🚀 Projects\x1b[0m                      \x1b[95m💬  Contact\x1b[0m                           \x1b[94m│\x1b[0m`,
    boxIndent + `\x1b[94m│\x1b[0m   View my past work                Get in touch with me               \x1b[94m│\x1b[0m`,
    boxIndent + "\x1b[94m│                                                                       │\x1b[0m",
    boxIndent + `\x1b[94m│\x1b[0m  \x1b[93m📖 About\x1b[0m                         \x1b[96m📦  Deploy\x1b[0m                            \x1b[94m│\x1b[0m`,
    boxIndent + `\x1b[94m│\x1b[0m   Learn more about me              Click here for Visual Portfolio    \x1b[94m│\x1b[0m`,
    boxIndent + "\x1b[94m│                                                                       │\x1b[0m",
    boxIndent + `\x1b[94m│\x1b[0m  \x1b[91m🎮 Hidden Secrets\x1b[0m                \x1b[97m❓  Help\x1b[0m                              \x1b[94m│\x1b[0m`, 
    boxIndent + `\x1b[94m│\x1b[0m   Hidden surprises await           Type '\x1b[92mhelp\x1b[0m' to see commands        \x1b[94m│\x1b[0m`,
    boxIndent + "\x1b[94m│                                                                       │\x1b[0m",
    boxIndent + "\x1b[94m└───────────────────────────────────────────────────────────────────────┘\x1b[0m",
    "",
  ];
};


export const availableCommands = ["ls", "projects", "about", "contact", "contacts", "help"];

export const fullPrompt = 'portfolio@vishal.varshney ~$ \u200B';
