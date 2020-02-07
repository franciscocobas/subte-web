import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from './components/contexts/auth0-context'
import { ProjectsProvider } from './components/contexts/projects-context';

ReactDOM.render(
  <Auth0Provider>
    <ProjectsProvider>
      <App />
    </ProjectsProvider>
  </Auth0Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
