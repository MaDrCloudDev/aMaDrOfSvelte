# [aMaDrOfSvelte](https://amadrofsvelte.madr.io)

## Your definitive Prisma, Planetscale(MySQL), Lucia auth/oAuth, SvelteKit, PWA, Tailwind;Flowbite template

### Description/guide to come

#### I'm opening this up early so you can watch the mess

This is my go-to stack for building apps and websites at the moment. We have a PlanetScale (MySQL) database for the full flexability of SQL, with the nearly infinite free tier offered by PlanetScale.

We're using Prisma to manage data relationships, so we can make use Prisma Studio directlly from from our editor, and so we can write short queries instead of raw SQL.

Since SvelteKit has pushed us towards using forms for interacting with API's, we're using Lucia Auth (which uses enhanced forms). This can make things a little tricky, because it means injecting a form into the navbar for the "Sign out" button, for example. It also makes it more difficult to make use of notification/toast libraries because you have to toast after a redirect.

I added oAuth as well, which you can set up by registering your app on GitHub, inputing the corect environment variables, and then providing a callback url (the api/oauth/github route).

I added Tailwind and Flowbite (which is based on Tailwind) so you'd have some components to play around with. I generally use Tailwind by itself, but this is better for demonstration.

Both the projects page and blog page are querying PlanetScale for data, returning a list containing title, image, and description data, and then looping over the data and rendering it into card components.

I added a service-worker and web-manfiest, meaning the app is also a Progressive Web App, and users in most Chromium browers will be prompted to install the site as a PWA.

More soon.
