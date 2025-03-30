import { Terminal } from "xterm";
import highlightDynamicLinks from "./highlightDynamicLinks";

const TypeAnimation = async (term: Terminal, input: string | string[]) => {

  const messages = Array.isArray(input) ? input : [input];

  for (const message of messages) {
    for (const char of message) {
      highlightDynamicLinks(term, char);
      await new Promise((resolve) => setTimeout(resolve, 20)); 
    }
    term.write("\r\n");
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
};

export default TypeAnimation;
