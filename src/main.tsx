// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import { ThemeProvider } from './context/theme-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider defaultTheme='dark'>
      <Provider store={store}>
        <Toaster />
          <App />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>

)
