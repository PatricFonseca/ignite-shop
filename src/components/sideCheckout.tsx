import Image from 'next/image'
import {
  Modal,
  ProductList,
  Container,
  CloseButton,
} from '@/styles/components/sideCheckout'
import { X } from '@phosphor-icons/react'
import { useShoppingCart } from 'use-shopping-cart'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface SideCheckoutProps {
  open: boolean
  setActiveSideCheckout: (activeSideCheckout: boolean) => void
}

interface Product {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl: string
  formattedPrice: string
  priceId: string
}

export function SideCheckout({
  open,
  setActiveSideCheckout,
}: SideCheckoutProps) {
  const { cartDetails, removeItem, cartCount, totalPrice } = useShoppingCart()
  const [products, setProducts] = useState([] as Product[])
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  useEffect(() => {
    console.log('cart', cartDetails)
    console.log(Object.values(cartDetails || {}))
    const arr = Object.values(cartDetails || {})

    const productsArr = arr.map((x) => {
      console.log(x)
      return {
        id: x.id,
        name: x.name,
        price: x.price,
        formattedPrice: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(x.price),
        quantity: x.quantity,
        imageUrl: x.imageUrl,
        priceId: x.price_id,
      }
    })

    setProducts(productsArr)

    // cartDetails?.map((data) => {
    //   return {
    //     data.imageUrl,

    //   }
    // })
  }, [cartDetails])

  function handleCloseButton() {
    setActiveSideCheckout(!open)
  }

  function handleRemoveProduct(product: Product) {
    removeItem(product.id)
  }

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        cart: products,
        // priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      // conectar com uma ferramenta de observabilidade(datadog / sentry)
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <Modal className={`${open && 'open'}`}>
      <CloseButton onClick={handleCloseButton}>
        <X weight="bold" />
      </CloseButton>
      <header>
        <h5>Sacola de compras</h5>
      </header>
      <Container>
        <ProductList>
          {products.map((product) => {
            return (
              <div key={product.id}>
                <Image src={product.imageUrl} alt="" width={101} height={90} />
                <div>
                  <div>
                    <p>{product.name}</p>
                    <span>{product.formattedPrice}</span>
                  </div>
                  <div>
                    <button onClick={() => handleRemoveProduct(product)}>
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </ProductList>

        <footer>
          <div>
            <div>
              <p>Quantidade</p>
              <p>{cartCount} itens</p>
            </div>

            <div>
              <span>Valor total</span>
              <span>
                {new Intl.NumberFormat('Pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(totalPrice || 0)}
              </span>
              {/* R$ 270,00 */}
            </div>
          </div>

          <button onClick={handleCheckout} disabled={isCreatingCheckoutSession}>
            Finalizar compra
          </button>
        </footer>
      </Container>
    </Modal>
  )
}

// export const getServerSideProps: GetServerSideProps = async () => {

//   return {}
// }
