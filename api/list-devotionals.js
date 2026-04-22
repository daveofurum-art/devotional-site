import fs from 'fs';
import path from 'path';

export const config = {
  runtime: 'nodejs'
};

export default function handler(req, res) {
  try {
    const devotionalsDir = path.join(process.cwd(), 'public', 'devotionals');

    const files = fs.readdirSync(devotionalsDir)
      .filter(file => file.endsWith('.html'))
      .map(file => {
        const datePart = file.replace('.html', '');
        const dateObj = new Date(datePart);

        return {
          date: dateObj.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          }),
          title: file.replace('.html', '').replace(/-/g, ' '),
          file: file
        };
      })
      .sort((a, b) => b.file.localeCompare(a.file));

    res.status(200).json(files);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
