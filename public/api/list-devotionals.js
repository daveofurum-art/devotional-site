export const config = {
  runtime: 'nodejs'
};

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const dir = path.join(process.cwd(), 'public', 'devotionals');

    const files = fs.readdirSync(dir)
      .filter(f => /^\d{4}-\d{2}-\d{2}\.html$/.test(f))
      .map(f => ({
        date: f.replace('.html',''),
        title: f.replace('.html','').replace(/-/g,' '),
        file: f
      }))
      .sort((a,b) => b.file.localeCompare(a.file));

    res.status(200).json(files);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
