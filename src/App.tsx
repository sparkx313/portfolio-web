import './styles/globals.css';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import TechStackMarquee from './components/TechStackSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import CustomCursor from './components/Cursor';

function App() {
  return (
    <div className="App">
      <CustomCursor />
      <Navigation />
      <main>
        <HeroSection />
        <TechStackMarquee />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;