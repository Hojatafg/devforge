import HeroSection from './sections/HeroSection';
import ServicesSection from './sections/ServicesSection';
import ProjectsSection from './sections/ProjectsSection';

export default function App() {
  return (
    <div style={{ overflowX: 'clip' }}>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
    </div>
  );
}
