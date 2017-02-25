import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import store from 'Store';
import App from 'App';

store.addKid('Arturo', 3);
store.addKid('Marcello', 3);

render(
  <AppContainer>
    <App {...store} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;

    render(
      <AppContainer>
        <NextApp {...store} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
