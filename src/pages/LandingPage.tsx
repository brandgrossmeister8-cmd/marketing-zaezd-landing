import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/sections/HeroSection'
import ProblemSection from '@/components/sections/ProblemSection'
import DemoSection from '@/components/sections/DemoSection'
import BenefitsSection from '@/components/sections/BenefitsSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FAQSection from '@/components/sections/FAQSection'
import AuthorSection from '@/components/sections/AuthorSection'
import CTASection from '@/components/sections/CTASection'
import ScheduleSection from '@/components/sections/ScheduleSection'
import QuizSection from '@/components/sections/QuizSection'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <DemoSection />
        <QuizSection />
        <ScheduleSection />
        <BenefitsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FAQSection />
        <AuthorSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
