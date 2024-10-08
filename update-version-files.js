// update-version-files.js
const fs = require("fs").promises;
const path = require("path");

// Determine the base directory
const baseDir = process.cwd();

// Import the version from version.js
let VERSION, RELEASE_TYPE, BUILD_NUMBER;

async function importVersion() {
  const versionPath = path.join(baseDir, "src", "version.js");
  const versionContent = await fs.readFile(versionPath, "utf8");

  // Use regex to extract values
  VERSION = versionContent.match(/VERSION\s*=\s*"([^"]+)"/)?.[1];
  RELEASE_TYPE = versionContent.match(/RELEASE_TYPE\s*=\s*"([^"]+)"/)?.[1];
  BUILD_NUMBER = versionContent.match(/BUILD_NUMBER\s*=\s*"([^"]+)"/)?.[1];
}

function getVersionString() {
  return `${RELEASE_TYPE}-${VERSION}.${BUILD_NUMBER}`;
}

async function updateFile(filePath, updateFn) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    const updatedContent = updateFn(JSON.parse(content));
    await fs.writeFile(filePath, JSON.stringify(updatedContent, null, 2));
    console.log(`Updated ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`Error updating ${path.basename(filePath)}:`, error);
  }
}

async function updateFiles() {
  try {
    await importVersion();

    const manifestPath = path.join(baseDir, "public", "manifest.json");
    const packagePath = path.join(baseDir, "package.json");
    const packageLockPath = path.join(baseDir, "package-lock.json");

    const versionString = getVersionString();

    await updateFile(manifestPath, (manifest) => {
      manifest.version = versionString;
      // Do not modify short_name and name
      return manifest;
    });

    await updateFile(packagePath, (packageJson) => {
      packageJson.version = versionString;
      return packageJson;
    });

    await updateFile(packageLockPath, (packageLockJson) => {
      packageLockJson.version = versionString;
      return packageLockJson;
    });

    console.log(
      `All version-related files have been updated to version ${versionString}.`
    );
  } catch (error) {
    console.error("Error updating version files:", error);
  }
}

updateFiles().catch(console.error);
