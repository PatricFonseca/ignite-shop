import { Handbag } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import { Button } from '@/styles/components/CartButton'

interface CartButtonProps {
  setActiveCartButton: (activeCartButton: boolean) => void
}

export default function CartButton({ setActiveCartButton }: CartButtonProps) {
  const { cartCount } = useShoppingCart()

  const [isEmptyCart, setIsEmptyCart] = useState(false)

  useEffect(() => {
    setIsEmptyCart(cartCount === 0)
  }, [cartCount])

  function handleCartButton() {
    setActiveCartButton(true)
  }

  return (
    <Button
      className={`${!isEmptyCart && 'active'}`}
      onClick={handleCartButton}
    >
      <Handbag size={32} weight="bold" />
      {!isEmptyCart && <span>{cartCount}</span>}
    </Button>
  )
}
