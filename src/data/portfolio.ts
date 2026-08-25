import profileImageAsset from "@/assets/zanele-profile.jpg.asset.json";

export const profile = {
  name: "Zanele Zenani",
  location: "Soweto, South Africa",
  email: "simphiwebongiwezenani@gmail.com",
  linkedinLabel: "Zanele Zenani",
  linkedinUrl: "https://www.linkedin.com/search/results/people/?keywords=Zanele%20Zenani",
  github: null as string | null,
  cvUrl: "/zanele-zenani-cv.pdf",
  imageUrl: profileImageAsset.url,
  imageAlt: "Zanele Zenani",
  headline: "Matric graduate from Soweto seeking her first internship",
  intro:
    "I'm an ambitious, organised matric graduate from Soweto building digital skills toward a career in technology. I learn fast on my own, I show up when I say I will, and I'm looking for a first internship where I can contribute and grow.",
  about: [
    "I matriculated in 2023 with my National Senior Certificate. Since then I've kept learning on my own — free online courses, reading, and practising the everyday digital tools that real work depends on.",
    "During my final year I organised and led a peer study group for my classmates. I coordinated the group on WhatsApp, kept our shared notes and timetables in Google Docs, and made sure everyone had the resources they needed before exams. It taught me how much easier hard things become when someone takes responsibility for the structure.",
    "I'm now looking for my first internship or entry-level opportunity where I can be useful from day one, keep learning, and build a career in tech.",
  ],
};

export const technicalSkills = [
  "Google Docs & Google Drive",
  "WhatsApp group coordination",
  "Microsoft Word (basics)",
  "Microsoft Excel (basics)",
  "Internet research",
  "Typing & digital literacy",
];

export const softSkills = [
  "Leadership",
  "Organisation",
  "Teamwork",
  "Communication",
  "Reliability",
  "Willingness to learn",
];

export type Project = {
  title: string;
  year: string;
  summary: string;
  details: string[];
  tools: string[];
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    title: "Matric Peer Study Group",
    year: "2023",
    summary:
      "Organised and led a peer study group to help classmates prepare for final matric exams and share learning resources.",
    details: [
      "Set up and ran a WhatsApp group as the coordination hub: session times, reminders, and question threads.",
      "Kept shared summaries, past-paper links and a study timetable in Google Docs so everyone worked from the same material.",
      "Ran sessions before each exam block and paired stronger students with those who needed support in a subject.",
    ],
    tools: ["WhatsApp", "Google Docs", "Google Drive"],
  },
  {
    title: "Project title to come",
    year: "Coming soon",
    summary:
      "Space reserved for my next project — I'll replace this with a real write-up once it's finished.",
    details: ["This entry is a placeholder so the page keeps its shape while I build."],
    tools: ["To be confirmed"],
    placeholder: true,
  },
  {
    title: "Project title to come",
    year: "Coming soon",
    summary:
      "Space reserved for a course project from the online learning I'm working through.",
    details: ["This entry is a placeholder so the page keeps its shape while I build."],
    tools: ["To be confirmed"],
    placeholder: true,
  },
];

export const education = [
  {
    qualification: "National Senior Certificate (Matric)",
    year: "2023",
    institution: "Soweto, South Africa",
    note: "Subjects: to be added.",
  },
];

export const certifications = {
  placeholder: true,
  items: [
    "Free online introduction to computers & the internet — planned",
    "Google Digital Skills for Africa — in progress",
    "Introduction to Microsoft Excel — planned",
  ],
};

export const involvement = [
  {
    role: "Study Group Leader",
    org: "Matric Peer Study Group",
    year: "2023",
    points: [
      "Led a group of classmates through final-exam preparation.",
      "Coordinated schedules, resources and communication end to end.",
    ],
  },
];
