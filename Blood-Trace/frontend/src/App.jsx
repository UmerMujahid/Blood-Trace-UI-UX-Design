import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import RegisterDonor from './pages/RegisterDonor'
import Help from './pages/Help'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>

            <Route index element={<Landing />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="register-donor" element={<RegisterDonor />} />
            <Route path="help" element={<Help />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
