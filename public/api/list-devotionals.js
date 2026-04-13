import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const devotionalsDir = path.join(process.cwd(), 'public', 'devotionals');

  const files = fs.readdirSync(devotionalsDir)
    .filter(file => file.endsWith('.html'))
    .map(file => {
      // Extract date from filename
      const datePart = file.replace('.html', '');
      const dateObj = new Date(datePart);

      return {
        date: dateObj.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }),
        rawDate: dateObj,
        title: file.replace('.html','').replace(/-/g,' '),
        file: file
      };
    })
    .sort((a, b) => b.file.localeCompare(a.file))
    .map(({ rawDate, ...rest }) => rest);

  res.status(200).json(files);
}
