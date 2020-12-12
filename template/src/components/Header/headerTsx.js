module.exports.src =
`
import * as React from 'react';

import { Container } from './header.styles';

interface HeaderProps {
  children: string;
}

export const Header = React.memo((props: HeaderProps) => {
  return <Container>{props.children}</Container>
});

`;