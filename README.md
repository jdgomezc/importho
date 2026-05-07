# Importho

Welcome to the official repository for **Importho**. This project is the codebase for the [importhogt.com](https://importhogt.com) website.

## 📖 About the Project

Importho is a comprehensive web catalog of products and educational courses built for **Importho**, an import company that specializes in bringing high-quality orthodontic and dental products directly from China. The website features a dynamic carousel for courses, a dedicated section for featured products, and an organized course catalog. It serves as the primary digital presence for Importho in Guatemala, providing dentists and orthodontists with a seamless and interactive experience to explore their specialized offerings.

## 🚀 Live Site

The project is deployed and accessible at: **[importhogt.com](https://importhogt.com)**

## 💻 Tech Stack

This project is built with a modern web stack, prioritizing performance, developer experience, and a beautiful UI:

- **Framework**: [Astro](https://astro.build/) - A web framework for building fast, content-focused websites.
- **UI Library**: [React](https://react.dev/) - Used for interactive components like the carousel and dialogs.
- **Styling**: [Tailwind CSS (v4)](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
- **Components**: [Radix UI](https://www.radix-ui.com/) (Headless UI) & [Embla Carousel](https://www.embla-carousel.com/) for accessible and robust interactive elements.
- **Icons**: [Lucide Icons](https://lucide.dev/) - Clean and consistent iconography.
- **Content Management**: Astro Content Collections.
- **Package Manager**: [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager.

## 🌟 About Astro

Astro is the all-in-one web framework designed for speed. It allows you to build faster websites with less client-side Javascript. It extracts your UI into smaller, isolated components and replaces unused Javascript with lightweight HTML, achieving zero Javascript by default. You can use your favorite UI frameworks (like React, Svelte, or Vue) inside your project while still shipping pure, fast HTML to the browser whenever possible. 

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`            | Installs dependencies                            |
| `pnpm dev`                | Starts local dev server at `localhost:4321`      |
| `pnpm build`              | Build your production site to `./dist/`          |
| `pnpm preview`            | Preview your build locally, before deploying     |
| `pnpm astro ...`          | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help`    | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [Astro's documentation](https://docs.astro.build) or jump into the [Discord server](https://astro.build/chat).
