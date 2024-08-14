import ScrollReveal from 'scrollreveal';

const isSSR = typeof window === 'undefined';
export const sr = isSSR ? null : ScrollReveal();

export const hex2rgba = (hex: string, alpha: number = 1): string => {
  const normalizedHex = hex.startsWith('#') ? hex.slice(1) : hex;
  const [r, g, b] = normalizedHex.match(/\w\w/g)?.map(x => parseInt(x, 16)) || [0, 0, 0];
  return `rgba(${r},${g},${b},${alpha})`;
};

export const navDelay = 1000;
export const loaderDelay = 2000;

export const KEY_CODES = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_LEFT_IE11: 'Left',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_RIGHT_IE11: 'Right',
  ARROW_UP: 'ArrowUp',
  ARROW_UP_IE11: 'Up',
  ARROW_DOWN: 'ArrowDown',
  ARROW_DOWN_IE11: 'Down',
  ESCAPE: 'Escape',
  ESCAPE_IE11: 'Esc',
  TAB: 'Tab',
  SPACE: ' ',
  SPACE_IE11: 'Spacebar',
  ENTER: 'Enter',
};