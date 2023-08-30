import React from 'react'
import Head from 'next/head'
import Stripe from 'stripe'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { HomeContainer, ItemProduct, CartButton } from '@/styles/pages/home'

import { stripe } from '@/lib/stripes'
import { Handbag } from '@phosphor-icons/react'
import { useShoppingCart } from 'use-shopping-cart'
import { Product } from 'use-shopping-cart/core'

// import cartIcon from '@/assets/cartIcon.svg'

type ProductProps = Product & {
  name: string
  imageUrl: string
}

interface HomeProps {
  products: ProductProps[]
  activeSideCheckout: boolean
  setActiveSideCheckout: () => void
  // products: {
  //   id: string
  //   name: string
  //   imageUrl: string
  //   price: string
  //   price_id: string
  // }[]
}

export default function Home({ products }: HomeProps) {
  // const [sideMenuOpen, setSideMenuOpen] = useState(false)
  const { addItem } = useShoppingCart()
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    },
  })

  function handleClickProduct(
    e: React.MouseEvent<HTMLElement>,
    product: Product,
  ) {
    e.preventDefault()
    addItem(product, { count: 1 })
  }

  return (
    <>
      <Head>
        <title>Home | Ignite shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products?.map((product) => {
          return (
            <>
              {/* <DebugCart /> */}
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                prefetch={false}
              >
                <ItemProduct className="keen-slider__slide">
                  <Image
                    src={product.imageUrl}
                    width={520}
                    height={480}
                    placeholder="blur"
                    blurDataURL={product.imageUrl}
                    alt=""
                  />
                  <footer>
                    <div>
                      <strong>{product.name}</strong>
                      <span>{product.formattedPrice}</span>
                    </div>
                    <CartButton onClick={(e) => handleClickProduct(e, product)}>
                      <Handbag size={32} weight="bold" />
                      {/* <Image src={cartIcon} alt="" /> */}
                    </CartButton>
                  </footer>
                </ItemProduct>
              </Link>
            </>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price
    price.unit_amount = price.unit_amount ?? 0

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      formattedPrice: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
      price_id: price.id,
      price: price.unit_amount / 100,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
