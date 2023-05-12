# [aMaDrOfSvelte](https://amadrofsvelte.madr.io)

## Your definitive Prisma, Planetscale (MySQL), Lucia auth/oAuth, SvelteKit, PWA, Tailwind; Flowbite template.

## Features

- PlanetScale (MySQL) Database
- Prisma for ORM and query building
- Lucia auth with oAuth for easy user authentication
- SvelteKit for the best frontend developer experience
- Pre-configured with Tailwind and Flowbite for easy-to-use components
- Service-worker and web-manfiest for full PWA compadibility
- The full-stack template a single developer can manage; all from their front-end
- Hosted on Vercel with serverless functions

---

## Requirements

- [Node.js](https://nodejs.org/) v18+
- PlanetScale
- Prisma
- Vercel

## Getting Started

[Generate](https://github.com/madrclouddev/amadrofsvelte/generate) a new project
from this template, update
environment variables in your .env:

```
git clone https://github.com/madrclouddev/amadrofsvelte.git amadrofsvelte
cd amadrofsvelte
nvm i 20
npm i

// First get your PlansetScale Prisma connection url from PlanetScale 
and input it into your .env file

// Then set up oAuth for your app on GitHub and input the environment 
variables into your .env file

// App wont work witout generating your prisma client and pushing it 
to your DB

npx prisma generate
npx prisma db push

// App still wont work, because Projects and Blog routes are looping over
empty data tables. Add some data to their tables using Prisma studio

npx prisma studio

// Add at least one project item and one blog item to the respective tables. 
The img values in each table refers to a URL

npm run dev
npm run build
```

## How to Deploy

Ensure that all the environment variables are correct.

There's no node-express server here, so you need to
host somewhere like Vercel or Netlify, which should 
automatically turn Svelte server functions into 
serverless functions.

You likely need to override your host's build step; changing 
it to "npm install && npx prisma generate" rather than simply
"npm insstall".

