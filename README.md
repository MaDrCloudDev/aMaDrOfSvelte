# [aMaDrOfSvelte](https://amadrofsvelte.madr.io)

### **UPDATE:**

PlanetScale got rid of their free-tier, so the demo no longer works, but you can still use this repository as reference for fullstack SvelteKit applications. I've been wanting to use Drizzle over Prisma for awhile now, and I'm working on the new SvelteKit2, Svelte5, Drizzle, Lucia, Turso version of this app. I'm still not sure if I'm going to make it a new project, version it, or push STRAIGHT TO MAIN in this repo, replacing the old version. We'll see.

---

### A small, decisive full-stack SvelteKit template stater featuring: Prisma, Planetscale (MySQL), Lucia auth w/ GitHub oAuth, & Tailwind w/ Flowbite components 

#### aMaDrOfSvelte lets you manage your database, your "server" (serverless functions), your APIs, and and your front-end all from the same the codebase - using the same language - by merely typing a few commands into your terminal

##### A modern, contained full-stack template manageable by solo developers

---
## Features

- PlanetScale (MySQL) Database. More flexible than NoSQL, but just as easy to use thanks to Prisma
- Prisma for ORM, query building, and dead-simple data manipulation. Just type "npx prisma studio"
- Lucia auth with oAuth for easy user authentication. GitHub oAuth pre-configued; remove it if you want simple sign-in
- SvelteKit for the best frontend developer experience. It just works, and I end up typing half as much code as React
- Pre-configured with Tailwind and Flowbite for easy-to-use components. Try the Flowbite components, or remove it and use regular Tailwind
- Service-worker and web-manfiest for full PWA compadibility. Edit them to fit your sites constraints
- The full-stack template a single developer can manage; all from their front-end
- Hosted on Vercel using autodetected serverless functions

---
## Learn SvelteKit!

I've added [slug]-based routing to the Blog and Projects route. Now, when you click respective blog and project links, you're taken to a dynamic route based on their ID, which then uses that ID parameter to load in the appropriate data from the database.

---
## Requirements

- [PlanetScale](https://planetscale.com/)
- [Prisma](https://www.prisma.io/)
- [Lucia Auth](https://lucia-auth.com/)
- [Vercel](https://vercel.com/)
- [Flowbite](https://flowbite-svelte.com/)

---
## Getting Started

[Generate](https://github.com/madrclouddev/amadrofsvelte/generate) a new project
from this template, update
environment variables in your .env:
don't have a .env in your root folder?
create one!

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

---
## How to Deploy

Ensure that all the environment variables in your .env are correct.

There's no node-express server here, so you need to
host somewhere like Vercel or Netlify, which should
automatically turn the SvelteKit server functions into
serverless functions.

You likely need to override your host's build step; changing
it to "npm install && npx prisma generate" rather than simply
"npm install".

---

### Notes

The "logged in" toast is just something I cobbled together. It will always refire when you visit the homepage (a protected route). I'm not returning any feedback/error for unlogged-in users visistng protected routes (the app simply won't work if you aren't logged in - except for the compoenents route - which is unprotected). I'm looking for a flash notifcation that works with forms and serverless functions. I'll update when I find a suitable solution.

It's a work in progress... will add some form of CRUD when I get a chance, probably a guestbook.
