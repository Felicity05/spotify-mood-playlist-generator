import styled from "styled-components";
import React, {ButtonHTMLAttributes, ReactNode} from "react";

interface StyledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode;
    background_color?: string;
    fontWeight?: string;
    fontSize?: string;
    color?: string;
}

// Styled component named StyledButton
export const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${(props) => (props.background_color ? props.background_color : 'lightgrey')}; // #1DB954; - spotify green
  font-size:  ${(props) => (props.fontSize ? props.fontSize : '20px')};
  color: ${(props) => (props.color ? props.color : '#191414')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '700')};
  border-radius: 9999px;
  padding: 12px 48px 12px 48px;
  border-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  letter-spacing: 1px;
`;

export const Button: React.FC<StyledButtonProps> = ({children, background_color,
                                                        fontSize, fontWeight,
                                                        color, ...rest }) => {
  return <StyledButton background_color={background_color} fontSize={fontSize} fontWeight={fontWeight} color={color}
                       {...rest}>
            {children}
        </StyledButton>;
}
