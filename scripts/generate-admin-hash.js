const bcrypt = require('bcryptjs');

// Generate a password hash for the admin user
async function generateHash() {
  const password = process.argv[2] || 'admin123';
  const saltRounds = 10;
  
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log('Password:', password);
    console.log('Hash:', hash);
    console.log('\nAdd this to your .env.local file:');
    console.log(`ADMIN_PASSWORD_HASH=${hash}`);
  } catch (error) {
    console.error('Error generating hash:', error);
  }
}

generateHash();
