import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach((line) => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim();
      if (key && val && !process.env[key]) {
        process.env[key] = val;
      }
    }
  });
}

const supabaseUrl = process.env.SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;
const dbUrl = `postgres://postgres.jwyjsdheoayfysbuhalz:${secretKey}@aws-0-ap-south-1.pooler.supabase.com:6543/postgres`;

console.log('Testing Supabase REST query with Secret Key...');

async function testRest() {
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        'apikey': secretKey,
        'Authorization': `Bearer ${secretKey}`
      }
    });
    console.log('REST Endpoint Status:', res.status);
    const text = await res.text();
    console.log('API Response (first 200 chars):', text.substring(0, 200));
  } catch (err) {
    console.error('REST Error:', err);
  }
}

testRest();
