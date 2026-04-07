// api/list-devotionals.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Path to the devotionals folder
  const devotionalsDir = path.join(process.cwd(), 'public', 'devotionals');

  // Read all HTML files in the folder
  const files = fs.readdirSync(devotionalsDir)
    .filter(file => file.endsWith('.html'))
    .map(file => {
      const stats = fs.statSync(path.join(devotionalsDir, file));
      return {
        date: stats.mtime.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        title: file.replace('.html','').replace(/-/g,' '),
        file: file
      };
    })
    .sort((a,b) => new Date(b.date) - new Date(a.date)); // newest first

  res.status(200).json(files);
}
