import type { AppProps } from 'next/app'
import { useState } from 'react'
import { Roboto_Flex as RobotoFlex } from 'next/font/google'
import { globalStyles } from '@/styles/global'
import logo from '@/assets/logo.svg'
import Image from 'next/image'
import { Container, Header } from '@/styles/pages/app'
import { CartProvider } from 'use-shopping-cart'
import CartButton from '@/components/CartButton'
import { SideCheckout } from '@/components/SideCheckout'

// CartButton

const roboto = RobotoFlex({ subsets: ['latin'] })

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  // const { cartCount } = useShoppingCart()
  // const [isEmptyCart, setIsEmptyCart] = useState(true)
  const [activeSideCheckout, setActiveSideCheckout] = useState(false)

  // useEffect(() => {
  //   setIsEmptyCart((cartCount || 0) > 0)
  // }, [cartCount])

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
        <SideCheckout
          open={activeSideCheckout}
          setActiveSideCheckout={setActiveSideCheckout}
        />
        <Header>
          <Image src={logo} alt="" />
          <CartButton setActiveCartButton={setActiveSideCheckout} />
          {/* <CartButton
            className={`${!isEmptyCart && 'active'}`}
            onClick={handleCartButton}
          >
            <Handbag size={32} weight="bold" />
            {!isEmptyCart && <span>3</span>}
          </CartButton> */}
        </Header>

        <Component
          {...pageProps}
          activeSideCheckout={activeSideCheckout}
          // setActiveSideCheckout={handleCartButton}
        />
      </Container>
    </CartProvider>
  )
}
