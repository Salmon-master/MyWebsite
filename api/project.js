import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Set CORS headers to allow requests from your domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the absolute path to the projects directory
    const projectsDir = path.join(process.cwd(), 'src', 'projects');
    
    // Check if directory exists
    if (!fs.existsSync(projectsDir)) {
      return res.status(404).json({ error: 'Projects directory not found' });
    }

    // Read all files in the directory
    const allFiles = fs.readdirSync(projectsDir);
    
    // Filter to only include .md files
    const markdownFiles = allFiles.filter(file => file.endsWith('.md'));
    
    // Sort files alphabetically (optional)
    markdownFiles.sort();

    // Return the list of files
    res.status(200).json(markdownFiles);
    
  } catch (error) {
    console.error('Error reading projects directory:', error);
    res.status(500).json({ error: 'Failed to read projects directory' });
  }
}