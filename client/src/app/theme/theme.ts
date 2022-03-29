export type Theme = {
  colors: Colors
  borders: Borders
  transitions: typeof transitions
  fontFamilies: typeof fontFamilies
  spacing: typeof spacing
}

const baseColors = {
  white: '#fff',
  gray50: '#F8F9FB',
  gray100: '#F0F2F4',
  gray200: '#DFE2E6',
  gray500: '#9499A2',
  gray700: '#575A62'
}

type Colors = {
  appBackground: string
  cardBackground: string
  cardBackgroundHovered: string
  cardBorder: string
  cardText: string
  cardTextDimmed: string
  text: string
  textDimmed: string
  formText: string
  formTextDimmed: string
  buttonBackground: string
  textfieldBackground: string
  buttonText: string
  personCardSkeletonBackground: string
  personStarred: string
  personUnstarred: string
}

const lightColors: Colors = {
  appBackground: baseColors.gray50,
  cardBackground: baseColors.white,
  cardBackgroundHovered: baseColors.gray100,
  cardBorder: baseColors.gray200,
  cardText: baseColors.gray700,
  cardTextDimmed: baseColors.gray500,
  text: baseColors.gray700,
  textDimmed: baseColors.gray500,
  formText: baseColors.gray700,
  formTextDimmed: baseColors.gray500,
  buttonBackground: baseColors.white,
  textfieldBackground: baseColors.white,
  buttonText: baseColors.gray700,
  personCardSkeletonBackground: baseColors.gray100,
  personStarred: baseColors.gray700,
  personUnstarred: baseColors.gray200
}

const darkColors: Colors = {
  appBackground: baseColors.gray700,
  cardBackground: baseColors.gray500,
  cardBackgroundHovered: baseColors.gray700,
  cardBorder: baseColors.gray200,
  cardText: baseColors.gray100,
  cardTextDimmed: baseColors.gray200,
  text: baseColors.gray100,
  textDimmed: baseColors.gray200,
  formText: baseColors.gray700,
  formTextDimmed: baseColors.gray500,
  buttonBackground: baseColors.white,
  textfieldBackground: baseColors.white,
  buttonText: baseColors.gray700,
  personCardSkeletonBackground: baseColors.gray100,
  personStarred: baseColors.gray100,
  personUnstarred: baseColors.gray500
}

type Borders = {
  cardBorder: string
  buttonBorder: string
}

const lightBorders: Borders = {
  cardBorder: `1px solid ${lightColors.cardBorder}`,
  buttonBorder: `1px solid ${lightColors.cardBorder}`
}

const darkBorders: Borders = {
  cardBorder: `1px solid ${darkColors.cardBorder}`,
  buttonBorder: `1px solid ${darkColors.cardBorder}`
}

const transitions = {
  easeOut: 'all 150ms ease-out'
}

const fontFamilies = {
  sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif'
}

function spacing(factor: number): number {
  return 8 * factor
}

const baseTheme = {
  transitions,
  fontFamilies,
  spacing
}

export const lightTheme: Theme = {
  ...baseTheme,
  colors: lightColors,
  borders: lightBorders
}

export const darkTheme: Theme = {
  ...baseTheme,
  colors: darkColors,
  borders: darkBorders
}
