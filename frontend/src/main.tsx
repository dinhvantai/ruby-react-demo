import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';

import App from './App.tsx'

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';

import store from './store/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App/>
    <ToastContainer/>
  </Provider>,
)
