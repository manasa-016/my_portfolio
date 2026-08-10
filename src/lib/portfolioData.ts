export const personalInfo = {
  name: "Manasa M",
  role: "Aspiring Full Stack Developer",
  badge: "Computer Science Engineer",
  tagline:
    "I build modern web applications and intelligent digital experiences, combining polished frontend design with scalable backend architecture and practical AI/ML solutions.",
  college: "Maharaja Institute of Technology, Mysore",
  degree: "B.E. Computer Science Engineering",
  graduation: "2027",
  cgpa: "8.83",
  period: "2023–2027",
  resumePath: "/Manasa_M.pdf",
  github: "https://github.com/manasa-016",
  linkedin: "https://www.linkedin.com/in/manasa-m-73618b318",
  email: "manasamahadev016@gmail.com",
};

export const aboutText = [
  "I am an aspiring Full Stack Developer pursuing B.E. in Computer Science Engineering with a strong foundation in frontend and backend development, AI/ML technologies, and modern web application development.",
  "I enjoy turning ideas into practical, user-focused products — from responsive interfaces and REST APIs to AI-enabled features that solve real problems.",
];

export const skills = [
  {
    icon: "fa-code",
    title: "Programming Languages",
    items: ["C", "Python"],
  },
  {
    icon: "fa-globe",
    title: "Web Technologies / Database",
    items: ["HTML", "CSS", "SQL", "Generative AI"],
  },
  {
    icon: "fa-server",
    title: "Backend",
    items: ["FastAPI", "Flask"],
  },
  {
    icon: "fa-toolbox",
    title: "Tools / Platforms",
    items: ["Git", "GitHub", "VS Code", "Antigravity", "Postman"],
  },
  {
    icon: "fa-users",
    title: "Soft Skills",
    items: ["Leadership", "Communication", "Problem Solving", "Teamwork"],
  },
];

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  live: string;
  image?: string;
}

export const projects: Project[] = [
  {
    title: "Lumina AI – AI-Powered Chatbot Platform",
    description:
      "An AI-powered chatbot platform designed to deliver intelligent, context-aware conversations with a clean and responsive user interface.",
    technologies: ["Python", "FastAPI", "Generative AI", "HTML", "CSS"],
    github: "",
    live: "",
    image: "",
  },
  {
    title: "HangHive – Community Collaboration Platform",
    description:
      "A community collaboration platform that helps users connect, share resources, and work together on shared goals in one organized space.",
    technologies: ["Python", "Flask", "HTML", "CSS", "SQL"],
    github: "",
    live: "",
    image: "",
  },
];

export const certifications = [
  {
    icon: "fas fa-certificate",
    title: "NCC 'B' Certificate",
    organization: "National Cadet Corps",
  },
];

export const education = [
  {
    icon: "fa-graduation-cap",
    institution: "Maharaja Institute of Technology Mysore",
    degree: "B.E. Computer Science Engineering",
    period: "2023–2027",
    scoreLabel: "CGPA",
    score: "8.83",
  },
  {
    icon: "fa-book",
    institution: "Seshadripuram Independent PU College",
    degree: "Pre-University Course (PUC)",
    period: "2021–2023",
    scoreLabel: "Percentage",
    score: "85%",
  },
  {
    icon: "fa-school",
    institution: "Anantha Geetha Vidhyalaya",
    degree: "SSLC / 10th Standard",
    period: "2021",
    scoreLabel: "Percentage",
    score: "89%",
  },
];

