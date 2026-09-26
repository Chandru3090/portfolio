import { useEffect } from "react";
import { getThemeByDay } from "./data/themes";
import Background from "./components/Background";
import NavIsland from "./components/NavIsland";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    const theme = getThemeByDay();
    document.documentElement.setAttribute("data-theme", theme.id);
  }, []);

  return (
    <>
      <Background />
      <NavIsland />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
