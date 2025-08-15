// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const fs = require("fs");
const path = require("path");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add HTTPS support for development on web only
if (process.env.NODE_ENV === "development" && process.env.EXPO_PUBLIC_PLATFORM === "web") {
  const certPath = path.join(__dirname, "ssl", "cert.pem");
  const keyPath = path.join(__dirname, "ssl", "key.pem");
  
  // Only use HTTPS if certificates exist
  if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
    try {
      const httpsConfig = {
        cert: fs.readFileSync(certPath),
        key: fs.readFileSync(keyPath),
      };

      config.server = {
        ...config.server,
        https: httpsConfig,
      };
    } catch (error) {
      console.warn("Failed to load SSL certificates:", error);
    }
  }
}

module.exports = config;
