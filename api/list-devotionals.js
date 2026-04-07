// api/list-devotionals.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const devotionalsDir = path.join(process.cwd(), 'public', 'devotionals');

    const files = fs.readdirSync(devotionalsDir)
      .filter(file => file.endsWith('.html'))
      .map(file => {
        const stats = fs.statSync(path.join(devotionalsDir, file));
        return {
          timestamp: stats.mtimeMs, // numeric timestamp for correct sorting
          date: stats.mtime.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          title: file.replace('.html','').replace(/-/g,' '),
          file: file
        };
      })
      .sort((a, b) => b.timestamp - a.timestamp); // newest first

    res.status(200).json(files);
  } catch (err) {
    console.error('Error reading devotionals:', err);
    res.status(500).json({ error: 'Could not read devotionals' });
  }
}
