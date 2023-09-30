import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/',
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: {
          name: 'Inter',
          weights: new Array(9).fill(0).map((_, i) => i * 100 + 100),
        },
        serif: {
          name: 'Open Sans',
          weights: new Array(9).fill(0).map((_, i) => i * 100 + 100),
        },
        mono: {
          name: 'JetBrains Mono',
          weights: new Array(9).fill(0).map((_, i) => i * 100 + 100),
        },
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
