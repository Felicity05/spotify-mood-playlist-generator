import styled, {css, RuleSet} from "styled-components";
import React, {HTMLAttributes, HtmlHTMLAttributes, ReactNode} from "react";

type CardAlignment = "default" | "center" | "left"
// Define the types for the props
interface CardProps extends HTMLAttributes<any>{
    children: ReactNode;
    width?: string;
    height?: string;
    alignment: CardAlignment;
    backgroundColor?: string;
}

const StyledCard = styled.div<Pick<CardProps, 'alignment' | 'width' | 'height' | 'backgroundColor'>> `
  border-radius: 20px;
  background-color: #121212;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  /* Add more styles as needed */
  /* Set the width based on props or default to 200px */
  
  width: ${({width}) => (width ? width : '100%')}; 
  height: ${({height}) => (height ? height : '100%')};

  ${({ alignment }) => cardAlignment[alignment!]};
`

const cardAlignment: {[key: string]: RuleSet} = {
    default: css`
    padding: 0.5rem 2rem;
    font-size: 1rem;
  `,
    center: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  `, left: css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
    `
}

export const Card: React.FC<CardProps> = ({children, width, height,
                                             alignment, backgroundColor,
                                              ...rest }) => {
    return <StyledCard width={width} alignment={alignment} backgroundColor={backgroundColor}
                       height={height} {...rest}>{children}</StyledCard>;
}
