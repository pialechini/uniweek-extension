import packageJson from "./package.json";

/**
 * After changing, please reload the extension at `chrome://extensions`
 */
const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  permissions: ["storage"],
  host_permissions: ["https://*/*"],
  background: {
    service_worker: "src/pages/background/index.js",
    type: "module",
  },
  icons: {
    "16": "icon-16.png",
    "32": "icon-32.png",
    "48": "icon-48.png",
    "128": "icon-128.png",
  },
  content_scripts: [
    {
      // TODO remove the line below
      // matches: ["https://golestan.shahroodut.ac.ir/*"],
      matches: ["*://*/*"],
      js: ["src/pages/content/index.js"],
      css: ["assets/css/contentStyle<KEY>.chunk.css"],
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        "verification.html",
        "assets/js/*.js",
        "assets/css/*.css",
        "icon-16.png",
        "icon-32.png",
        "icon-48.png",
        "icon-128.png",
      ],
      // TODO remove the line below
      // matches: ["https://golestan.shahroodut.ac.ir/*"],
      matches: ["*://*/*"],
    },
  ],
  commands: {
    getWeekSchedule: {
      suggested_key: {
        default: "Alt+B",
      },
      description: "get week schedule from the page",
    },
  },
};

export default manifest;
