import { styled } from '..'

export const HomeContainer = styled('main', {
  display: 'flex',
  // gap: '3rem',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) /2))',
  marginLeft: 'auto',
  minHeight: 656,
})

export const ItemProduct = styled('div', {
  background: 'linear-gradient(100deg, #1ea483 0%, #7465d4 100%);',
  borderRadius: 8,
  // padding: '0.25rem',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',

    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0,0,0,0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    div: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.2rem',
    },

    strong: {
      fontSize: '$lg',
      color: '$gray100',
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300',
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  },
})

export const CartButton = styled('button', {
  // position: 'relative',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  cursor: 'pointer',
  backgroundColor: '$green500',
  color: '$white',
  border: 'none',
  padding: '0.75rem',
  borderRadius: '8px',
  textDecoration: 'none',

  '&:hover': {
    backgroundColor: '$green300',
    color: '$white',
  },

  // span: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',

  //   backgroundColor: '$green500',
  //   color: '$gray100',

  //   position: 'absolute',
  //   top: -6,
  //   right: -5,

  //   width: '1.2rem',
  //   height: '1.2rem',
  //   borderRadius: '50%',
  //   fontWeight: 'bold',
  // },
})
