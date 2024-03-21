import styled, {css, RuleSet} from "styled-components";
import React, {HTMLAttributes, ReactNode} from "react";

type BoxAlignment = "default" | "center" | "left";

// Define the types for the props
interface BoxProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    width?: string;
    height?: string;
    alignment: BoxAlignment;
    background?: string;
}

const StyledBox = styled.div<Pick<BoxProps, 'alignment' | 'width' | 'height' | 'background'>>`
  background-color: #121212;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  //padding: 0 0.5rem;
  color: white;
  box-sizing: border-box;

  overflow: hidden;
  overflow-y: scroll;
  scrollbar-gutter: stable;

  /* Add more styles as needed */
  /* Set the width based on props or default to 200px */

  width: ${({width}) => (width ? width : '100%')};
  height: ${({height}) => (height ? height : '100%')};
  background-image: ${({background}) => (background ? background : null)};

  ${({alignment}) => boxAlignment[alignment!]};
`

const boxAlignment: { [key: string]: RuleSet } = {
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

export const Box: React.FC<BoxProps> = ({
                                            children, width, height,
                                            alignment, background,
                                            ...rest
                                        }) => {
    return <StyledBox width={width} alignment={alignment} background={background}
                      height={height} {...rest}>
        {children}
    </StyledBox>;
}
