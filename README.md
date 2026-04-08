<h1>AgriTrade: Unified browseProducts & Service Platform</h1>
AgriTrade is a comprehensive digital system designed to bridge the gap between clients , service providers, and rural farmers. The platform allows clients to request professional services and purchase goods, while providing a dedicated browseProducts for farmers to trade produce directly.

<h2>Key Features </h2>
<h3>🛒 For Clients (Buyers)</h3>

Service Requests: A dedicated portal to request specific professional or labor-based services.

Instant Purchase: Standard e-commerce flow for retail items with a shopping cart and checkout.

Order Tracking: Real-time updates on purchase status and service fulfillment.

<h3>For Farmers (Sellers & Buyers)</h3>

Produce Listing: Farmers can list their harvests (e.g., maize, vegetables, livestock) with pricing and quantity.

Inventory Management: Simple dashboard to track available stock and sales history.

Input Sourcing: Farmers can also act as buyers to purchase seeds, fertilizers, or tools from the retail section.

<h2> Tech Stack 🛠️</h2>
Frontend: Javascript ,Html

Styling: Tailwind CSS v4 .

Backend-as-a-Service: Firebase

Authentication: Secure Google & Email/Password login.

Storage: Image hosting for produce and profile photos.

Deployment: Vercel

Stripe Integration:
- Copy `.env.example` to `.env` and set your `STRIPE_SECRET_KEY`.
- Run `npm install` in the project root.
- Start the backend with `npm start`.
- Open the site through a local HTTP server (e.g. Live Server) and use the cart checkout button to test Stripe.
