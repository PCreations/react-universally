/* @flow */

import type { $Request, $Response, Middleware } from 'express';
import React from 'react';
import { ServerRouter, createServerRenderContext } from 'react-router';
import { createNetworkInterface, ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import render from './render';
import App from '../shared/universal/apps/App';

/**
 * An express middleware that is capabable of doing React server side rendering.
 */
function universalReactAppMiddleware(request: $Request, response: $Response) {

  if (process.env.DISABLE_SSR === 'true') {
    if (process.env.NODE_ENV === 'development') {
      console.log('==> Handling react route without SSR');  // eslint-disable-line no-console
    }
    // SSR is disabled so we will just return an empty html page and will
    // rely on the client to initialize and render the react application.
    const html = render();
    response.status(200).send(html);
    return;
  }

  // First create a context for <ServerRouter>, which will allow us to
  // query for the results of the render.
  const context = createServerRenderContext();

  const client = new ApolloClient({
    ssrMode: true,
    networkInterface: createNetworkInterface({
      uri: `${process.env.NOW_URL}/graphql`,
      opts: {
        credentials: 'same-origin',
      },
    })
  });

  // Create the application react element.
  const app = (
    <ServerRouter
      location={request.url}
      context={context}
    >
      <ApolloProvider client={client}>
        <App/>
      </ApolloProvider>
    </ServerRouter>
  );

  // Render the app to a string.
  render(
    // Provide the full app react element.
    app
  ).then(html => {
    // Get the render result from the server render context.
    const renderResult = context.getResult();

    // Check if the render result contains a redirect, if so we need to set
    // the specific status and redirect header and end the response.
    if (renderResult.redirect) {
      response.status(301).setHeader('Location', renderResult.redirect.pathname);
      response.end();
      return;
    }

    response
      .status(
        renderResult.missed
          // If the renderResult contains a "missed" match then we set a 404 code.
          // Our App component will handle the rendering of an Error404 view.
          ? 404
          // Otherwise everything is all good and we send a 200 OK status.
          : 200
      )
      .send(html);
  });
}

export default (universalReactAppMiddleware : Middleware);
