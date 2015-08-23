const colors = {
  mainBlue: '#39394d',
  mainBlueDark: '#30303d',
  green: '#649750',
  lightGreen: '#b9cfaa',
  yellow: '#cfcfaa',
  red: '#975050',

  textColor: '#3d3c40',
  textColorLight: '#9e9ea6',
  textColorInverse: '#ffffff',
  textColorInverseDim: '#9b9bab'
};

const button = {
  textAlign: 'left',
  cursor: 'pointer',
  color: 'inherit',
  fontWeight: 'inherit',

  border: 0,
  background: 'none'
};

export default {
  colors: colors,

  button: button,
  buttonNoFocus: {
    ...button,
    ':focus': {
      outline: 0
    }
  },

  sidebar: {
    text: colors.textColorLight,
    textLight: colors.textColorInverse,
    textAngle: '#b9cfaa',

    background: colors.mainBlue,
    backgroundDark: colors.mainBlueDark,
    backgroundAngle: colors.green
  }
};
