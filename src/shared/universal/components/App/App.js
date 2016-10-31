/* @flow */

import React from 'react';
import { Match, Miss } from 'react-router';
import Helmet from 'react-helmet';
import CodeSplit from 'code-split-component';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import CSSModules from 'react-css-modules';
import Error404 from './Error404';
import Header from './Header';
import { WEBSITE_TITLE, WEBSITE_DESCRIPTION } from '../../constants';
import styles from './app.css';

function App({ muiTheme }) {
  return (
    <div styleName='container'>
      {/*
        All of the following will be injected into our page header.
        @see https://github.com/nfl/react-helmet
      */}
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        titleTemplate={`${WEBSITE_TITLE} - %s`}
        defaultTitle={WEBSITE_TITLE}
        meta={[
          { name: 'charset', content: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { name: 'description', content: WEBSITE_DESCRIPTION },
          { name: 'theme-color', content: '#ffffff' },
        ]}
        link={[
          { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
          { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes: '32x32' },
          { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16' },
          { rel: 'manifest', href: '/manifest.json' },
          { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
        ]}
        link={[
          { href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500', rel: 'stylesheet' },
          { href: 'https://fonts.googleapis.com/icon?family=Material+Icons', rel: 'stylesheet' },
        ]}
        link={[{
          rel: 'stylesheet',
          type: 'text/css',
          href: '/globals.css'
        }]}
        script={[]}
      />
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            title="Title"
          />

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

export default CSSModules(App, styles);
