const fs = require('fs');
const path = require('path');

// Function to fix the allWarningsAsErrors issue in Gradle plugin files
function fixGradlePluginFiles() {
  const nodeModulesPath = path.join(__dirname, '..', '..', 'node_modules', '@react-native', 'gradle-plugin');
  
  // List of subdirectories to check
  const subdirs = [
    'react-native-gradle-plugin',
    'settings-plugin', 
    'shared',
    'shared-testutil'
  ];
  
  subdirs.forEach(subdir => {
    const buildGradlePath = path.join(nodeModulesPath, subdir, 'build.gradle.kts');
    
    if (fs.existsSync(buildGradlePath)) {
      console.log(`Fixing ${buildGradlePath}`);
      
      let content = fs.readFileSync(buildGradlePath, 'utf8');
      
      // Replace the problematic assignment
      const oldPattern = /allWarningsAsErrors =\s*project\.properties\["enableWarningsAsErrors"\]\?\.toString\(\)\?\.toBoolean\(\) \?: false/g;
      const newPattern = 'allWarningsAsErrors.set(\n        project.properties["enableWarningsAsErrors"]?.toString()?.toBoolean() ?: false\n    )';
      
      if (oldPattern.test(content)) {
        content = content.replace(oldPattern, newPattern);
        fs.writeFileSync(buildGradlePath, content, 'utf8');
        console.log(`✅ Fixed ${buildGradlePath}`);
      } else {
        console.log(`⚠️  Pattern not found in ${buildGradlePath}`);
      }
    } else {
      console.log(`❌ File not found: ${buildGradlePath}`);
    }
  });
}

// Run the fix
fixGradlePluginFiles();
console.log('🎉 Gradle plugin fix completed!');
