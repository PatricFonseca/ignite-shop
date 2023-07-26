import type { AppProps } from 'next/app'
import { useState } from 'react'
import { Roboto_Flex as RobotoFlex } from 'next/font/google'
import { Handbag } from '@phosphor-icons/react'
import { globalStyles } from '@/styles/global'
import logo from '@/assets/logo.svg'
import Image from 'next/image'
import { Container, Header, CartButton } from '@/styles/pages/app'
import { CartProvider } from 'use-shopping-cart'

const roboto = RobotoFlex({ subsets: ['latin'] })

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const [isEmptyCart, setIsEmptyCart] = useState(true)
  const [activeSideCheckout, setActiveSideCheckout] = useState(false)

  function handleCartButton() {
    setActiveSideCheckout(!activeSideCheckout)
  }

  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.STRIPE_PUBLIC_KEY as string}
      successUrl="stripe.com"
      cancelUrl="twitter.com/dayhaysoos"
      currency="BRL"
      allowedCountries={['US', 'GB', 'CA']}
      billingAddressCollection={true}
      shouldPersist={true}
    >
      <Container className={roboto.className}>
        <Header>
          <Image src={logo} alt="" />
          <CartButton
            className={`${!isEmptyCart && 'active'}`}
            onClick={handleCartButton}
          >
            <Handbag size={32} weight="bold" />
            {!isEmptyCart && <span>3</span>}
          </CartButton>
        </Header>

        <Component
          {...pageProps}
          activeSideCheckout={activeSideCheckout}
          setActiveSideCheckout={handleCartButton}
        />
      </Container>
    </CartProvider>
  )
}
