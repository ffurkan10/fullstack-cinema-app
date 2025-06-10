// src/react-icons-fix.d.ts
import type { IconBaseProps } from 'react-icons/lib';

declare module 'react-icons' {
  // Force icons to return JSX.Element
  export type IconType = (props: IconBaseProps) => JSX.Element;
}
