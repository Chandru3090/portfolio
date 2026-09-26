export interface Stat {
  num: string;
  label: string;
}

export interface Social {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  initials: string;
  photo: string | null;
  role: string;
  tagline: string;
  status: string;
  statusNote: string;
  location: string;
  email: string;
  phone: string;
  socials: Social[];
  stats: Stat[];
  topSkills: string[];
}

export interface About {
  paragraphs: string[];
  highlights: Array<{
    label: string;
    value: string;
  }>;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  points: string[];
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  href: string | null;
  featured: boolean;
}

export interface NavLink {
  id: string;
  label: string;
}

export const profile: Profile = {
  name: "Chandran Lakshmanan",
  initials: "CL",
  photo: null,
  role: "Senior Software Engineer — Full Stack Developer & AI Engineer",
  tagline:
    "10+ years building scalable web applications end-to-end with Angular, React, Node.js, and MongoDB. Recently expanded expertise into AI Engineering — designing production-grade LLM features including RAG pipelines, streaming chat UIs, tool-use agents, and prompt engineering systems. Led architecture decisions for enterprise applications, architected design token systems ensuring UI consistency, and mentored engineering teams on best practices.",
  status: "Senior Software Engineer at HCL Technologies",
  statusNote: "Bengaluru, Karnataka, India",
  location: "Bengaluru, Karnataka, India",
  email: "l.chandran3090@gmail.com",
  phone: "+91 97870 32240",
  socials: [
    { label: "GitHub", href: "https://github.com/Chandru3090" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/chandran-lakshmanan-604028b3/" },
    { label: "Resume", href: "https://drive.google.com/file/d/1LXC3ofryDCFMYcndrwepxkWE03sO3flX/view?usp=sharing" },
  ],
  stats: [
    { num: "10+", label: "Years of experience" },
    { num: "3", label: "Companies since 2015" },
  ],
  topSkills: ["React & Angular", "Node.js", "Claude API", "RAG", "MongoDB"],
};

export const about: About = {
  paragraphs: [
    "Senior Software Engineer with 13+ years building scalable web applications at HCL Technologies. Full-stack expertise in Angular, React, Node.js, and MongoDB with recent focus on AI Engineering — designing production-grade LLM features including RAG pipelines, streaming chat UIs, and tool-use agents. Led system design for enterprise applications, implemented 40% page load optimizations, and architected design token systems.",
    "Leverage Anthropic Claude API with prompt engineering techniques like Chain of Thought and Few-Shot prompting. Proficient in both MEAN and MERN stacks with emphasis on clean code, comprehensive testing, and collaborative development.",
  ],
  highlights: [
    { label: "Currently", value: "HCL Technologies" },
    { label: "Experience", value: "10+ years, 3 companies" },
    { label: "Based in", value: "Erode, Tamilnadu" },
    { label: "Education", value: "B.E. Computer Science" },
  ],
};

export const experience: Experience[] = [
  {
    company: "HCL Technologies Ltd.",
    role: "Senior Software Engineer",
    period: "Nov 2019 – Present",
    points: [
      "Led system design and architecture for Actian Avalanche Online Query Editor and Status Page — Angular and React applications serving enterprise database customers globally.",
      "Implemented performance optimization strategies including query normalization, component-level caching, and reusable component libraries — reducing page load times by 40%.",
      "Created MCP (Model Context Protocol) workflows for protocol-driven validation and automation — directly applicable to modern AI agent orchestration patterns. Implemented comprehensive testing with Jest and Playwright with Claude for automated browser testing achieving high code coverage.",
      "Architected and maintained Angular Material Design Token system — ensuring consistent UI across all product surfaces and enabling rapid theming. Recognized with ERS Champion Award for delivering Google Early Access release on schedule.",
    ],
  },
  {
    company: "Cognizant Technology Solutions",
    role: "Associate Software Engineer",
    period: "Oct 2016 – Oct 2019",
    points: [
      "Built and maintained front-end applications for CIGNA's support tool and the CHCP portal using Angular.",
      "Worked within a monorepo setup, turning shared UI pieces into reusable packages used across multiple projects.",
      "Named \"Best Performer of the Month\" by Verizon for consistently on-time delivery.",
    ],
  },
  {
    company: "Tata Consultancy Services Ltd.",
    role: "System Engineer",
    period: "May 2015 – Oct 2016",
    points: [
      "Contributed front-end features to high-profile engagements, including Walmart's Data Cafe and a VISA client implementation.",
      "Worked directly with onsite teams and clients to translate business requirements into working features.",
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "AI & LLM Engineering",
    skills: ["Claude API (Anthropic)", "Gemini API", "Prompt Engineering", "RAG (Retrieval Augmented Generation)", "Vector Embeddings", "Tool Use & Function Calling", "Streaming (SSE)", "Prompt Caching"],
  },
  {
    title: "Fullstack & Data",
    skills: ["Angular", "React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Node.js", "MongoDB", "MongoDB Vector Search", "MySQL"],
  },
  {
    title: "Styling & Design",
    skills: ["Tailwind CSS", "Bootstrap", "Angular Material Design Tokens", "Figma"],
  },
  {
    title: "Tools & DevOps",
    skills: ["Git", "Docker", "Jenkins", "AWS (S3, CloudFront)", "Nx Monorepo", "Jira", "Agile/Scrum"],
  },
  {
    title: "Testing & QA",
    skills: ["Jest (Unit & Snapshot)", "Playwright", "AI Evaluation Harnesses"],
  },
];

export const projects: Project[] = [
  {
    title: "AI-Assisted Test Automation",
    description:
      "Built MCP (Model Context Protocol) workflows for protocol-driven validation, and used Claude to drive automated Playwright test runs — cutting manual QA time on core web applications at HCL Technologies. Integrated with existing CI/CD pipelines to enable rapid feedback on test coverage and defect detection. Implemented intelligent retry logic and contextual test generation based on application state.",
    tags: ["Claude", "MCP", "Playwright", "AI Automation"],
    href: null,
    featured: true,
  },
  {
    title: "AI-Powered Billing System",
    description:
      "Full-stack MERN billing platform with AI-assisted features. Node.js and TypeScript backend with JWT authentication and MongoDB, React front end with Clerk auth, Tailwind CSS, multi-language support, and intelligent invoice processing powered by Claude. Features automated payment reconciliation, dynamic invoice templates, and AI-driven expense categorization. Streamlined financial workflows for SaaS businesses.",
    tags: ["React", "Node.js", "MongoDB", "Claude", "AI"],
    href: "https://github.com/Chandru3090/billing-system-api",
    featured: true,
  },
  {
    title: "Ava — AI SQL Assistant",
    description:
      "Production-grade AI SQL assistant using Anthropic Claude API with TypeScript, React streaming UI, and MongoDB backend. Engineered comprehensive system prompt with 6 production elements (Identity, Scope, Output Format, Edge Cases, Few-Shot Examples, Tone). Implemented RAG pipeline using Google Gemini embeddings, MongoDB vector storage, and cosine similarity search. Built tool-use agent enabling Claude to dynamically discover collections, inspect schemas, and run live queries. Developed ChatGPT-style streaming UI with SSE and Vite proxy. Achieved 90% token cost reduction with prompt caching. Applied Chain of Thought and Few-Shot prompting for consistent DIAGNOSIS → EXPLANATION → FIX → NOTE output.",
    tags: ["React", "Node.js", "Claude", "RAG", "Vector Search", "Streaming", "AI Agents"],
    href: "https://github.com/Chandru3090/ava-sql-assistant",
    featured: true,
  },
];

export const navLinks: NavLink[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];
