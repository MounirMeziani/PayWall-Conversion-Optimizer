import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { z } from 'zod';
import Stripe from 'stripe';
import path from 'path';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Schemas for validation
const EventSchema = z.object({
  type: z.enum(['impression', 'conversion']),
  variant: z.enum(['a', 'b', 'c', 'd']),
  url: z.string().url(),
  planId: z.string().optional(),
  timestamp: z.string().datetime(),
});

type EventData = z.infer<typeof EventSchema>;

// Event tracking endpoint
app.post('/events', async (req: Request, res: Response) => {
  try {
    const eventData = EventSchema.parse(req.body);
    
    console.log('Event received:', eventData);
    
    // In a real implementation, you would save this to a database
    // Here's a placeholder:
    /*
    await prisma.event.create({
      data: {
        type: eventData.type,
        variant: eventData.variant,
        url: eventData.url,
        planId: eventData.planId,
        timestamp: new Date(eventData.timestamp),
      },
    });
    */
    
    // If it's a conversion, you might want to notify via webhooks
    if (eventData.type === 'conversion') {
      await notifyConversion(eventData);
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing event:', error);
    res.status(400).json({ error: 'Invalid event data' });
  }
});

// Get variant content
app.get('/variant', (req: Request, res: Response) => {
  const variant = req.query.variant || 'a';
  
  // In a real implementation, you would load the appropriate content for the variant
  // from a database or CMS. For now, we'll return placeholder HTML.
  
  const variantContent = {
    a: `
      <div class="paywall-variant-a">
        <h2>Upgrade to Premium</h2>
        <p>Get access to all features with our premium plan.</p>
        <button data-plan-id="premium_monthly">Subscribe Now - $29/month</button>
      </div>
    `,
    b: `
      <div class="paywall-variant-b">
        <div class="blurred-content">
          <h2>This content is exclusive to premium members</h2>
          <p>Subscribe now to unlock this and all other premium content.</p>
          <button data-plan-id="premium_annual">Get Premium Access - $290/year</button>
        </div>
      </div>
    `,
  };
  
  res.status(200).json({
    variant,
    html: variantContent[variant as 'a' | 'b'] || variantContent.a,
  });
});

// Stripe webhook handler
app.post('/webhook', async (req: Request, res: Response) => {
  const signature = req.headers['stripe-signature'] as string;
  
  if (!signature) {
    return res.status(400).send('Missing stripe-signature header');
  }
  
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
    
    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        await handleSuccessfulPayment(session);
        break;
        
      case 'customer.subscription.created':
        const subscription = event.data.object as Stripe.Subscription;
        await handleNewSubscription(subscription);
        break;
        
      case 'customer.subscription.deleted':
        const cancelledSubscription = event.data.object as Stripe.Subscription;
        await handleCancelledSubscription(cancelledSubscription);
        break;
        
      // Add more event handlers as needed
    }
    
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(400).send(`Webhook Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
});

// Helper function to send notifications about conversions
async function notifyConversion(eventData: EventData) {
  // Slack webhook notification
  if (process.env.SLACK_WEBHOOK_URL) {
    try {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: `🎉 New conversion from variant ${eventData.variant}!${eventData.planId ? ` Plan: ${eventData.planId}` : ''}`,
        }),
      });
    } catch (error) {
      console.error('Error sending Slack notification:', error);
    }
  }
  
  // Discord webhook notification
  if (process.env.DISCORD_WEBHOOK_URL) {
    try {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: `💸 New conversion from variant ${eventData.variant}!${eventData.planId ? ` Plan: ${eventData.planId}` : ''}`,
        }),
      });
    } catch (error) {
      console.error('Error sending Discord notification:', error);
    }
  }
}

// Handler for successful Stripe payments
async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  console.log('Payment succeeded:', session);
  
  // In a real implementation, you would update your database
  // to mark the customer as paid, provision access, etc.
}

// Handler for new subscriptions
async function handleNewSubscription(subscription: Stripe.Subscription) {
  console.log('New subscription:', subscription);
  
  // In a real implementation, you would update your database
  // with the new subscription details
}

// Handler for cancelled subscriptions
async function handleCancelledSubscription(subscription: Stripe.Subscription) {
  console.log('Subscription cancelled:', subscription);
  
  // In a real implementation, you would update your database
  // to reflect the cancellation
}

// Start the server
app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});

export default app; 