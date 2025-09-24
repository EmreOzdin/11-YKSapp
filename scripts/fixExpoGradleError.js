const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Fixing Expo Gradle Plugin Error...');

const projectRoot = path.join(__dirname, '..');
const androidPath = path.join(projectRoot, 'android');
const nodeModulesPath = path.join(projectRoot, 'node_modules');

// Step 1: Clean Gradle cache and build directories
console.log('🧹 Cleaning Gradle cache and build directories...');

try {
  // Clean Android build directories
  const buildDirs = [
    path.join(androidPath, 'app', 'build'),
    path.join(androidPath, 'build'),
    path.join(androidPath, '.gradle'),
    path.join(nodeModulesPath, 'expo-modules-core', 'expo-module-gradle-plugin', 'build'),
    path.join(nodeModulesPath, 'expo-modules-core', 'expo-module-gradle-plugin', '.gradle')
  ];

  buildDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      console.log(`Removing: ${dir}`);
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  console.log('✅ Cleaned build directories');
} catch (error) {
  console.warn('⚠️ Warning cleaning directories:', error.message);
}

// Step 2: Fix expo-module-gradle-plugin settings
console.log('🔧 Fixing expo-module-gradle-plugin configuration...');

const expoModuleGradlePluginPath = path.join(nodeModulesPath, 'expo-modules-core', 'expo-module-gradle-plugin');
const settingsGradlePath = path.join(expoModuleGradlePluginPath, 'settings.gradle');

// Create settings.gradle if it doesn't exist
if (!fs.existsSync(settingsGradlePath)) {
  const settingsGradleContent = `rootProject.name = 'expo-module-gradle-plugin'

// Include the shared project if it exists
def sharedProjectPath = new File(settingsDir, '../expo-autolinking-plugin-shared')
if (sharedProjectPath.exists()) {
    includeBuild(sharedProjectPath)
}

// Include the main project
include ':expo-module-gradle-plugin'
project(':expo-module-gradle-plugin').projectDir = new File(settingsDir, '.')
`;

  fs.writeFileSync(settingsGradlePath, settingsGradleContent);
  console.log('✅ Created settings.gradle for expo-module-gradle-plugin');
}

// Step 3: Fix the main project's settings.gradle
console.log('🔧 Updating main project settings.gradle...');

const mainSettingsGradlePath = path.join(androidPath, 'settings.gradle');
let mainSettingsContent = fs.readFileSync(mainSettingsGradlePath, 'utf8');

// Add expo-module-gradle-plugin to the includeBuild if not already present
if (!mainSettingsContent.includes('expo-module-gradle-plugin')) {
  const expoModuleGradlePluginInclude = `
  def expoModuleGradlePluginPath = new File(
    providers.exec {
      workingDir(rootDir)
      commandLine("node", "--print", "require.resolve('expo-modules-core/package.json')")
    }.standardOutput.asText.get().trim(),
    "expo-module-gradle-plugin"
  ).absolutePath
  includeBuild(expoModuleGradlePluginPath)
`;

  // Insert before the last line
  const lines = mainSettingsContent.split('\n');
  lines.splice(lines.length - 1, 0, expoModuleGradlePluginInclude);
  mainSettingsContent = lines.join('\n');
  
  fs.writeFileSync(mainSettingsGradlePath, mainSettingsContent);
  console.log('✅ Updated main settings.gradle');
}

// Step 4: Fix the root build.gradle
console.log('🔧 Updating root build.gradle...');

const rootBuildGradlePath = path.join(androidPath, 'build.gradle');
let rootBuildContent = fs.readFileSync(rootBuildGradlePath, 'utf8');

// Ensure expo-root-project plugin is applied
if (!rootBuildContent.includes('apply plugin: "expo-root-project"')) {
  rootBuildContent = rootBuildContent.replace(
    'apply plugin: "com.facebook.react.rootproject"',
    'apply plugin: "expo-root-project"\napply plugin: "com.facebook.react.rootproject"'
  );
  
  fs.writeFileSync(rootBuildGradlePath, rootBuildContent);
  console.log('✅ Updated root build.gradle');
}

// Step 5: Create a gradle.properties file for the expo-module-gradle-plugin
console.log('🔧 Creating gradle.properties for expo-module-gradle-plugin...');

const expoModuleGradlePropertiesPath = path.join(expoModuleGradlePluginPath, 'gradle.properties');
const gradlePropertiesContent = `# Expo Module Gradle Plugin Properties
org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m
org.gradle.parallel=true
org.gradle.caching=true
org.gradle.configureondemand=true

# Android properties
android.useAndroidX=true
android.enableJetifier=true

# Expo properties
expoAutolinkingSettingsPlugin=true
`;

fs.writeFileSync(expoModuleGradlePropertiesPath, gradlePropertiesContent);
console.log('✅ Created gradle.properties for expo-module-gradle-plugin');

// Step 6: Fix the app-level build.gradle
console.log('🔧 Updating app-level build.gradle...');

const appBuildGradlePath = path.join(androidPath, 'app', 'build.gradle');
let appBuildContent = fs.readFileSync(appBuildGradlePath, 'utf8');

// Ensure expo modules are properly configured
if (!appBuildContent.includes('expoModules')) {
  const expoModulesConfig = `
// Expo modules configuration
expoModules {
  // Enable Expo modules
  enableExpoModules()
}`;

  // Add after the react block
  appBuildContent = appBuildContent.replace(
    /(\s+autolinkLibrariesWithApp\(\)\s+})/,
    `$1${expoModulesConfig}`
  );
  
  fs.writeFileSync(appBuildGradlePath, appBuildContent);
  console.log('✅ Updated app-level build.gradle');
}

console.log('🎉 Expo Gradle Plugin error fix completed successfully!');
console.log('');
console.log('Next steps:');
console.log('1. Run: cd android && ./gradlew clean');
console.log('2. Run: cd .. && npx expo run:android');
console.log('');
console.log('If the error persists, try:');
console.log('1. Delete node_modules and package-lock.json');
console.log('2. Run: npm install');
console.log('3. Run: npx expo run:android');
