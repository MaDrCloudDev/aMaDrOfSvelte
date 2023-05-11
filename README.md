# [aMaDrOfSvelte](https://amadrofsvelte.madr.io)

## Your definitive Prisma, Planetscale (MySQL), Lucia auth/oAuth, SvelteKit, PWA, Tailwind; Flowbite template
<br>
This is my go-to stack for building apps and websites at the moment. We have a PlanetScale (MySQL) database for the full flexability of SQL, with the nearly infinite free tier offered by PlanetScale.

We're using Prisma to manage data relationships, so we can make use of Prisma Studio directlly from our editor, and write short queries instead of raw SQL (or less favorable abstractrion).

Since SvelteKit been pushing us towards using forms for interacting with API's, we're using Lucia Auth (which uses enhanced forms). This can make things a little tricky, because it means slapping a form into the navbar for the "Sign out" button, for example. It also makes it more difficult to use notification/toast libraries because you have to toast after a redirect.

All routes are protected except for the "Components?" route; you must sign up and sign in to view them. You can sign up using any random username you'd like, there's no email or email verification.

I added oAuth as well, which you can set up by registering your app on GitHub, inputing the corect environment variables, and then providing a callback url (the api/oauth/github route). Take a look at the example.env for these variables. If you don't want to use oAuth, you can remove the functionality and code fairly easily.

I configured Tailwind and Flowbite (which is based on Tailwind) so you have some components to play around with. I generally use Tailwind by itself, but this is better for demonstration.

Both the "Projects" route and "Blog" route are querying our PlanetScale DB for data, returning JSON containing title, image, and description data, and Svelte is looping over the data and rendering it into card components.

I added a service-worker and web-manfiest, turning the app into a Progressive Web App. Users in most Chromium browers will be prompted to install the site as a PWA.

```
// First get your PlansetScale Prisma connection url from PlanetScale 
and input it into your .env file

// Then set up oAuth for your app on GitHub and input the environment 
variables into your .env file

nvm i 20
npm i

// App wont work witout generating your prisma client and pushing it 
to your DB

npx prisma generate
npx prisma db push

// App still wont work, because Projects and Blog routes are looping over
empty tables. Add some data to their tables using Prisma studio

npx prisma studio
// Add at least one project item and one blog item to the respective tables. 
The img values in each table refers to a URL

npm run dev
npm run build

// There's no node-express server here, so you need to host somewhere like 
Vercel or Netlify, which should automatically turn svelte server functions 
into serverless functions
// You may need to override the build step on these hosts and change it to
"npm install && npx prisma generate"
```
