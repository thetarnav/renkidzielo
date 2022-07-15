# renkidzielo

[![Netlify Status](https://api.netlify.com/api/v1/badges/214ef4b9-4d54-4a55-8004-bcd9c35edda3/deploy-status)](https://app.netlify.com/sites/renkidzielo/deploys)

Renkidzieło Website 3.0

## Development

### VSCode Settings

Add these options to your workspace `settings.json` file:

```json
{
  "prettier.documentSelectors": ["**/*.astro"],
  "[astro]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "tailwindCSS.rootFontSize": 14
}
```

### JSON Server Mock

Until Strapi backend is setup, [JSON Server](https://github.com/typicode/json-server) + [My JSON Server](https://my-json-server.typicode.com) will be used to provide mock data.

Server Endpoint: https://my-json-server.typicode.com/thetarnav/renkidzielo

