<!-- cart.html -->
<div class="cart-summary">
    <div class="total-info">
        <p>Total Amount</p>
        <h3>KES <span id="total-price">0</span></h3>
    </div>
    
    <!-- AUTH GATE FORM: Hidden by default -->
    <div id="payment-auth-form" style="display:none; margin: 15px 0; border-top: 1px solid #eee; pt: 10px;">
        <p style="font-size: 0.85rem; color: #444; margin-bottom: 8px;">Please verify your account to pay:</p>
        <input type="text" id="pay-username" placeholder="Username" style="width:100%; margin-bottom:8px; padding:10px; border:1px solid #ddd; border-radius:4px;">
        <input type="password" id="pay-password" placeholder="Password" style="width:100%; margin-bottom:8px; padding:10px; border:1px solid #ddd; border-radius:4px;">
    </div>
    
    <button id="checkout-btn" class="checkout-btn">Proceed to Payment</button>
</div>

<!-- Load Auth Service First -->
<script src="../js/services/auth.js"></script>
<script src="../js/cart.js"></script>
