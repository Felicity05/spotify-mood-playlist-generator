import React, {AnchorHTMLAttributes, HTMLAttributes, ReactNode} from "react";
import styled from "styled-components";
import {Link, LinkProps} from "react-router-dom";

interface TextLinkProps extends LinkProps {
    children: ReactNode;
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: unset;
  &:hover {
    text-decoration: underline white;
    color: white;
  }
`

export const TextLink: React.FC<TextLinkProps> = ({children, ...rest}) => {
    return <StyledLink {...rest}>
        {children}
    </StyledLink>
}
