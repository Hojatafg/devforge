// Netlify Function: Create Stripe Checkout Session
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    const { product, customText, petName } = body;

    const prices = {
      digital: { amount: 24900, name: 'Digitalt Portrett' },
      canvas: { amount: 59900, name: 'Canvas Portrett 30x40cm' },
      premium: { amount: 99900, name: 'Premium Innrammet 50x70cm' }
    };

    const selected = prices[product] || prices.digital;
    let totalAmount = selected.amount;
    if (product === 'premium' && customText) {
      totalAmount += 9900;
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'nok',
          product_data: {
            name: selected.name + (petName ? ` - ${petName}` : ''),
            description: customText ? `Custom tekst: ${customText}` : 'AI-generert renessanseportrett'
          },
          unit_amount: totalAmount,
        },
        quantity: 1,
      }],
      success_url: 'https://devforgelab.eu/pet-portraits/takk.html',
      cancel_url: 'https://devforgelab.eu/pet-portraits/bestill.html',
      metadata: { product, pet_name: petName || '', custom_text: customText || '' }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url })
    };

  } catch (error) {
    console.error('Stripe error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Kunne ikke opprette betaling' })
    };
  }
};
