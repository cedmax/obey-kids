import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import store from 'store';
import App from 'app';

render(
  <AppContainer>
    <Provider store={store}>
      <App  />
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('App', () => {
    const NextApp = require('App').default;

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
