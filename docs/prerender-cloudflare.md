# Prerender.io Cloudflare Worker

This project stays hosted on Hostinger. Cloudflare only sits in front of the domain and runs the Worker for crawler traffic.

## One-time Cloudflare setup

1. Add `dmrsoaps.com` to Cloudflare.
2. Copy the existing Hostinger DNS records before changing nameservers.
3. Point the registrar nameservers to the two Cloudflare nameservers.
4. In Cloudflare DNS, keep the Hostinger origin record and set the web record to **Proxied**.
5. If `www.dmrsoaps.com` is active, add or preserve its DNS record and keep it **Proxied**.
6. In Cloudflare, allow AI crawlers if AI-search visibility is desired.

## Worker deployment

Authenticate Wrangler:

```sh
npx wrangler login
```

Store the Prerender token as a Cloudflare secret. Do not commit it to the repo.

```sh
npm run cloudflare:secret
```

Deploy the Worker and routes:

```sh
npm run cloudflare:deploy
```

In the Cloudflare dashboard, set the Worker route failure mode to **Fail open (proceed)**.

## Verification

Check that normal visitors still receive the Hostinger site:

```sh
curl -I https://dmrsoaps.com/
curl -I https://dmrsoaps.com/productos.html
```

Check that crawler traffic is intercepted by Prerender:

```sh
curl -A "Googlebot" -I https://dmrsoaps.com/productos.html
curl -A "Googlebot" -I "https://dmrsoaps.com/productos.html?producto=6"
```

The integration is working when the crawler responses include `x-prerender-request-id`, and pages appear in the Prerender.io dashboard cache.

