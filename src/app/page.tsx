import Nav from "@/components/Nav";
import Hero from "@/components/hero/Hero";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Fabrication from "@/components/sections/Fabrication";
import Galvanization from "@/components/sections/Galvanization";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main id="top" className="relative bg-steel-950">
      <Nav />

      {/* Hero — auto-assembling Pratt truss (6s) */}
      <Hero />

      <FeaturedWork />

      {/* Process scenes — auto-play wireframe animations */}
      <Fabrication />
      <Galvanization />

      <About />
      <Contact />
    </main>
  );
}
