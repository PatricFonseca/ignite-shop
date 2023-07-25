import Image from 'next/image'
import {
  Modal,
  ProductList,
  Container,
  CloseButton,
} from '@/styles/components/sideCheckout'
import { X } from '@phosphor-icons/react'

interface SideCheckoutProps {
  open: boolean
}

export function SideCheckout({ open }: SideCheckoutProps) {
  return (
    <Modal className={`${open && 'open'}`}>
      <CloseButton>
        <X weight="bold" />
      </CloseButton>
      <header>
        <h5>Sacola de compras</h5>
      </header>
      <Container>
        <ProductList>
          <div>
            <Image
              src="https://files.stripe.com/links/MDB8YWNjdF8xTkxiTlJBR3c5OW5vemZQfGZsX3Rlc3RfSTJJeExEV0E4c3pCNUw1RkhZRVdhT01h00hadeouw3"
              alt=""
              width={101}
              height={90}
            />
            <div>
              <div>
                <p>Camiseta Beyond the Limits</p>
                <span>R$ 79,99</span>
              </div>
              <div>
                <button>Remover</button>
              </div>
            </div>
          </div>
        </ProductList>

        <footer>
          <div>
            <div>
              <p>Quantidade</p>
              <p>3 itens</p>
            </div>

            <div>
              <span>Valor total</span>
              <span>R$ 270,00</span>
            </div>
          </div>

          <button>Finalizar compra</button>
        </footer>
      </Container>
    </Modal>
  )
}
