
# Google NotebookLM Clone Client

A frontend React application that mimics the interface and functionality of
Google NotebookLM, focusing on PDF viewing and annotation using modern web technologies like Tailwind CSS, React Router, and PDF.js.

---

## 📑 Table of Contents

- [Google NotebookLM Clone Client](#google-notebooklm-clone-client)
  - [📑 Table of Contents](#-table-of-contents)
  - [🚀 Features](#-features)
  - [📦 Installation](#-installation)
  - [🛠️ Development Setup](#️-development-setup)
  - [📖 Usage](#-usage)
  - [📚 Dependencies](#-dependencies)
  - [📜 Available Scripts](#-available-scripts)
  - [🧱 Project Structure](#-project-structure)
  - [📝 License](#-license)

---

## 🚀 Features

- PDF viewing using `@react-pdf-viewer`
- Clean UI powered by TailwindCSS and DaisyUI
- Navigation with React Router
- Modern build setup with Vite
- Axios for API communication
- Icon support via Lucide and React Icons

---

## 📦 Installation

Make sure you have **Node.js (v18+)** and **npm** or **yarn** installed.

1. **Clone the repository**:

**Client side**
   ```bash
   git clone https://github.com/shahalimshompod/google_notebookLM_clone_client.git
   cd google_notebooklm_clone_client
   ```

**Server side**
   ```bash
   git clone https://github.com/shahalimshompod/google_notebookLM_clone_server.git
   cd google_notebooklm_clone_client
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

---

## 🛠️ Development Setup

Start the development server with hot module replacement:

```bash
npm run dev
# or
yarn dev
```

Access the app at `http://localhost:5173/` (default Vite port).

---

## 📖 Usage

Visit the live deployed version here:  
🔗 **[notebooklm-clone-e2335.web.app](https://notebooklm-clone-e2335.web.app/)**

After starting the development server, you can:

- Upload and view PDF documents
- Navigate through the app using the sidebar or top nav
- Experience responsive design and a smooth developer experience

---

## 📚 Dependencies

> Production dependencies:

- **React** `^19.1.0`
- **React DOM** `^19.1.0`
- **React Router** `^7.7.1`
- **Axios** `^1.11.0`
- **Tailwind CSS** `^4.1.11`
- **PDF.js** (`pdfjs-dist`) `^3.4.120`
- **@react-pdf-viewer/core** & `default-layout` `^3.12.0`
- **Lucide React** `^0.525.0`
- **React Icons** `^5.5.0`

> Development dependencies:

- **Vite** `^7.0.6`
- **ESLint** and plugins
- **DaisyUI** `^5.0.47`
- **@vitejs/plugin-react`
- **TypeScript types** for React

---

## 📜 Available Scripts

| Script    | Description                      |
| --------- | -------------------------------- |
| `dev`     | Start local development server   |
| `build`   | Build project for production     |
| `preview` | Preview production build locally |
| `lint`    | Run ESLint on the project files  |

Run them using:

```bash
npm run <script-name>
# or
yarn <script-name>
```

---

## 🧱 Project Structure

```
google_notebooklm_clone_client/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── styles/
│   └── main.tsx (or index.tsx)
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

*(Structure may vary depending on your implementation.)*

---

## 📝 License

This project is private and not intended for public use or distribution.

---
```
