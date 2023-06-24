// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { stripe } from '@/lib/stripes'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  checkoutUrl: string | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const priceId = 'price_1NLbewAGw99nozfPc4wtuZ9F'

  const successUrl = `${process.env.NEXT_URL}/success`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
