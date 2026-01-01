# BlueSchema Editor

Visual editor for creating and managing BlueSchema definitions. This tool provides an intuitive interface to build schemas without writing JSON manually.

## 🚀 Quick Start (Users)

After cloning the BlueSchema repository, follow these steps to run the editor:

### 1. Navigate to the editor directory

```bash
cd utils/schema-editor
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the editor

```bash
npm run serve
```

This will automatically open the editor in your default browser at `http://localhost:5173`.

Alternatively, you can use:

```bash
npm run dev
```

And then manually open `http://localhost:5173` in your browser.

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

The compiled files will be in the `dist/` directory, ready to be deployed to any static hosting service.

To preview the production build locally:

```bash
npm run preview
```

## ✨ Features

- **Visual Schema Builder**: Create schemas using a graphical interface
- **Real-time JSON Preview**: See your schema as JSON while editing
- **Component Library**: Pre-built components for common schema patterns
- **Validation**: Automatic validation of schema structure
- **Import/Export**: Load existing schemas or export your work

## 🛠️ Development

### Requirements

- Node.js v20.19.0 or v22.12.0+
- npm 9.0+

### Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension

### Available Scripts

- `npm run serve` - Start dev server and open browser
- `npm run dev` - Start dev server only
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking

### Browser DevTools

For better debugging experience, install Vue.js devtools:

- **Chrome/Edge/Brave**: [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- **Firefox**: [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

## 📚 Tech Stack

- Vue 3 + TypeScript
- Vite
- Pinia (state management)
- Tailwind CSS
- Lucide Icons
