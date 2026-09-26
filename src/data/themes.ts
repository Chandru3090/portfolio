export interface Theme {
  id: string;
  label: string;
  description: string;
  swatch: string[];
}

export const themes: Theme[] = [
  {
    id: "aurora",
    label: "Aurora",
    description: "Cool indigo & coral (default)",
    swatch: ["#332a8f", "#8f2f78", "#c65b42", "#158a80"],
  },
  {
    id: "diwali",
    label: "Diwali",
    description: "Diya gold, maroon & deep red",
    swatch: ["#5c1a4a", "#9c1d3f", "#d1461f", "#b8860b"],
  },
  {
    id: "holi",
    label: "Holi",
    description: "Vivid pink, blue & spring green",
    swatch: ["#2563eb", "#c026d3", "#ff5a76", "#22c55e"],
  },
  {
    id: "navratri",
    label: "Navratri",
    description: "Royal jewel tones & gold",
    swatch: ["#1e3a8a", "#7b2ff7", "#e0115f", "#0f766e"],
  },
  {
    id: "ocean",
    label: "Ocean",
    description: "Deep blues & teal waves",
    swatch: ["#004e89", "#0077be", "#1ba0c8", "#4dd0e1"],
  },
  {
    id: "forest",
    label: "Forest",
    description: "Rich greens & earthy tones",
    swatch: ["#33691e", "#1b5e20", "#00796b", "#f57f17"],
  },
  {
    id: "sunset",
    label: "Sunset",
    description: "Warm orange & golden hues",
    swatch: ["#004e89", "#f7931e", "#ff6b35", "#ffbe0b"],
  },
  {
    id: "midnight",
    label: "Midnight",
    description: "Deep purples & neon accents",
    swatch: ["#3a86ff", "#b537f2", "#00d4ff", "#ffbe0b"],
  },
  {
    id: "spring",
    label: "Spring",
    description: "Soft pastels & romantic vibes",
    swatch: ["#a8d8ea", "#aa96da", "#ff6b9d", "#fcbad3"],
  },
  {
    id: "cherry",
    label: "Cherry",
    description: "Bold reds & vibrant colors",
    swatch: ["#512da8", "#d81b60", "#ff1744", "#ffc400"],
  },
];

export const defaultThemeId = "aurora";
export const themeStorageKey = "portfolio-theme";
export const themeAutoSelectKey = "portfolio-theme-auto";

export function getThemeByDay(): Theme {
  const day = new Date().getDay();
  const themesByDay: Record<number, string> = {
    0: "ocean",
    1: "forest",
    2: "sunset",
    3: "midnight",
    4: "spring",
    5: "cherry",
    6: "aurora",
  };
  const themeId = themesByDay[day] || defaultThemeId;
  return themes.find((t) => t.id === themeId) || themes[0];
}
