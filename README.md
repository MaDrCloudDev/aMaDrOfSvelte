# [aMaDrOfSvelte](https://amadrofsvelte.madr.io)

## Your definitive Prisma, Planetscale(MySQL), Lucia auth/oAuth, SvelteKit, PWA, Tailwind;Flowbite template
<br>
This is my go-to stack for building apps and websites at the moment. We have a PlanetScale (MySQL) database for the full flexability of SQL, with the nearly infinite free tier offered by PlanetScale.

We're using Prisma to manage data relationships, so we can make use of Prisma Studio directlly from our editor, and so we can write short queries instead of raw SQL.

Since SvelteKit has pushed us towards using forms for interacting with API's, we're using Lucia Auth (which uses enhanced forms). This can make things a little tricky, because it means injecting a form into the navbar for the "Sign out" button, for example. It also makes it more difficult to use notification/toast libraries because you have to toast after a redirect. All routes are protected except for the "Components?" route.

I added oAuth as well, which you can set up by registering your app on GitHub, inputing the corect environment variables, and then providing a callback url (the api/oauth/github route). Take a look at the example.env for these variables.

I added Tailwind and Flowbite (which is based on Tailwind) so you'd have some components to play around with. I generally use Tailwind by itself, but this is better for demonstration.

Both the "Projects" route and "Blog" route are querying PlanetScale for data, returning JSON containing title, image, and description data, then looping over the data and rendering it into card components.

I added a service-worker and web-manfiest, meaning the app is also a Progressive Web App, and users in most Chromium browers will be prompted to install the site as a PWA.

```
nvm i 20
npm i
npx prisma generate
npx prisma db push
npx prisma studio
npm run dev
```
