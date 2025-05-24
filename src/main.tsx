import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './Atoms/store' // Import the store
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
)
