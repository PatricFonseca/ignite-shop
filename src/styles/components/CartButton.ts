import { styled } from '..'

export const Button = styled('button', {
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

    width: '1.5rem',
    height: '1.5rem',
    borderRadius: '50%',
    fontWeight: 'bold',
    fontSize: '0.875rem',
    lineHeight: '160%',
    // transition: '0.01s',
  },

  '&.active': {
    // transition: '0.01s',
    color: '$gray200',
  },
})
