import { styled } from '..'

export const Modal = styled('div', {
  zIndex: 99999,
  position: 'fixed',
  top: 'auto',
  bottom: 'auto',

  display: 'flex',
  flexDirection: 'column',
  padding: '2rem',
  // alignContent: 'center',
  // justifyContent: 'center',

  backgroundColor: '$gray800',
  height: '100vh',
  width: '30.5rem',
  right: -500,

  overflowX: 'hidden',
  overflowY: 'hidden',

  transition: '0.5s',

  '&.open': {
    right: 0,
    width: '30.5rem',
  },

  header: {
    marginTop: '2rem',
  },

  h5: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '$gray100',
    lineHeight: '160%',
  },
})

export const ProductList = styled('div', {
  marginTop: '2rem',

  div: {
    display: 'grid',
    // gridTemplateColumns: '2fr auto',
    // gridTemplateColumns: '2fr 1fr',
    // gridTemplateAreas: 'image',
    gridTemplateColumns: '30% 60%',
    paddingBottom: '0.5rem',

    div: {
      // gridArea: 'content',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',

      p: {
        fontSize: '1.125rem',
        lineHeight: '160%',
        color: '$gray300',
      },

      span: {
        fontSize: '1.125rem',
        fontWeight: 'bold',
        lineHeight: '160%',
        color: '$gray100',
      },
    },

    button: {
      cursor: 'pointer',
      width: 'fit-content',
      textAlign: 'left',
      backgroundColor: 'transparent',
      color: '$green500',
      border: 'none',
      fontWeight: 'bold',
      fontSize: '1rem',
      lineHeight: '160%',
      transition: '0.1s',

      '&:hover': {
        color: '$green300',
      },
    },

    img: {
      // gridArea: 'image',
      background: 'linear-gradient(100deg, #1ea483 0%, #7465d4 100%);',
      borderRadius: '8px',
    },
  },
})

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  // height: 'fit-content',
  // maxHeight: '100vh',
  // maxHeight: '100vh',
  overflow: 'auto',

  // height: '600px',
  height: '100vh',

  footer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3.5rem',

    p: {
      color: '$gray100',
      fontSize: '1rem',
      lineHeight: '160%',
    },

    span: {
      color: '$gray100',
      fontSize: '1.125rem',
      fontWeight: 'bold',
      lineHeight: '160%',
    },

    div: {
      div: {
        display: 'flex',
        justifyContent: 'space-between',
      },
    },

    button: {
      // flex: 1,
      marginBottom: '1rem',
      cursor: 'pointer',
      borderRadius: '8px',
      border: 'none',
      padding: '1.25rem 2rem',
      backgroundColor: '$green500',
      color: '$white',
      fontSize: '1.125rem',
      fontWeight: 'bold',
      lineHeight: '160%',

      transition: '0.1s',

      '&:hover:not([disabled])': {
        backgroundColor: '$green300',
      },

      '&:disabled': {
        cursor: 'not-allowed',
      },
    },
  },
})

export const CloseButton = styled('button', {
  cursor: 'pointer',
  border: 'none',
  background: 'transparent',
  color: '$gray500',
  fontSize: '2rem',
  // width: 'fit-content',
  // height: 'fit-content',

  position: 'absolute',
  top: 0,
  right: 0,

  marginRight: '1rem',
  marginTop: '1rem',
  // marginBottom: '2rem',
  transition: '0.1s',

  '&:hover': {
    color: '$white',
  },
})
