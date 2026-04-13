export const config = {
  runtime: 'nodejs'
};

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const devotionalsDir = path.join(process.cwd(), 'public', 'devotionals');

    const files = fs.readdirSync(devotionalsDir)
      .filter(file => file.endsWith('.html'))
      .map(file => ({
        date: file.replace('.html', '').replace(/-/g, ' '),
        title: file.replace('.html', '').replace(/-/g, ' '),
        file
      }))
      .sort((a, b) => b.file.localeCompare(a.file));

    return res.status(200).json(files);

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
