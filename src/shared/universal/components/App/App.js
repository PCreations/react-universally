/* @flow */

import React from 'react';
import { Match, Miss } from 'react-router';
import Helmet from 'react-helmet';
import CodeSplit from 'code-split-component';
import { Layout, Header, Textfield, Drawer, Navigation, Content } from 'react-mdl';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import 'normalize.css/normalize.css';

import './globals.css';
import Error404 from './Error404';
import { WEBSITE_TITLE, WEBSITE_DESCRIPTION } from '../../constants';

function App() {
  return (
    <div style={{height: '100vh', position: 'relative'}}>
      {/*
        All of the following will be injected into our page header.
        @see https://github.com/nfl/react-helmet
      */}
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        titleTemplate={`${WEBSITE_TITLE} - %s`}
        defaultTitle={WEBSITE_TITLE}
        meta={[
          { name: 'description', content: WEBSITE_DESCRIPTION },
        ]}
        link={[
          { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
        ]}
        script={[]}
      />
      <Layout fixedHeader fixedDrawer>
        <Header title="React Universally">
          <Textfield
              value=""
              onChange={() => {}}
              label="Search"
              expandable
              expandableIcon="search"
          />
        </Header>
        <Drawer title="React Universally">
          <Navigation>
            <a href="/">Home</a>
            <a href="/about">About</a>
          </Navigation>
        </Drawer>
        <Content>
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
        </Content>
      </Layout>
    </div>
  );
}

export default App;
