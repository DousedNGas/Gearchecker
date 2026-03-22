import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ForgeOracle from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ForgeOracle />
  </StrictMode>,
)
