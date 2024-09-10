import React, {HTMLAttributes, ReactNode} from 'react';
import styled from "styled-components";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
}

const StyledBadge = styled.div`
  background-color: #A39F9F;
  border-radius: 0.2rem;
  padding: 0.2rem 0.25rem;
  color: #121212;
  font-size: 11px;
  width: 0.5rem;
  display: flex;
  justify-content: center;
  margin-right: 0.3rem;
`

export const Badge: React.FC<BadgeProps> = ({children, ...rest}) => {
    return <StyledBadge {...rest}>
        {children}
    </StyledBadge>
}
