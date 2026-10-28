import pkg from 'pg';
const { Client } = pkg;
import fs from 'fs';
import path from 'path';

// Read .env
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

const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

// Try different host formats if needed
const connectionStrings = [
  `postgresql://postgres:${secretKey}@db.jwyjsdheoayfysbuhalz.supabase.co:5432/postgres`,
  `postgresql://postgres.jwyjsdheoayfysbuhalz:${secretKey}@aws-0-ap-south-1.pooler.supabase.com:6543/postgres`,
  `postgresql://postgres.jwyjsdheoayfysbuhalz:${secretKey}@aws-0-ap-south-1.pooler.supabase.com:5432/postgres`
];

async function setup() {
  const sqlScript = fs.readFileSync(path.resolve(process.cwd(), 'supabase-schema.sql'), 'utf8');

  for (const connStr of connectionStrings) {
    console.log('\nAttempting connection to PostgreSQL...');
    const client = new Client({
      connectionString: connStr,
      ssl: { rejectUnauthorized: false }
    });

    try {
      await client.connect();
      console.log('Connected to PostgreSQL successfully!');

      console.log('Executing database schema SQL (Creating tables & RLS policies)...');
      await client.query(sqlScript);
      console.log('✅ DDL Schema created successfully!');

      await client.end();
      return true;
    } catch (err) {
      console.warn(`Connection attempt failed: ${err.message}`);
      try { await client.end(); } catch {}
    }
  }

  return false;
}

setup();
