import { Terminal, ILink, ILinkProvider } from "xterm";
import prompts from "../assets/templates/prompts.json";

// Define the structure of LINK entries
interface LinkEntry {
  type: string;
  value: string;
  key: string;
}

const highlightDynamicLinks = (term: Terminal, text: string) => {
  const linkEntries: LinkEntry[] = prompts.HIDDEN.LINKS || [];
  if (linkEntries.length === 0) return text; // No links to process

  console.log("🔍 Processing latest output:", text);

  // Create a Map for efficient lookups
  const linkMap = new Map<string, LinkEntry>();
  linkEntries.forEach(({ key, ...rest }) => linkMap.set(key, { key, ...rest }));

  let formattedText = text;

  // Regex pattern to match any keyword
  const keywords = [...linkMap.keys()];
  const regex = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");

  // Apply ANSI styling (Italic) to matching words
  formattedText = formattedText.replace(regex, (match) => `\x1B[3m${match}\x1B[0m`);

  term.write(formattedText);

  // Define the link provider
  const provider: ILinkProvider = {
    provideLinks: (lineNumber, callback) => {
      const links: ILink[] = [];
      const line = term.buffer.active.getLine(lineNumber - 1)?.translateToString() || "";

      // Ignore user-typed command lines
      const promptPrefix = "portfolio@vishal.varshney ~$ ";
      if (line.startsWith(promptPrefix)) {
        callback([]);
        return;
      }

      let match: RegExpExecArray | null;
      while ((match = regex.exec(line)) !== null) {
        const keyword = match[0];
        const linkEntry = linkMap.get(keyword);
        if (!linkEntry) continue; // Skip if not in the map

        const { type, value } = linkEntry;
        const startIndex = match.index;
        const endIndex = regex.lastIndex;

        const link: ILink = {
          range: {
            start: { x: startIndex + 1, y: lineNumber },
            end: { x: endIndex + 1, y: lineNumber },
          },
          text: keyword,
          activate: () => {
            if (type === "URL") {
              window.open(value, "_blank"); // Open in new tab
            } else {
              term.write(`${value}`); // Execute command
            }
          },
        };
        links.push(link);
      }

      callback(links);
    },
  };

  term.registerLinkProvider(provider);
  return formattedText;
};

export default highlightDynamicLinks;
