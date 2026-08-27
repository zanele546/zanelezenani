# Fix CV download — generate a real PDF

## Problem
`public/zanele-zenani-cv.pdf` is a placeholder text file, not a valid PDF, so the "Download CV" button on the Résumé page downloads a file that cannot open.

## Plan
1. Generate a real one-page CV PDF with Python (reportlab), using the actual data already in `src/data/portfolio.ts`:
   - Name, location, email, phone (067 458 0574)
   - Education: National Senior Certificate (Matric), 2023, Soweto
   - Leadership: Study Group Leader — Matric Peer Study Group (2023)
   - Projects: Matric Peer Study Group, Community Volunteer — Local Clean-Up Initiative
   - Technical skills and soft skills
   - Certifications in progress
2. Style it to match the site: black headings, pink accent color, clean single-column layout.
3. Overwrite `public/zanele-zenani-cv.pdf` with the real PDF.
4. Remove the "placeholder file" note from the Résumé page (`src/routes/resume.tsx`).
5. QA: convert the PDF to an image, visually inspect for layout/overflow issues, fix if needed, then verify the download link opens the PDF in the preview.

## Notes
- No design changes to the site itself — only the CV file and the placeholder note.
