import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const projectsDir = path.join(process.cwd(), 'src', 'projects');
    
    if (!fs.existsSync(projectsDir)) {
      return res.status(404).json({ error: 'Projects directory not found' });
    }

    const allFiles = fs.readdirSync(projectsDir);
    const markdownFiles = allFiles.filter(file => file.endsWith('.md'));
    markdownFiles.sort();

    res.status(200).json(markdownFiles);
    
  } catch (error) {
    console.error('Error reading projects directory:', error);
    res.status(500).json({ error: 'Failed to read projects directory', details: error.message });
  }
}