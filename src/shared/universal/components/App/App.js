/* @flow */

import React from 'react';
import { Match, Miss } from 'react-router';
import Helmet from 'react-helmet';
import CodeSplit from 'code-split-component';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import 'normalize.css/normalize.css';

import './globals.css';
import Error404 from './Error404';
import Header from './Header';
import { WEBSITE_TITLE, WEBSITE_DESCRIPTION } from '../../constants';

function App({ muiTheme }) {
  return (
    <div>
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        titleTemplate={`${WEBSITE_TITLE} - %s`}
        defaultTitle={WEBSITE_TITLE}
        meta={[
          { name: 'description', content: WEBSITE_DESCRIPTION },
        ]}
        link={[
          { href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500', rel: 'stylesheet' },
          { href: 'https://fonts.googleapis.com/icon?family=Material+Icons', rel: 'stylesheet' },
        ]}
        script={[]}
      />
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            title="Title"
          />
          <Header />

          <Match
            exactly
            pattern="/"
            render={routerProps =>
              <CodeSplit module={System.import('./Home')}>
                { Home => Home && <Home {...routerProps} /> }
              </CodeSplit>
            }
          />

          <Match
            pattern="/about"
            render={routerProps =>
              <CodeSplit module={System.import('./About')}>
                { About => About && <About {...routerProps} /> }
              </CodeSplit>
            }
          />

          <Miss component={Error404} />
        </div>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
