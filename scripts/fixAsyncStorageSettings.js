const fs = require('fs');
const path = require('path');

const asyncStoragePath = path.join(__dirname, '..', 'node_modules', '@react-native-async-storage', 'async-storage', 'android', '.settings');

// Create .settings directory if it doesn't exist
if (!fs.existsSync(asyncStoragePath)) {
  fs.mkdirSync(asyncStoragePath, { recursive: true });
  console.log('Created .settings directory for AsyncStorage');
}

// Create required configuration files
const buildshipPrefs = path.join(asyncStoragePath, 'org.eclipse.buildship.core.prefs');
const jdtCorePrefs = path.join(asyncStoragePath, 'org.eclipse.jdt.core.prefs');
const jdtLaunchingPrefs = path.join(asyncStoragePath, 'org.eclipse.jdt.launching.prefs');
const projectFile = path.join(path.dirname(asyncStoragePath), '.project');

// Write configuration files
fs.writeFileSync(buildshipPrefs, `eclipse.preferences.version=1
connection.project.dir=
connection.working.dir=`);

fs.writeFileSync(jdtCorePrefs, `eclipse.preferences.version=1
org.eclipse.jdt.core.compiler.processAnnotations=disabled`);

fs.writeFileSync(jdtLaunchingPrefs, `eclipse.preferences.version=1
org.eclipse.jdt.launching.PREF_STRICTLY_COMPATIBLE_JRE_NOT_AVAILABLE=warning`);

fs.writeFileSync(projectFile, `<?xml version="1.0" encoding="UTF-8"?>
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
</projectDescription>`);

console.log('AsyncStorage .settings configuration files created successfully');
