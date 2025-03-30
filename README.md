<!-- # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
# terminal-portfolio -->

# Vishal Varshney's Terminal Portfolio

Welcome to my interactive terminal-based portfolio! This project is designed to provide a unique and engaging way to showcase my work and experience. 

## About Me
I am Vishal Varshney, a passionate developer specializing in AI and web development. I love building innovative solutions that push the boundaries of technology.

## Features
- **Fully customizable** – Modify commands and responses easily through a JSON file.
- **Terminal UI** – Experience a Linux-like terminal interface for navigation.
- **Dynamic commands** – Supports custom commands like `ls projects`, `about`, and more.
- **Hidden game** – Try `sudo game` for a fun surprise!
- **Interactive links** – Open URLs or execute terminal actions directly from the interface.

## Customization
The entire portfolio can be modified using a single JSON file. You can:
- Add new commands and their responses.
- Define actions for clickable links.
- Modify the behavior of commands like opening URLs or executing text-based actions.

## Usage
Clone the repository and install dependencies:
```sh
npm install
npm run dev
```
This will start the portfolio on your local machine.

Feel free to explore and modify the project as you like. Contributions are welcome!

