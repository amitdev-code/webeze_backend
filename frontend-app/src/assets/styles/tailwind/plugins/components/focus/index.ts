import plugin from 'tailwindcss/plugin'
import { type FocusConfig, defaultConfig, key } from './focus.config'

const config = {
  theme: {
    webeze: {
      [key]: defaultConfig,
    },
  },
}

export default plugin(({ addComponents, theme }) => {
  const config = theme(`webeze.${key}`) satisfies FocusConfig

  const mode =
    config.mode === 'focus-visible'
      ? '&:has(:focus-visible), &:focus-visible'
      : '&:focus-within'

  addComponents({
    '.webeze-focus': {
      [`@apply outline-${config.width} outline-${config.style} outline-offset-${config.offset}`]:
        {},
      '@apply outline-transparent': {},
      [mode]: {
        [`@apply outline-${config.color.light} dark:outline-${config.color.dark}`]:
          {},
        [`@apply outline-${config.style} ring-0`]: {},
      },
    },
  })
}, config)
