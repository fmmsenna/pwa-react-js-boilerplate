const fs = require("fs").promises;
const path = require("path");

// Import the version from version.js
const {
  VERSION,
  RELEASE_TYPE,
  BUILD_NUMBER,
  getFullVersion,
  getNpmVersion,
} = require("./src/version.js");

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
  const manifestPath = path.join(__dirname, "public", "manifest.json");
  const packagePath = path.join(__dirname, "package.json");
  const packageLockPath = path.join(__dirname, "package-lock.json");

  await updateFile(manifestPath, (manifest) => {
    manifest.version = getFullVersion();
    manifest.short_name = `${manifest.short_name} ${VERSION}`;
    manifest.name = `${manifest.name} ${RELEASE_TYPE}`;
    return manifest;
  });

  await updateFile(packagePath, (packageJson) => {
    packageJson.version = getNpmVersion();
    return packageJson;
  });

  await updateFile(packageLockPath, (packageLockJson) => {
    packageLockJson.version = getNpmVersion();
    return packageLockJson;
  });

  console.log(
    `All version-related files have been updated to version ${VERSION}, build ${BUILD_NUMBER}, release type ${RELEASE_TYPE}.`
  );
}

updateFiles();
