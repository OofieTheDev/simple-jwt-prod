# A PoC JWT Web App (minimal frontend)

## :star: Intro
Recently, after not touching web dev for quite a few months, I decided to learn TailwindCSS and clean off my backend rust. Hence, I decided to make a simple webapp with minimal frontend.

I then rented a VPS and hosted the website on it, and touched `nginx` for the first time (yay!).

Spent quite a few hours, but it was well worth it, for it was very satisfying linking a website to a custom domain for the first time, as well as going through the deployment process on the VPS.

## :computer: Technical Details
I styled the frontend using my newly-learnt Tailwind CSS, and did the backend in Express.js. For authentication, I used JWT authentication instead of my usual session-based authentication, storing the JWTs in a HTTP-only secure cookie that expired after 5 minutes. I also used EJS as my template engine, which was useful for generating things such as custom error pages.

I once again had the opportunity to practice securing a new VPS, as well as configure the firewalls to allow the necessary connection and deny everything else.

I used nginx as a reverse proxy to serve my files from behind Cloudflare. I enabled mandatory HTTPS between both the client and Cloudflare as well as between Cloudflare and my nginx server, as well as authenticated origin pulls using client certificate authentication, to ensure that my server would only accept requests coming through Cloudflare.

## Fin
This was a good refresher project that allowed me to recap my backend and JWT knowledge. I also learnt how to deploy my web applications to the internet and secure them, which was an interesting learning experience.



