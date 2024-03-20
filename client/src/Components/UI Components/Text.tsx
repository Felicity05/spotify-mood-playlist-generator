import React, {CSSProperties, HTMLAttributes, ReactNode} from 'react';
import styled, {css, RuleSet} from "styled-components";

type TextVariant = "default" | "xs" | "sm" | "md" | "lg" | "xl";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
    variant?: TextVariant;
    children: ReactNode;

    style?: CSSProperties;
}

const textVariants:  {[key: string]: RuleSet} = {
    default: css`
    font-size: 15px;
  `,
    xs: css`
    font-size: 12px;
  `,
    sm: css`
    font-size: 13px;
  `,
    md: css`
    font-size: 20px;
  `,
    lg: css`
    font-size: 50px;
  `,
    xl: css`
    font-size: 60px;
  `,
} as const;

const TextBase = styled.p<TextProps>`
  margin: 0;
  padding-bottom: 0.25rem;
  text-align: left;

  ${({ variant }) => textVariants[variant || "default"]}
`;

export const Text: React.FC<TextProps> = ({ children, variant = "default" , ...rest}) => {
    return <TextBase variant={variant} {...rest}>{children}</TextBase>;
}
