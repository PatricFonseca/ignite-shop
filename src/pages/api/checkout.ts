// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { stripe } from '@/lib/stripes'
import type { NextApiRequest, NextApiResponse } from 'next'
// import { CartEntry } from 'use-shopping-cart/core'

type Data = {
  checkoutUrl?: string | null
  error?: string
}

interface Item {
  priceId: string
  quantity: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { cart } = req.body
  // const { priceId } = req.body

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  // TODO: Adicionar proteção pro cart
  // TODO: Criar tipo pro request no map

  // if (!priceId) {
  //   return res.status(400).json({ error: 'Price not found.' })
  // }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const products = cart.map((item: Item) => {
    return { price: item.priceId, quantity: item.quantity }
  })

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: products,
    /* [
      { price: priceId,
        quantity: 1,
      }
      ] */
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
