/**
 * Check Environment Variables Format
 * This script checks the format of your environment variables without exposing the actual values
 */

require('dotenv').config();

const checkEnvVars = () => {
  console.log('🔍 Checking Environment Variables Format...\n');

  const clientId = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET;

  console.log('📋 Spotify Client ID:');
  console.log(`   Length: ${clientId ? clientId.length : 0} characters`);
  console.log(`   Format: ${clientId ? 'Present' : 'Missing'}`);
  if (clientId) {
    console.log(`   Starts with: ${clientId.substring(0, 4)}...`);
    console.log(`   Ends with: ...${clientId.substring(clientId.length - 4)}`);
  }

  console.log('\n📋 Spotify Client Secret:');
  console.log(`   Length: ${clientSecret ? clientSecret.length : 0} characters`);
  console.log(`   Format: ${clientSecret ? 'Present' : 'Missing'}`);
  if (clientSecret) {
    console.log(`   Starts with: ${clientSecret.substring(0, 4)}...`);
    console.log(`   Ends with: ...${clientSecret.substring(clientSecret.length - 4)}`);
  }

  // Check for common issues
  console.log('\n🔍 Common Issues Check:');
  
  if (clientId && clientId.includes(' ')) {
    console.log('   ❌ Client ID contains spaces - remove them');
  } else {
    console.log('   ✅ Client ID format looks good');
  }

  if (clientSecret && clientSecret.includes(' ')) {
    console.log('   ❌ Client Secret contains spaces - remove them');
  } else {
    console.log('   ✅ Client Secret format looks good');
  }

  if (clientId && clientId.length < 20) {
    console.log('   ❌ Client ID seems too short');
  } else {
    console.log('   ✅ Client ID length looks good');
  }

  if (clientSecret && clientSecret.length < 20) {
    console.log('   ❌ Client Secret seems too short');
  } else {
    console.log('   ✅ Client Secret length looks good');
  }

  // Check for quotes
  if (clientId && (clientId.startsWith('"') || clientId.startsWith("'"))) {
    console.log('   ❌ Client ID is wrapped in quotes - remove them');
  }

  if (clientSecret && (clientSecret.startsWith('"') || clientSecret.startsWith("'"))) {
    console.log('   ❌ Client Secret is wrapped in quotes - remove them');
  }
};

checkEnvVars();
