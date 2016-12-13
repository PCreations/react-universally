/* @flow */

import React from 'react';
import { Match, Miss, Link } from 'react-router';
import Helmet from 'react-helmet';
import CodeSplit from 'code-split-component';
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Textfield, Drawer, Navigation, Content } from 'react-mdl';
import CSSModules from 'react-css-modules';

import styles from './shell.css';
import Error404 from '../Error404';
import { WEBSITE_TITLE, WEBSITE_DESCRIPTION } from '../../../constants';

function App() {
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
          { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/apple-touch-icon.png' },
          { rel: 'icon', type: 'image/png', href: '/images/favicon-32x32.png', sizes: '32x32' },
          { rel: 'icon', type: 'image/png', href: '/images/favicon-16x16.png', sizes: '16x16' },
          { rel: 'manifest', href: '/manifest.json' },
          { rel: 'mask-icon', href: '/images/safari-pinned-tab.svg', color: '#5bbad5' },
          { rel: 'stylesheet', href: '/css/material-icons.css' },
          { rel: 'stylesheet', href: '/css/roboto-font.css' },
          { rel: 'stylesheet', href: '/css/material.css' },
          {
            rel: 'stylesheet',
            type: 'text/css',
            href: '/css/globals.css'
          }
        ]}
        script={[
          { src: '/js/polyfill.min.js', type: 'text/javascript' },
          { src: '/js/material.js', type: 'text/javascript' }
        ]}/>
      <Layout fixedHeader fixedDrawer>
        <Header waterfall>
          <HeaderRow title="POC Apollo GraphQL">
            <Textfield
                value=""
                onChange={() => {}}
                label="Search"
                expandable
                expandableIcon="search"/>
          </HeaderRow>
          <Match
            pattern="/agenda/:year/:month"
            render={routerProps => (
              <CodeSplit module={System.import('../../../moduxRoot')}>
                { moduxRoot => moduxRoot && <moduxRoot.view.MonthHeaderTabs {...routerProps} /> }
              </CodeSplit>
            )}/>
        </Header>
        <Drawer title="POC Apollo GraphQL">
          <Navigation>
            <Link to="/"><i className='material-icons'>home</i> Accueil</Link>
            <Link to="/agenda/"><i className='material-icons'>event</i> Agenda</Link>
            <Link to="/digggers"><i className='material-icons'>group</i> Digggers</Link>
          </Navigation>
        </Drawer>
        <Content>
          <Match
            exactly
            pattern="/"
            render={routerProps =>
              <CodeSplit module={System.import('../Feed')}>
                { Feed => Feed && <Feed {...routerProps} /> }
              </CodeSplit>
            }/>

          <Match
            pattern="/agenda/:year/:month"
            render={routerProps =>
              <CodeSplit module={System.import('../Agenda')}>
                { Agenda => Agenda && <Agenda {...routerProps} /> }
              </CodeSplit>
            }/>

          <Miss component={Error404} />
        </Content>
      </Layout>
    </div>
  );
}

export default CSSModules(App, styles);
