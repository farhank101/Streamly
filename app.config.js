import "dotenv/config";

export default {
  expo: {
    name: "Streamly",
    slug: "Streamly",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "dark",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#121212",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.streamly.app",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#121212",
      },
      package: "com.streamly.app",
    },
    web: {
      bundler: "metro",
      favicon: "./assets/images/icon.png",
      headers: {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp",
      },
    },
    plugins: [
      "expo-router",
      "expo-asset",
      "expo-speech-recognition",
      "expo-font",
    ],
    extra: {
      eas: {
        projectId: "streamly-app",
      },
    },
    scheme: "streamly",
  },
};
