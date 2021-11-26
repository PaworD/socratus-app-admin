export interface BadgeProps {
  theme: BadgeTheme,
  title: string,
  onClose: () => void
}

export enum BadgeTheme {
  Dark = 'dark',
  Light = 'light',
  Alt = 'alt'
}