module.exports.src =
`
import * as React from 'react';

import { Container } from './description.styles';

interface DescriptionProps {
  children: any;
}

export const Description = React.memo((props: DescriptionProps) => {
  return <Container>{props.children}</Container>
});

`;
