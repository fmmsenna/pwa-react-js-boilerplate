export const VERSION = "0.0.1";
export const BUILD_NUMBER = "1";
export const RELEASE_TYPE = "beta"; // 'alpha', 'beta', 'rc', 'stable'

export const getFullVersion = () =>
  `${RELEASE_TYPE}-${VERSION}.${BUILD_NUMBER}`;
