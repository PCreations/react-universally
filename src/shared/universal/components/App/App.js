/* @flow */

import React from 'react';
import { Match, Miss } from 'react-router';
import Helmet from 'react-helmet';
import CodeSplit from 'code-split-component';
import 'normalize.css/normalize.css';
import './globals.css';
import Error404 from './Error404';
import Header from './Header';
import { WEBSITE_TITLE, WEBSITE_DESCRIPTION } from '../../constants';

function App() {
  return (
    <div style={{ padding: '10px' }}>
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
          { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/apple-touch-icon.png' },
          { rel: 'icon', type: 'image/png', href: '/images/favicon-32x32.png', sizes: '32x32' },
          { rel: 'icon', type: 'image/png', href: '/images/favicon-16x16.png', sizes: '16x16' },
          { rel: 'manifest', href: '/manifest.json' },
          { rel: 'mask-icon', href: '/images/safari-pinned-tab.svg', color: '#5bbad5' },
        ]}
        script={[]}
      />

      <Header />

      <Match
        exactly
        pattern="/shell"
        render={routerProps => <p>Loading...</p>}
      />

      <Match
        exactly
        pattern="/"
        render={routerProps =>
          <CodeSplit module={System.import('./Home')}>
            { Home => {
              return Home && <Home {...routerProps} />
            } }
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
  );
}

export default App;
