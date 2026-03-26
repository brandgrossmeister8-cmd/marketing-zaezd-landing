import { Routes, Route } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage'
import CookiePolicyPage from '@/pages/CookiePolicyPage'
import OfertaPage from '@/pages/OfertaPage'
import AdminSchedulePage from '@/pages/AdminSchedulePage'
import CookieConsent from '@/components/CookieConsent'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/cookies" element={<CookiePolicyPage />} />
        <Route path="/oferta" element={<OfertaPage />} />
        <Route path="/admin-schedule" element={<AdminSchedulePage />} />
      </Routes>
      <CookieConsent />
    </>
  )
}

export default App
