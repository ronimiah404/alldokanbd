# Alldokan.com — E-commerce starter

A responsive Next.js storefront concept for an e-commerce test launch in Bangladesh.

## Included
- Responsive storefront and product category filters
- Search across sample product names, categories, and descriptions
- Add to cart, quantity updates, item removal, delivery calculation
- Demo checkout with customer details and Cash on Delivery selection
- Demo orders saved to the current browser's localStorage
- No API keys or environment variables required for the demo

## Run locally
Requirements: Node.js 18.17+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel
1. Create a GitHub repository and upload the contents of this project (the files inside the `alldokan-vercel` folder, not the ZIP itself).
2. In Vercel, choose **Add New → Project** and import the repository.
3. Keep the detected framework as **Next.js** and deploy.
4. In Vercel project settings, add `alldokan.com` and `www.alldokan.com` under **Settings → Domains**.
5. Follow the DNS records Vercel displays at your domain registrar. Set the preferred domain and wait for DNS/SSL to finish provisioning.

## Important before accepting real orders
This is a functional frontend/demo checkout, not a production commerce backend. Demo orders are stored only in the shopper's browser and are not sent to the store owner. Do not rely on this for real orders. Before launch, connect:
- A server-side database and order API (e.g. PostgreSQL/Supabase)
- Admin authentication and product/order management
- Order notifications (email/SMS/WhatsApp)
- A real payment provider if you want online payments
- Delivery policy, returns policy, privacy policy, and customer support details

Product images are currently tasteful emoji-style placeholders, and the products/prices are sample data. Replace them with your actual inventory and product photography before launch.
