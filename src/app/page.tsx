import Nav from "@/components/Nav";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Expertise from "@/components/sections/Expertise";
import Fabrication from "@/components/sections/Fabrication";
import Galvanization from "@/components/sections/Galvanization";
import Projects from "@/components/sections/Projects";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Leadership from "@/components/sections/Leadership";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main id="top" className="relative bg-white">
      <Nav />

      {/* Hero — auto-assembling Pratt truss (6s), interactive after build */}
      <Hero />

      <About />
      <Expertise />

      {/* Process scenes — auto-play wireframe animations */}
      <Fabrication />
      <Galvanization />

      <Projects />
      <WhyChooseUs />
      <Leadership />
      <Contact />
    </main>
  );
}
