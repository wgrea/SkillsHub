// listFiles.js
// To see file directory tree: node listFiles.js

import fs from 'fs';
import path from 'path';

// Configuration
const CONFIG = {
  icons: {
    directory: '📂',
    file: '📄',
    symlink: '🔗'
  },
  colors: {
    directory: '\x1b[34m',  // Blue
    file: '\x1b[90m',       // Gray
    symlink: '\x1b[36m',    // Cyan
    reset: '\x1b[0m'        // Reset colors
  },
  indent: {
    branch: '│   ',
    lastBranch: '    '
  }
};

function listFiles(dir, exclude = ['node_modules', '.git', 'package-lock.json', '.gitignore', 
                                   'eslint.config.js', 'tailwind.config.js', 'tsconfig.*', 
                                   '.bolt', 'postcss.config.js', 'prompt', 'ignore', 
                                   'index.css', 'App.css'], depth = 0, isLast = false) {
  try {
    const items = fs.readdirSync(dir).sort();
    const filteredItems = items.filter(item => !exclude.includes(item));

    filteredItems.forEach((item, index) => {
      const fullPath = path.join(dir, item);
      const stats = fs.lstatSync(fullPath); // Use lstatSync for symlinks
      const isLastItem = index === filteredItems.length - 1;
      
      // Indentation
      let indent = '';
      if (depth > 0) {
        indent = CONFIG.indent.branch.repeat(depth - 1) + 
                (isLast ? CONFIG.indent.lastBranch : CONFIG.indent.branch);
      }

      // Prefix (├── or └──)
      const prefix = isLastItem ? '└── ' : '├── ';

      // Color and icon based on file type
      let displayName;
      if (stats.isDirectory()) {
        displayName = `${CONFIG.colors.directory}${CONFIG.icons.directory} ${item}/${CONFIG.colors.reset}`;
      } else if (stats.isSymbolicLink()) {
        displayName = `${CONFIG.colors.symlink}${CONFIG.icons.symlink} ${item}${CONFIG.colors.reset}`;
      } else {
        displayName = `${CONFIG.colors.file}${CONFIG.icons.file} ${item}${CONFIG.colors.reset}`;
      }

      console.log(indent + prefix + displayName);

      // Recurse for directories
      if (stats.isDirectory()) {
        listFiles(fullPath, exclude, depth + 1, isLastItem);
      }
    });
  } catch (error) {
    console.error(`Error reading directory: ${dir}`);
    console.error(error.message);
  }
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  let targetDir = '.';
  let exclude = ['node_modules', '.git'];

  for (const arg of args) {
    if (arg.startsWith('--exclude=')) {
      exclude = arg.split('=')[1].split(',');
    } else if (!arg.startsWith('--')) {
      targetDir = arg;
    }
  }

  return { targetDir, exclude };
}

// Main execution
const { targetDir, exclude } = parseArgs();
console.log(`\n${path.resolve(targetDir)}\n`);
listFiles(targetDir, exclude);