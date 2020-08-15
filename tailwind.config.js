// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

const createPixelValues = (isNegative = false) => {
  const range = Array.from(new Array(501).keys());
  const pixelText = (x) => `${isNegative ? '-' : ''}${x}px`;
  const result = {};
  range.forEach((i) => {
    if (i <= 100) {
      if (i % 3 === 0) {
        result[pixelText(i)] = pixelText(i);
      }

      if (i % 4 === 0) {
        result[pixelText(i)] = pixelText(i);
      }

      if (i % 5 === 0) {
        result[pixelText(i)] = pixelText(i);
      }
    } else if (i % 10 === 0) {
      result[pixelText(i)] = pixelText(i);
    }
  });

  return result;
};

const grid = {
  xl: 72,
  lg: 56,
  sm: 'calc(50% - 10px)',
};

const gutter = {
  xl: 16,
  lg: 12,
  sm: 10,
};

const createGrid = (size, isGutter = false) => {
  const range = Array.from(new Array(12).keys()).map((i) => i + 1);
  const getWidth = (num) => num * (grid[size] + gutter[size]);

  const result = {};

  range.forEach((i) => {
    result[`${size}-row-${i}${isGutter ? '-gutter' : ''}`] = `${
      isGutter ? getWidth(i) : getWidth(i) - gutter[size]
    }px`;
  });

  return result;
};

const createFont = () => {
  const range = Array.from(new Array(20).keys()).map((i) => (i + 1) * 2);
  const result = {};
  range.forEach((i) => {
    result[`${i}px`] = `${i}px`;
  });

  return result;
};

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.tsx'],
  },
  theme: {
    screens: {
      sm: { max: '768px' },
      lg: { min: '769px', max: '1024px' },
      xl: { min: '1025px' },
    },
    fontFamily: {
      sans: [
        'Noto Sans KR',
        'Noto Sans CJK KR',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: [
        'Abril Fatface',
        'Noto Serif KR',
        'Georgia',
        'Cambria',
        '"Times New Roman"',
        'Times',
        'serif',
      ],
      mono: [
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
    extend: {
      fontSize: createFont(),
      width: {
        ...createPixelValues(),
        ...createGrid('xl'),
        ...createGrid('xl', true),
        ...createGrid('lg'),
        ...createGrid('lg', true),
        'sm-row-1': grid.sm,
      },
      minWidth: {
        ...createPixelValues(),
      },
      maxWidth: {
        ...createPixelValues(),
      },
      height: {
        ...createPixelValues(),
      },
      minHeight: {
        ...createPixelValues(),
      },
      maxHeight: {
        ...createPixelValues(),
      },
      padding: {
        ...createPixelValues(),
        'gutter-xl': `${gutter.xl}px`,
        'gutter-lg': `${gutter.lg}px`,
        'gutter-sm': `${gutter.sm}px`,
      },
      margin: {
        ...createPixelValues(true),
        ...createPixelValues(),
        'gutter-xl': `${gutter.xl}px`,
        'gutter-lg': `${gutter.lg}px`,
        'gutter-sm': `${gutter.sm}px`,
      },
    },
  },
  variants: {},
  plugins: [
    plugin(({ addUtilities }) => {
      const keepAll = {
        '.keep-all': {
          'word-break': 'keep-all',
        },
      };

      const absoluteCenter = {
        '.absolute-center-horizontal': {
          left: '50%',
          transform: 'translateX(-50%)',
        },
        '.absolute-center-vertical': {
          top: '50%',
          transform: 'translateY(-50%)',
        },
        '.absolute-center-full': {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
      };

      addUtilities(keepAll, ['responsive']);
      addUtilities(absoluteCenter, ['responsive']);
    }),
  ],
};
