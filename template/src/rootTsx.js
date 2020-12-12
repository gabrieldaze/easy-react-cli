module.exports.src =
`
import * as React from 'react';

import { Header } from '@components/Header/header';
import { Description } from '@components/Description/description';
import { Container } from './root.styles';

export const RootApplication = () => {
  return (
    <Container>
      <Header>Easy React Application</Header>
      <Description>
        Powered by <a target="_blank" href="https://npmjs.com/package/@easy-react/cli"><code>@easy-react/cli</code></a>
      </Description>
    </Container>
  );
};

`;