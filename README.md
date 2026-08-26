# Zanele's Launchpad

Create a professional portfolio website using the provided instructions and provided details it should be pink and black in colour          Zanele Zenani — Portfolio Site

The site structure and "Ink on Paper" design already exist with sample content. This plan fills it with your real details, reshapes it for a matric graduate with no work experience yet, and keeps clearly-marked placeholders where you still need to supply info.

Your confirmed details





Name: Zanele Zenani, Soweto, South Africa



Email: simphiwebongiwezenani@gmail.com



LinkedIn: profile name "Zanele Zenani" (URL still needed — I'll link a search-safe placeholder until you send it)



GitHub: none yet — I'll leave the link out rather than show a broken one



Education: National Senior Certificate (Matric), 2023



Experience: none yet — the Work Experience block becomes "Leadership & Involvement" so the page never looks empty



Real project: Matric Peer Study Group — organised and led a peer study group to help classmates prepare for final exams and share learning resources (WhatsApp, Google Docs)

What changes





Positioning — Home introduction reframed as an ambitious, organised matric graduate from Soweto seeking her first internship, instead of a working developer.



About Me — short honest story: matriculated in 2023, self-driven learner, led a peer study group, building digital skills toward a tech career.



Skills — technical skills reset to things you can actually claim (Google Docs, WhatsApp coordination, Microsoft Word/Excel basics, internet research, typing/digital literacy) and soft skills lead with leadership, organisation, teamwork, communication, reliability. Marked so you can add more as you learn.



Projects — 3 entries, all clearly labelled:





Matric Peer Study Group (real, 2023) — full write-up with WhatsApp + Google Docs as tools



Two additional placeholder entries for future work, each visibly tagged "Placeholder — replace" so employers never see fake claims if you publish early



Education — Matric 2023 only, with a line for subjects you can fill in.



Certifications — replaced with an honest "In progress / planned" list (free online courses) rather than certificates you don't hold, tagged as placeholder.



Contact — email + LinkedIn as primary; GitHub row hidden until you have an account.



CV — download button kept, pointing at the existing placeholder PDF, with a note that you should replace it with your real CV.

Technical notes





All content edits happen in src/data/portfolio.ts (single source of truth); the GitHub/certification/experience sections need small conditional-render tweaks in src/routes/contact.tsx, src/routes/resume.tsx, and src/components/site/* so removed items don't leave gaps.



Existing responsive layout, typography, and routes (/, /about, /projects, /resume, /contact) stay as-is.



Per-route SEO titles and descriptions updated to your name.



Verified on desktop and mobile with screenshots before I hand it back.

After approval, send me when you can

Your website must include:

🏠 Home page with your professional introduction

👤 About Me section

💻 Technical and soft skills

📂 At least 3 projects with descriptions and technologies used

🎓 Education

📜 Certifications

💼 Work experience (if applicable)

📞 Contact section with your email, GitHub, and LinkedIn

📄 Downloadable CV (optional but recommended)

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://zanelezenani.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/facef86f-cfa7-41e8-a1e1-2e76e490c3b7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
