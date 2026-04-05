const postgres = require('postgres');
require('dotenv').config({ path: '.env.local' });

const sql = postgres(process.env.DATABASE_URL);

async function checkAdmins() {
  try {
    const admins = await sql`SELECT email, name FROM admin_users`;
    console.log("Admins found:", admins);
  } catch (err) {
    console.error("Error connecting to DB:", err.message);
  } finally {
    await sql.end();
  }
}

checkAdmins();
