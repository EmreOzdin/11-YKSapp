const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Metro package export errors...');

const metroPackagePath = path.join(__dirname, '..', 'node_modules', 'metro', 'package.json');

try {
  if (fs.existsSync(metroPackagePath)) {
    const packageJson = JSON.parse(fs.readFileSync(metroPackagePath, 'utf8'));
    
    // Add missing exports to exports if not exists
    if (!packageJson.exports) {
      packageJson.exports = {};
    }
    
    // Add all the missing Metro exports
    const missingExports = [
      './src/lib/TerminalReporter',
      './src/lib/getGraphId',
      './src/lib/ModuleGraph',
      './src/lib/Module',
      './src/lib/ModuleMap',
      './src/lib/ResolutionRequest',
      './src/lib/ResolutionResponse',
      './src/lib/Server',
      './src/lib/Transform',
      './src/lib/WorkerFarm'
    ];
    
    missingExports.forEach(exportPath => {
      if (!packageJson.exports[exportPath]) {
        packageJson.exports[exportPath] = exportPath + '.js';
      }
    });
    
    // Write back the modified package.json
    fs.writeFileSync(metroPackagePath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Metro package.json updated with all missing exports');
  } else {
    console.log('❌ Metro package.json not found');
  }
} catch (error) {
  console.error('❌ Error fixing Metro exports:', error.message);
}
