// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { stripe } from '@/lib/stripes'
import { Product } from 'use-shopping-cart/core'
import type { NextApiRequest, NextApiResponse } from 'next'
// import { CartEntry } from 'use-shopping-cart/core'

type Data = {
  checkoutUrl?: string | null
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  console.log('req', req.body)

  const { cart } = req.body
  // const { priceId } = req.body

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  // if (!priceId) {
  //   return res.status(400).json({ error: 'Price not found.' })
  // }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  // const products = cart.map((item: Product) => {
  //   return item.product_data
  // })
  const products = cart.map((item) => {
    return { price: item.priceId, quantity: item.quantity }
  })

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: products,
    // price: priceId,
    /*    quantity: 1,
    },
     */
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
