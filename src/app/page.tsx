import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Stack from "@/components/sections/stack";
import Projects from "@/components/sections/projects";
import Roadmap from "@/components/sections/roadmap";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="bg-background relative">
      <Hero />
      <About />
      <Stack />
      <Projects />
      <Roadmap />
      <Contact />
    </main>
  );
}
