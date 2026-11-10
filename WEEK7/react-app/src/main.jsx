import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Welcome from './MyApp.jsx'
import DiscountCalculator from './DiscountCalculator.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Welcome name="Chibuike Success Obijuru" />
    <DiscountCalculator productName="Laptop" price="800" />
  </StrictMode>,
)