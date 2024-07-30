import React, {ButtonHTMLAttributes, ReactNode} from "react";
import styled, {css, RuleSet} from "styled-components";

type Variant = 'default' | 'primary' | 'secondary' | 'outline' | 'button_link' | 'icon' | 'icon_clear';

type Size = 'default' | 'sm' | 'md' | 'lg' | 'cl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: Variant;
    size?: Size;
    isActive?: boolean;
}

/*
font-family: var(--font-family, CircularSp, CircularSp-Arab, CircularSp-Hebr, CircularSp-Cyrl, CircularSp-Grek, CircularSp-Deva, var(--fallback-fonts, sans-serif)), Helvetica, Arial, sans-serif;
 */

const colors = {
    green: '#1DB954',//1ed760 hov: #1fdf64 other:#169c46
    white: '#ffffff',
    transparent: '#cbd5e0',
    black: '#191414',
    darkGrey: {
        default: '#212121',
        hover: '#2a2a2a',
    },
    lightGrey: {
        default: '#4a5568',
        hover: '#edf2f7',
    },
    textColor: '#f5f5f5'
};

const buttonVariants: { [key: string]: RuleSet } = {
    default: css`
      background-color: ${colors.lightGrey.default};
      color: ${colors.white};

      &:hover {
        background-color: ${colors.lightGrey.hover};
      }
    `,
    primary: css`
      background-color: ${colors.green};
      color: ${colors.black};
      font-weight: bolder;
      transition: all 0.3s;

      &:hover:enabled {
        transform: scale(1.07) perspective(0.5px)
      }
    `,
    secondary: css`
      background-color: ${colors.darkGrey.default}; //#212121;
      color: ${colors.textColor};

      &:hover:enabled {
        background-color: ${colors.darkGrey.hover}; //#2a2a2a;
      }

    `,
    outline: css`
      background-color: transparent;
      border: 2px solid ${colors.darkGrey.default};
      color: ${colors.textColor};

      &:hover {
        background-color: ${colors.darkGrey.default};
      }
    `,
    button_link: css`
      background-color: transparent;
      color: ${colors.textColor};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    `,
    icon: css`
      background-color: ${colors.darkGrey.default};
      color: ${colors.textColor};
      text-decoration: none;

      &:hover:enabled {
        background-color: ${colors.darkGrey.hover};
      }
    `,
    icon_clear: css`
      background-color: transparent;
      color: ${colors.textColor};

      &:hover {
        background-color: ${colors.darkGrey.hover};
      }
    `
}

const buttonSizes: { [key: string]: RuleSet } = {
    default: css`
      padding: 0.5rem 2rem;
      font-size: 1rem;
    `,
    sm: css`
      padding: 0.25rem 1rem;
      font-size: 0.875rem;
    `,
    md: css`
      padding: 0.5rem 1.5rem;
      font-size: 1rem;
    `,
    lg: css`
      padding: 0.75rem 3rem;
      font-size: 1.25rem;
    `,
    cl: css`
      padding: 0.5rem;
    `
};

// Styled component named StyledButton
const ButtonBase = styled.button<Pick<ButtonProps, 'variant' | 'size' | 'isActive'>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999rem;
  transition: background-color 0.2s;
  cursor: pointer;
  outline: none;
  border: none;
  padding: 0.5rem 1rem;
  text-decoration: none;
  text-wrap: nowrap;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({variant}) => buttonVariants[variant!]};
  ${({size}) => buttonSizes[size!]};
  ${({isActive}) => isActive && css`
    background-color: ${colors.lightGrey.hover};
    color: ${colors.darkGrey.default};
    pointer-events: none;
  `}
`;

export const Button: React.FC<ButtonProps> = ({
                                                  className, children,
                                                  variant = "default", size = "default",
                                                  isActive, ...props
                                              }) => {
    return <ButtonBase className={className} variant={variant} size={size} isActive={isActive} {...props}>
        {children}
    </ButtonBase>
}
