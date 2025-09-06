const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Generate a secure JWT secret
function generateJWTSecret() {
  return crypto.randomBytes(64).toString('hex');
}

// Create .env.local file with default values
function createEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local');
  
  // Check if .env.local already exists
  if (fs.existsSync(envPath)) {
    console.log('⚠️  .env.local already exists. Please add the following variables manually:');
    console.log('');
    console.log('# JWT Authentication');
    console.log(`JWT_SECRET=${generateJWTSecret()}`);
    console.log('JWT_EXPIRES_IN=7d');
    console.log('ADMIN_EMAIL=admin@nithyanruthyaaradana.art');
    console.log('ADMIN_PASSWORD_HASH=$2b$10$2Dh92ex1iAlHcro3Jd96ZO70o2GBHdBkjjx/OQbtlMix2HugmMjoK');
    console.log('');
    return;
  }

  const envContent = `# JWT Authentication
JWT_SECRET=${generateJWTSecret()}
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@nithyanruthyaaradana.art
ADMIN_PASSWORD_HASH=$2b$10$2Dh92ex1iAlHcro3Jd96ZO70o2GBHdBkjjx/OQbtlMix2HugmMjoK

# Firebase Configuration (optional)
# NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
# NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
# NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
# NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
# NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
# NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# AI Integration (optional)
# GOOGLE_AI_API_KEY=your_ai_api_key_here
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env.local file with JWT authentication setup');
  console.log('');
  console.log('🔐 Admin Login Credentials:');
  console.log('Email: admin@nithyanruthyaaradana.art');
  console.log('Password: admin123');
  console.log('');
  console.log('⚠️  Please change the default password in production!');
}

// Main setup function
function setup() {
  console.log('🚀 Setting up JWT Authentication for Nithyanruthyaaradana Admin Panel');
  console.log('');
  
  createEnvFile();
  
  console.log('📝 Next steps:');
  console.log('1. Review the .env.local file');
  console.log('2. Change the default admin password');
  console.log('3. Run: npm run dev');
  console.log('4. Visit: http://localhost:3000/admin/login');
  console.log('');
  console.log('🎉 JWT Authentication setup complete!');
}

setup();
