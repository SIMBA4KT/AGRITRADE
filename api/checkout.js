require('dotenv').config();
const express = require('express');
const cors = require('cors');

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
    console.error('Missing Stripe secret key. Create a .env file with STRIPE_SECRET_KEY=your_key');
    process.exit(1);
}

const stripe = require('stripe')(stripeSecretKey);
const app = express();
app.use(express.json());
app.use(cors()); 

app.post('/create-checkout-session', async (req, res) => {
    try {
        const origin = req.headers.origin || 'http://127.0.0.1:5500';
        const { items } = req.body;

        const lineItems = items.map(item => {
            const productData = {
                name: item.name || 'AgriTrade item'
            };

            if (item.image) {
                const imageUrl = item.image.startsWith('http')
                    ? item.image
                    : `${origin}/${item.image.replace(/^\.\.(\/)+/, '')}`;
                productData.images = [imageUrl];
            }

            return {
                price_data: {
                    currency: 'kes',
                    product_data: productData,
                    unit_amount: Math.round((item.price || 0) * 100),
                },
                quantity: 1,
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${origin}/pages/success.html`,
            cancel_url: `${origin}/pages/cart.html`,
        });

        res.json({ id: session.id, url: session.url });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Stripe checkout API listening on port ${port}`);
    });
}

module.exports = app;