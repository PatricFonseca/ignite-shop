import { stripe } from '@/lib/stripes'

import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Stripe from 'stripe'
import { useShoppingCart } from 'use-shopping-cart'
import { Product as ProductType } from 'use-shopping-cart/core'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/product'

type ProductT = ProductType & {
  // id: string
  name: string
  imageUrl: string
  price: string
  description: string
  // price_id: string
  // defaultPriceId: string
}

type ProductProps = {
  product: ProductT
  // product: {
  //   id: string
  //   name: string
  //   imageUrl: string
  //   price: string
  //   description: string
  //   defaultPriceId: string
  // }
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const { addItem } = useShoppingCart()

  // async function handleBuyProduct() {
  //   try {
  //     setIsCreatingCheckoutSession(true)
  //     const response = await axios.post('/api/checkout', {
  //       priceId: product.defaultPriceId,
  //     })

  //     const { checkoutUrl } = response.data

  //     window.location.href = checkoutUrl
  //   } catch (error) {
  //     // conectar com uma ferramenta de observabilidade(datadog / sentry)
  //     setIsCreatingCheckoutSession(false)
  //     alert('Falha ao redirecionar ao checkout!')
  //   }
  // }
  function handleAddProductToCart() {
    try {
      setIsCreatingCheckoutSession(true)
      addItem(product, { count: 1 })
      setIsCreatingCheckoutSession(false)
    } catch (error) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao adicionar produto ao carrinho!')
    }
  }

  const { isFallback } = useRouter()

  if (isFallback) {
    return <p>loading...</p>
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>

          <button
            onClick={handleAddProductToCart}
            disabled={isCreatingCheckoutSession}
          >
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { productId: 'prod_O7rN3UjcmuceWV' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<
  any,
  { productId: string }
> = async ({ params }) => {
  const productId = params?.productId ?? ''

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price
  price.unit_amount = price.unit_amount ?? 0

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        description: product.description,
        price_id: price.id,
        // defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
