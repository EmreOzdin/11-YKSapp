const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Comprehensive AsyncStorage Build Fix Starting...');

const asyncStoragePath = path.join(__dirname, '..', 'node_modules', '@react-native-async-storage', 'async-storage', 'android');
const projectRoot = path.join(__dirname, '..');

try {
  // Step 1: Clean all build artifacts
  console.log('🧹 Cleaning build artifacts...');
  
  const buildDirs = [
    path.join(asyncStoragePath, 'build'),
    path.join(projectRoot, 'android', 'app', 'build'),
    path.join(projectRoot, 'android', 'build'),
    path.join(projectRoot, 'android', '.gradle')
  ];

  buildDirs.forEach(buildDir => {
    if (fs.existsSync(buildDir)) {
      fs.rmSync(buildDir, { recursive: true, force: true });
      console.log(`✅ Cleaned ${path.basename(buildDir)} directory`);
    }
  });

  // Step 2: Create proper .settings directory structure
  console.log('📁 Setting up .settings directory...');
  
  const settingsPath = path.join(asyncStoragePath, '.settings');
  if (!fs.existsSync(settingsPath)) {
    fs.mkdirSync(settingsPath, { recursive: true });
  }

  // Create comprehensive configuration files
  const buildshipPrefs = path.join(settingsPath, 'org.eclipse.buildship.core.prefs');
  const jdtCorePrefs = path.join(settingsPath, 'org.eclipse.jdt.core.prefs');
  const jdtLaunchingPrefs = path.join(settingsPath, 'org.eclipse.jdt.launching.prefs');
  const projectFile = path.join(asyncStoragePath, '.project');
  const classpathFile = path.join(asyncStoragePath, '.classpath');

  // Buildship preferences
  const buildshipContent = `eclipse.preferences.version=1
connection.project.dir=
connection.working.dir=
connection.gradle.user.home=
connection.gradle.distribution=
connection.gradle.java.home=`;

  // JDT Core preferences with proper Java version settings
  const jdtCoreContent = `eclipse.preferences.version=1
org.eclipse.jdt.core.compiler.processAnnotations=disabled
org.eclipse.jdt.core.compiler.source=1.8
org.eclipse.jdt.core.compiler.compliance=1.8
org.eclipse.jdt.core.compiler.codegen.targetPlatform=1.8
org.eclipse.jdt.core.compiler.release=disabled`;

  // JDT Launching preferences
  const jdtLaunchingContent = `eclipse.preferences.version=1
org.eclipse.jdt.launching.PREF_STRICTLY_COMPATIBLE_JRE_NOT_AVAILABLE=warning
org.eclipse.jdt.launching.PREF_VM_XML=<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<vmSettings defaultVM="JavaSE-1.8">
<vmType id="org.eclipse.jdt.internal.debug.ui.launcher.StandardVMType1">
<vm id="JavaSE-1.8">
<attribute key="org.eclipse.jdt.launching.VM_ARGUMENTS" value="-Dfile.encoding=UTF-8"/>
</vm>
</vmType>
</vmSettings>`;

  // Project file
  const projectContent = `<?xml version="1.0" encoding="UTF-8"?>
<projectDescription>
	<name>async-storage</name>
	<comment></comment>
	<projects>
	</projects>
	<buildSpec>
		<buildCommand>
			<name>org.eclipse.jdt.core.javabuilder</name>
			<arguments>
			</arguments>
		</buildCommand>
		<buildCommand>
			<name>org.eclipse.buildship.core.gradleprojectbuilder</name>
			<arguments>
			</arguments>
		</buildCommand>
	</buildSpec>
	<natures>
		<nature>org.eclipse.jdt.core.javanature</nature>
		<nature>org.eclipse.buildship.core.gradleprojectnature</nature>
	</natures>
</projectDescription>`;

  // Classpath file with proper Java container
  const classpathContent = `<?xml version="1.0" encoding="UTF-8"?>
<classpath>
	<classpathentry kind="src" output="bin/main" path="src/main/java">
		<attributes>
			<attribute name="gradle_scope" value="main"/>
			<attribute name="gradle_used_by_scope" value="main,test"/>
		</attributes>
	</classpathentry>
	<classpathentry kind="src" output="bin/main" path="src/kotlinPackage/java">
		<attributes>
			<attribute name="gradle_scope" value="main"/>
			<attribute name="gradle_used_by_scope" value="main,test"/>
		</attributes>
	</classpathentry>
	<classpathentry kind="con" path="org.eclipse.jdt.launching.JRE_CONTAINER/org.eclipse.jdt.internal.debug.ui.launcher.StandardVMType/JavaSE-1.8/"/>
	<classpathentry kind="con" path="org.eclipse.buildship.core.gradleclasspathcontainer"/>
	<classpathentry kind="output" path="bin/default"/>
</classpath>`;

  // Write all configuration files
  fs.writeFileSync(buildshipPrefs, buildshipContent);
  fs.writeFileSync(jdtCorePrefs, jdtCoreContent);
  fs.writeFileSync(jdtLaunchingPrefs, jdtLaunchingContent);
  fs.writeFileSync(projectFile, projectContent);
  fs.writeFileSync(classpathFile, classpathContent);

  console.log('✅ Created comprehensive .settings configuration');

  // Step 3: Fix build.gradle if needed
  console.log('🔧 Checking and fixing build.gradle...');
  
  const buildGradlePath = path.join(asyncStoragePath, 'build.gradle');
  if (fs.existsSync(buildGradlePath)) {
    let buildGradleContent = fs.readFileSync(buildGradlePath, 'utf8');
    
    // Ensure proper Java compatibility
    if (!buildGradleContent.includes('compileOptions')) {
      const compileOptions = `
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }`;
      
      buildGradleContent = buildGradleContent.replace(
        /(android\s*{)/,
        `$1${compileOptions}`
      );
      
      fs.writeFileSync(buildGradlePath, buildGradleContent);
      console.log('✅ Added compileOptions to build.gradle');
    }
  }

  // Step 4: Create gradle.properties for AsyncStorage
  console.log('⚙️ Setting up gradle.properties...');
  
  const gradlePropsPath = path.join(asyncStoragePath, 'gradle.properties');
  const gradlePropsContent = `# AsyncStorage specific properties
org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
org.gradle.parallel=true
org.gradle.daemon=true
org.gradle.configureondemand=true
android.useAndroidX=true
android.enableJetifier=true
# Java compatibility
org.gradle.java.home=
`;

  fs.writeFileSync(gradlePropsPath, gradlePropsContent);
  console.log('✅ Created gradle.properties for AsyncStorage');

  // Step 5: Fix main project gradle.properties
  console.log('🔧 Updating main project gradle.properties...');
  
  const mainGradlePropsPath = path.join(projectRoot, 'android', 'gradle.properties');
  if (fs.existsSync(mainGradlePropsPath)) {
    let mainGradleProps = fs.readFileSync(mainGradlePropsPath, 'utf8');
    
    // Ensure proper JVM args and Java compatibility
    if (!mainGradleProps.includes('org.gradle.jvmargs')) {
      mainGradleProps += '\norg.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8\n';
    }
    
    if (!mainGradleProps.includes('android.useAndroidX')) {
      mainGradleProps += '\nandroid.useAndroidX=true\nandroid.enableJetifier=true\n';
    }
    
    fs.writeFileSync(mainGradlePropsPath, mainGradleProps);
    console.log('✅ Updated main project gradle.properties');
  }

  // Step 6: Clear Gradle cache
  console.log('🗑️ Clearing Gradle cache...');
  
  try {
    const gradleCacheDir = path.join(require('os').homedir(), '.gradle', 'caches');
    if (fs.existsSync(gradleCacheDir)) {
      // Clear specific AsyncStorage cache
      const asyncStorageCacheDir = path.join(gradleCacheDir, 'modules-2', 'files-2.1', 'com.reactnativecommunity.asyncstorage');
      if (fs.existsSync(asyncStorageCacheDir)) {
        fs.rmSync(asyncStorageCacheDir, { recursive: true, force: true });
        console.log('✅ Cleared AsyncStorage Gradle cache');
      }
    }
  } catch (error) {
    console.log('⚠️ Could not clear Gradle cache (this is usually fine)');
  }

  // Step 7: Create wrapper script for clean builds
  console.log('📝 Creating build wrapper script...');
  
  const wrapperScript = `#!/bin/bash
echo "🧹 Cleaning project..."
cd android
./gradlew clean
cd ..

echo "📦 Reinstalling node modules..."
rm -rf node_modules
npm install

echo "🔧 Running AsyncStorage fix..."
npm run fix-asyncstorage-comprehensive

echo "🚀 Building project..."
npx expo run:android
`;

  const wrapperScriptPath = path.join(projectRoot, 'scripts', 'cleanAndBuild.sh');
  fs.writeFileSync(wrapperScriptPath, wrapperScript);
  
  // Make it executable on Unix systems
  try {
    fs.chmodSync(wrapperScriptPath, '755');
  } catch (error) {
    // Ignore on Windows
  }

  console.log('✅ Created clean build wrapper script');

  console.log('🎉 Comprehensive AsyncStorage fix completed successfully!');
  console.log('');
  console.log('📝 Next steps:');
  console.log('   1. Run: npm run fix-asyncstorage-comprehensive');
  console.log('   2. Clean: cd android && ./gradlew clean');
  console.log('   3. Build: npx expo run:android');
  console.log('');
  console.log('💡 If issues persist, try:');
  console.log('   - Delete node_modules and reinstall');
  console.log('   - Clear Android Studio cache');
  console.log('   - Restart your development environment');

} catch (error) {
  console.error('❌ Error in comprehensive AsyncStorage fix:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
}
