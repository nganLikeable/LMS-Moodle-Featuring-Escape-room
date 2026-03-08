# LMS Moodle App

A Next.js app with manual CSS styling featuring a dark/light/system mode. This allows users to generate a tab interface from their own input (tab title and tab content)


## Tech Stack
- Nextjs, Javascript, HTML/CSS
- Prisma ORM (PostgreSQL)
- Docker
- AWS EC2
- JWT 

## Features
- Syntax highlighting for HTML output using `react-syntax-highlighter`
- Dark/light/system theme toggle
- Add/Remove/Edit tab
- Copy generated HTML output to clipboard
- Escape room with pre-defined questions
  
## Usage instruction
### Moodle
Input tab information in the first column.
Click Add Tab → the tab is displayed in the list.
Select a tab → edit its title/content directly.
Click Generate Output:
- If no content exists → a plain text message is shown.
- If content exists → an HTML code snippet for the tabbed interface is generated.
Click Copy to copy the generated HTML to the clipboard.

## Quick Moodle Demo
https://github.com/user-attachments/assets/b1881634-caec-4031-9440-13da46fd5c98


