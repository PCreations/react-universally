/* @flow */

import React from 'react';
import { Match } from 'react-router';
import CodeSplit from 'code-split-component';

import Shell from './Shell'

function App() {
  return (
    <Match
      pattern="/"
      render={routerProps =>
        <CodeSplit module={System.import('./Shell')}>
          { Shell => Shell && <Shell {...routerProps} /> }
        </CodeSplit>
      }/>
  )
}

export default App;
