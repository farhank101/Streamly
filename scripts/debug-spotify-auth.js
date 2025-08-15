/**
 * Debug Spotify Authentication
 * This script provides detailed debugging information for Spotify API authentication
 */

require("dotenv").config();

const debugSpotifyAuth = async () => {
  console.log("🔍 Debugging Spotify Authentication...\n");

  const clientId = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET;

  console.log("📋 Credentials Check:");
  console.log(`   Client ID: ${clientId ? "Present" : "Missing"}`);
  console.log(`   Client Secret: ${clientSecret ? "Present" : "Missing"}`);

  if (!clientId || !clientSecret) {
    console.log("❌ Missing credentials");
    return;
  }

  // Create the authorization header
  const credentials = `${clientId}:${clientSecret}`;
  const base64Credentials = Buffer.from(credentials).toString("base64");

  console.log("\n🔐 Authorization Header:");
  console.log(`   Base64 length: ${base64Credentials.length}`);
  console.log(`   Starts with: ${base64Credentials.substring(0, 10)}...`);

  try {
    console.log("\n🌐 Making authentication request...");

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${base64Credentials}`,
      },
      body: "grant_type=client_credentials",
    });

    console.log(`   Response status: ${response.status}`);
    console.log(`   Response status text: ${response.statusText}`);

    const data = await response.json();

    if (response.ok) {
      console.log("✅ Authentication successful!");
      console.log(`   Token type: ${data.token_type}`);
      console.log(`   Expires in: ${data.expires_in} seconds`);
      console.log(
        `   Access token: ${data.access_token ? "Present" : "Missing"}`
      );
    } else {
      console.log("❌ Authentication failed");
      console.log(`   Error: ${data.error}`);
      console.log(`   Error description: ${data.error_description}`);

      // Additional debugging
      console.log("\n🔍 Additional Debug Info:");
      console.log(`   Client ID length: ${clientId.length}`);
      console.log(`   Client Secret length: ${clientSecret.length}`);
      console.log(`   Client ID contains spaces: ${clientId.includes(" ")}`);
      console.log(
        `   Client Secret contains spaces: ${clientSecret.includes(" ")}`
      );
      console.log(`   Client ID trimmed length: ${clientId.trim().length}`);
      console.log(
        `   Client Secret trimmed length: ${clientSecret.trim().length}`
      );
    }
  } catch (error) {
    console.log("❌ Network error:", error.message);
  }
};

debugSpotifyAuth().catch(console.error);
