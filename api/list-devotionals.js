// api/list-devotionals.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    // Path to the devotionals folder
    const dir = path.join(process.cwd(), 'public/devotionals');

    // Get all HTML files
    const files = fs.readdirSync(dir)
      .filter(f => f.endsWith('.html'))
      .sort((a, b) => b.localeCompare(a)); // newest first

    // Map files to objects (file name + title)
    const devotionals = files.map(f => ({
      file: f,
      title: f.replace('.html', '')
    }));

    res.status(200).json(devotionals);
  } catch (err) {
    console.error('Error reading devotionals:', err);
    res.status(500).json({ error: 'Could not read devotionals' });
  }
}
