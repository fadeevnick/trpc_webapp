import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TrpcProvider } from './lib/trpc'
import { AllIdeasPage } from './pages/AllIdeasPage'

function App() {
  return (
    <TrpcProvider>
      <AllIdeasPage />
    </TrpcProvider>
  )
}

export default App
