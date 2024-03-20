import React, { HTMLAttributes, ReactNode} from 'react';
import styled from "styled-components";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
}

const StyledBadge = styled.span`
    background-color: #A39F9F;
    border-radius: 0.2rem;
    padding: 0.1rem 0.3rem 0.25rem 0.3rem;
    color: #121212;
    font-size: 11px;
`

export const Badge: React.FC<BadgeProps> = ({children, ...rest}) => {
    return <StyledBadge {...rest}>
        {children}
    </StyledBadge>
}
