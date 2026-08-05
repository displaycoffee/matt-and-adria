# Burmecia - version 3.8.0

React-based framework to create projects. It is not very "pretty" and contains very basic styles so that the template may be used as a boilerplate to create something better. [Preview here.](https://burmecia.display.coffee)

This is named after a city in the game Final Fantasy IX -- the "Realm of Eternal Rain" and home to the character Freya.

### dist

- JavaScript and styles are bundled from `src` using `npm run build` and compiled here

### public

- Static assets are stored here and copied into `dist` after running `npm run build`

### src

- Dev environment is started with `npm run dev`
- `_config` directory configures "global" settings
- Organized other directories into folders as: `components` (shared elements), `context` (context providers), `layout` (layout elements), `pages` ("major" content), and `targets`
- `targets` directory contains code that targets elements in index.html (`#index` and `#portal`)
- index.html contains a `style` block with important style rules for rendering things faster on page load

### other

- **optimize-html.js** - A helper script that runs after `npm run build`, reformatting HTML according to Lighthouse best practices
- **vite.config.js** - Main Vite config file
- **vite.sitemap.js** - Builds `sitemap.xml` which gets added to `dist` (modify as needed)
- **vite.utils.js** - Utility functions to keep the Vite config files smaller

### Built with

![Built with](https://skillicons.dev/icons?i=react,ts,js,css,sass,html,vite)<br />
Also uses ESLint and Prettier.
