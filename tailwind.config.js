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

const createFont = () => {
  const range = Array.from(new Array(20).keys()).map((i) => (i + 1) * 2);
  const result = {};
  range.forEach((i) => {
    result[`${i}px`] = `${i}px`;
  });

  return result;
};

module.exports = {
  purge: ['./pages/**/*.tsx'],
  theme: {
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
      },
      margin: {
        ...createPixelValues(),
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
