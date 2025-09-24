const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing AsyncStorage Kotlin source path issues...');

const asyncStoragePath = path.join(__dirname, '..', 'node_modules', '@react-native-async-storage', 'async-storage', 'android');

// Create the required kotlin directory structure
const kotlinMainPath = path.join(asyncStoragePath, 'src', 'main', 'kotlin', 'com', 'reactnativecommunity', 'asyncstorage');

try {
  // Create the kotlin directory structure if it doesn't exist
  if (!fs.existsSync(kotlinMainPath)) {
    fs.mkdirSync(kotlinMainPath, { recursive: true });
    console.log('✅ Created kotlin source directory structure');
  }

  // Copy Kotlin files from the next subdirectory to the main kotlin directory
  const nextKotlinPath = path.join(asyncStoragePath, 'src', 'main', 'java', 'com', 'reactnativecommunity', 'asyncstorage', 'next');
  const kotlinPackagePath = path.join(asyncStoragePath, 'src', 'kotlinPackage', 'java', 'com', 'reactnativecommunity', 'asyncstorage');

  // Copy files from next directory
  if (fs.existsSync(nextKotlinPath)) {
    const nextFiles = fs.readdirSync(nextKotlinPath);
    nextFiles.forEach(file => {
      if (file.endsWith('.kt')) {
        const srcFile = path.join(nextKotlinPath, file);
        const destFile = path.join(kotlinMainPath, file);
        fs.copyFileSync(srcFile, destFile);
        console.log(`✅ Copied ${file} to kotlin directory`);
      }
    });
  }

  // Copy AsyncStoragePackage.kt from kotlinPackage
  const packageFile = path.join(kotlinPackagePath, 'AsyncStoragePackage.kt');
  if (fs.existsSync(packageFile)) {
    const destPackageFile = path.join(kotlinMainPath, 'AsyncStoragePackage.kt');
    fs.copyFileSync(packageFile, destPackageFile);
    console.log('✅ Copied AsyncStoragePackage.kt to kotlin directory');
  }

  // Update build.gradle to include the kotlin source directory
  const buildGradlePath = path.join(asyncStoragePath, 'build.gradle');
  if (fs.existsSync(buildGradlePath)) {
    let buildGradleContent = fs.readFileSync(buildGradlePath, 'utf8');
    
    // Check if the kotlin source directory is already included
    if (!buildGradleContent.includes("srcDirs += 'src/main/kotlin'")) {
      // Add the kotlin source directory to the sourceSets
      buildGradleContent = buildGradleContent.replace(
        /(srcDirs \+= 'src\/kotlinPackage\/java')/,
        "$1\n                srcDirs += 'src/main/kotlin'"
      );
      
      fs.writeFileSync(buildGradlePath, buildGradleContent);
      console.log('✅ Updated build.gradle to include kotlin source directory');
    } else {
      console.log('✅ build.gradle already includes kotlin source directory');
    }
  }

  // Clean build directories to force rebuild
  const buildDir = path.join(asyncStoragePath, 'build');
  if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true, force: true });
    console.log('✅ Cleaned build directory');
  }

  console.log('🎉 AsyncStorage Kotlin path fix completed successfully!');
  console.log('📝 Next steps:');
  console.log('   1. Clean your project: cd android && ./gradlew clean');
  console.log('   2. Rebuild your project: npx expo run:android');

} catch (error) {
  console.error('❌ Error fixing AsyncStorage Kotlin path:', error.message);
  process.exit(1);
}

