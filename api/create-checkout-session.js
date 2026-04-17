// api/create-checkout-session.js

const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');

const app = express();
const stripe = new Stripe('YOUR_SECRET_KEY');

app.use(cors());
app.use(express.json());

// Validate line items function
function validateLineItems(line_items) {
    if (!Array.isArray(line_items)) {
        return false;
    }
    for (const item of line_items) {
        if (!item.price || !item.quantity) {
            return false;
        }
    }
    return true;
}

app.post('/create-checkout-session', async (req, res) => {
    const { line_items } = req.body;

    if (!validateLineItems(line_items)) {
        return res.status(400).json({ error: 'Invalid line items' });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/cancel`,
        });
        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;