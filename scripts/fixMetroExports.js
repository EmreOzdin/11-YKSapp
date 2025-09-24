const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing all Metro package export errors...');

const packagesToFix = [
  'metro',
  'metro-cache',
  'metro-config',
  'metro-resolver',
  'metro-runtime',
  'metro-source-map'
];

const commonExports = [
  './src/lib/TerminalReporter',
  './src/lib/getGraphId',
  './src/lib/ModuleGraph',
  './src/lib/Module',
  './src/lib/ModuleMap',
  './src/lib/ResolutionRequest',
  './src/lib/ResolutionResponse',
  './src/lib/Server',
  './src/lib/Transform',
  './src/lib/WorkerFarm',
  './src/stores/FileStore',
  './src/stores/HttpStore',
  './src/stores/Store',
  './src/FileStore',
  './src/HttpStore',
  './src/Store'
];

packagesToFix.forEach(packageName => {
  const packagePath = path.join(__dirname, '..', 'node_modules', packageName, 'package.json');
  
  try {
    if (fs.existsSync(packagePath)) {
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      
      // Add missing exports
      if (!packageJson.exports) {
        packageJson.exports = {};
      }
      
      commonExports.forEach(exportPath => {
        if (!packageJson.exports[exportPath]) {
          packageJson.exports[exportPath] = exportPath + '.js';
        }
      });
      
      // Write back the modified package.json
      fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
      console.log(`✅ ${packageName} package.json updated`);
    } else {
      console.log(`⚠️  ${packageName} package.json not found`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${packageName}:`, error.message);
  }
});

console.log('🎉 Metro export fixes completed!');
