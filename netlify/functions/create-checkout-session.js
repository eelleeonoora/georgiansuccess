const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Course Purchase' },
            unit_amount: 2000, // $20 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://georgiansuccess.com/success.html',
      cancel_url: 'https://georgiansuccess.com/cancel.html',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
