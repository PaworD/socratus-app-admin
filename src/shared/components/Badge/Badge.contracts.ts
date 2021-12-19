export interface BadgeProps {
  theme: BadgeTheme,
  title: string | number,
  onClose: () => void
}

export enum BadgeTheme {
  Dark = 'dark',
  Light = 'light',
  Alt = 'alt'
}