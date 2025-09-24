const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing AsyncStorage build path issues...');

const asyncStoragePath = path.join(__dirname, '..', 'node_modules', '@react-native-async-storage', 'async-storage', 'android');

// Create .settings directory if it doesn't exist
const settingsPath = path.join(asyncStoragePath, '.settings');
if (!fs.existsSync(settingsPath)) {
  fs.mkdirSync(settingsPath, { recursive: true });
  console.log('✅ Created .settings directory for AsyncStorage');
}

// Create required configuration files
const buildshipPrefs = path.join(settingsPath, 'org.eclipse.buildship.core.prefs');
const jdtCorePrefs = path.join(settingsPath, 'org.eclipse.jdt.core.prefs');
const jdtLaunchingPrefs = path.join(settingsPath, 'org.eclipse.jdt.launching.prefs');
const projectFile = path.join(asyncStoragePath, '.project');
const classpathFile = path.join(asyncStoragePath, '.classpath');

// Write configuration files
const buildshipContent = `eclipse.preferences.version=1
connection.project.dir=
connection.working.dir=`;

const jdtCoreContent = `eclipse.preferences.version=1
org.eclipse.jdt.core.compiler.processAnnotations=disabled
org.eclipse.jdt.core.compiler.source=1.8
org.eclipse.jdt.core.compiler.compliance=1.8
org.eclipse.jdt.core.compiler.codegen.targetPlatform=1.8`;

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

const classpathContent = `<?xml version="1.0" encoding="UTF-8"?>
<classpath>
	<classpathentry kind="src" output="bin/main" path="src/main/java">
		<attributes>
			<attribute name="gradle_scope" value="main"/>
			<attribute name="gradle_used_by_scope" value="main,test"/>
		</attributes>
	</classpathentry>
	<classpathentry kind="src" output="bin/main" path="src/main/kotlin">
		<attributes>
			<attribute name="gradle_scope" value="main"/>
			<attribute name="gradle_used_by_scope" value="main,test"/>
		</attributes>
	</classpathentry>
	<classpathentry kind="con" path="org.eclipse.jdt.launching.JRE_CONTAINER/org.eclipse.jdt.internal.debug.ui.launcher.StandardVMType/JavaSE-1.8/"/>
	<classpathentry kind="con" path="org.eclipse.buildship.core.gradleclasspathcontainer"/>
	<classpathentry kind="output" path="bin/default"/>
</classpath>`;

try {
  fs.writeFileSync(buildshipPrefs, buildshipContent);
  fs.writeFileSync(jdtCorePrefs, jdtCoreContent);
  fs.writeFileSync(jdtLaunchingPrefs, jdtLaunchingContent);
  fs.writeFileSync(projectFile, projectContent);
  fs.writeFileSync(classpathFile, classpathContent);

  console.log('✅ AsyncStorage .settings configuration files created successfully');
  console.log('✅ Build path configuration updated');
  
  // Also create build.gradle if it doesn't exist
  const buildGradlePath = path.join(asyncStoragePath, 'build.gradle');
  if (!fs.existsSync(buildGradlePath)) {
    const buildGradleContent = `apply plugin: 'com.android.library'

android {
    compileSdkVersion 34
    
    defaultConfig {
        minSdkVersion 21
        targetSdkVersion 34
        versionCode 1
        versionName "1.0"
    }
    
    buildTypes {
        release {
            minifyEnabled false
        }
    }
    
    sourceSets {
        main {
            java.srcDirs = ['src/main/java', 'src/main/kotlin']
        }
    }
}

dependencies {
    implementation 'com.facebook.react:react-native:+'
}`;
    
    fs.writeFileSync(buildGradlePath, buildGradleContent);
    console.log('✅ Created build.gradle for AsyncStorage');
  }
  
  console.log('🎉 AsyncStorage build path fix completed successfully!');
  
} catch (error) {
  console.error('❌ Error fixing AsyncStorage build path:', error.message);
  process.exit(1);
}
