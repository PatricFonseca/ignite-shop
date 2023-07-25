import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1100,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
})

export const CartButton = styled('button', {
  position: 'relative',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  cursor: 'pointer',
  backgroundColor: '$gray800',
  color: '$gray300',
  border: 'none',
  padding: '0.75rem',
  borderRadius: '8px',

  textDecoration: 'none',

  '&:hover': {
    color: '$gray200',
  },

  span: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '$green500',
    color: '$gray100',

    position: 'absolute',
    top: -6,
    right: -5,

    width: '1.2rem',
    height: '1.2rem',
    borderRadius: '50%',
    fontWeight: 'bold',
  },

  '&.active': {
    color: '$gray200',
  },
})
