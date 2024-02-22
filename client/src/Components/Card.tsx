import styled from "styled-components";
import React, {ReactNode} from "react";

// Define the types for the props
interface CardProps {
    children: ReactNode;
    width?: string;
    height?: string;
    // Add any additional props as needed
}

const StyledCard = styled.div<CardProps> `
  border-radius: 10px;
  background-color: #121212;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  //overflow-y: scroll;
  //padding: 0.25rem;
  /* Add more styles as needed */
  width: ${(props) => (props.width ? props.width : '100%')}; 
  height: ${(props) => (props.height ? props.height : '100%')}; 
  /* Set the width based on props or default to 200px */
`

export const Card: React.FC<CardProps> = ({children, width, height,
                                              ...rest }) => {
    return <StyledCard width={width} height={height} {...rest}>{children}</StyledCard>;
}
