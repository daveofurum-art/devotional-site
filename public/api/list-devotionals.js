import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const devotionalsDir = path.join(process.cwd(), 'public', 'devotionals');

  const files = fs.readdirSync(devotionalsDir)
    .filter(file => file.endsWith('.html'))
    .map(file => {
      const fileName = file.replace('.html', '');

      return {
        date: fileName.replace(/-/g, ' '), // simple fallback readable text
        title: fileName.replace(/-/g, ' '),
        file: file
      };
    })
    .sort((a, b) => b.file.localeCompare(a.file)); // newest first

  res.status(200).json(files);
}
