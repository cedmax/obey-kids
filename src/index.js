import React from 'react';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import App from 'app';
import store from 'store';

render(
  <AppContainer>
    <Provider store={store}>
      <App  />
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('app', () => {
    const NextApp = require('app').default;

    render(
      <AppContainer>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
