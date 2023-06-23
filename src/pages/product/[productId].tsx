import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/product'
import { useRouter } from 'next/router'

export default function Product() {
  const { query } = useRouter()

  return (
    <>
      <ProductContainer>
        <ImageContainer></ImageContainer>

        <ProductDetails>
          <h1>Product Details</h1>
          <span>R$ 79,00</span>

          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consectetur quam omnis dolores quis nam velit sed earum cupiditate,
            eveniet voluptatem vero accusamus odio repellat aliquid iusto dicta,
            est nulla aut.
          </p>

          <button>Comprar agora</button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}
