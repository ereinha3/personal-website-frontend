// Fix for react-icons TypeScript issues
import { IconType } from 'react-icons';

declare module 'react-icons' {
  export function FiSun(props: React.ComponentProps<IconType>): JSX.Element;
  export function FiMoon(props: React.ComponentProps<IconType>): JSX.Element;
  export function FiMenu(props: React.ComponentProps<IconType>): JSX.Element;
  export function FiX(props: React.ComponentProps<IconType>): JSX.Element;
  export function FiGithub(props: React.ComponentProps<IconType>): JSX.Element;
  export function FiLinkedin(props: React.ComponentProps<IconType>): JSX.Element;
  export function FiMail(props: React.ComponentProps<IconType>): JSX.Element;
  export function FiDownload(props: React.ComponentProps<IconType>): JSX.Element;
  export function FiArrowDown(props: React.ComponentProps<IconType>): JSX.Element;
  export function FiExternalLink(props: React.ComponentProps<IconType>): JSX.Element;
  export function FiStar(props: React.ComponentProps<IconType>): JSX.Element;
  export function FiGitBranch(props: React.ComponentProps<IconType>): JSX.Element;
}
