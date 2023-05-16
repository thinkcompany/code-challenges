export const spacings = {
    space01: '0.4rem',
    space02: '0.8rem',
    space03: '1.2rem',
  } as const;
  
  export const primaryColors = {
    white: '#FFFFFF',
    black: '#000000',
  } as const;
  
  export const secondaryColors = {
    gray: '#CCCCCC',
    darkGray: '#595959',
    pink: '#FF65BE',
  } as const;
  
  export const font = {
    light: 300,
    normal: 400,
    semiBold: 600,
    bold: 700,
    sizes: {
      xSmall: '1.2rem',
      small: '1.4rem',
    },
    lineHeight: {
      xSmall: '1.8rem',
    },
  } as const;

  
  export const breakpoints = {
    small: '576px',
    medium: '768px',
    large: '992px',
    xlarge: '1200px',
    xxlarge: '1400px',
  } as const;
  
  export const REM_VALUE_IN_PX = 16;
  
  const pxToRemSetup = (remValueInPx: number) => (px: number) =>
    `${px / remValueInPx}rem`;
  
  export const pxToRem = pxToRemSetup(REM_VALUE_IN_PX);