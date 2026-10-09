import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ResearchQuestions from './components/ResearchQuestions';
import InterviewSection from './components/InterviewSection';
import BuildYourFuture from './components/BuildYourFuture';
import FutureTimeline from './components/FutureTimeline';
import MythsOrReality from './components/MythsOrReality';
import TechnologiesAroundUs from './components/TechnologiesAroundUs';
import FinalSection from './components/FinalSection';
import SectionDivider from './components/SectionDivider';

function App() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-slate-200">
      <Navigation />
      <main>
        <div id="hero">
          <HeroSection />
        </div>
        <SectionDivider variant="circuit" />
        <ResearchQuestions />
        <SectionDivider variant="dots" />
        <InterviewSection />
        <SectionDivider variant="circuit" />
        <BuildYourFuture />
        <SectionDivider variant="dots" />
        <FutureTimeline />
        <SectionDivider variant="circuit" />
        <MythsOrReality />
        <SectionDivider variant="dots" />
        <TechnologiesAroundUs />
        <SectionDivider variant="circuit" />
        <FinalSection />
      </main>
    </div>
  );
}

export default App;
