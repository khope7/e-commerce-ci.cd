import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@smastrom/react-rating/style.css"
import { Provider } from 'react-redux'
import { store } from './components/redux/store.ts'
import App from './App.tsx'


//Writing project in StrictMode, calling App for project run
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Wrapping Provider with store element to introduce stored count to application */}
     <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
