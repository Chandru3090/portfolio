import { useEffect, useState } from "react";
import { navLinks } from "../../data/content";
import "./NavIsland.css";

function NavIsland() {
  const [active, setActive] = useState(navLinks[0].id);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
    }
  };

  return (
    <div className="island-wrap">
      <nav className="island" aria-label="Section navigation">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={(e) => handleNavClick(e, link.id)}
            className={active === link.id ? "active" : ""}
            aria-label={`Navigate to ${link.label}`}
          >
            {link.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default NavIsland;
