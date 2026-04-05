const postgres = require('postgres');

const sql = postgres("postgresql://postgres.fecxnctfsogfkmntfggd:Afraim3499%3F@aws-1-eu-west-2.pooler.supabase.com:6543/postgres");

async function checkAdmins() {
  try {
    const admins = await sql`SELECT email, name FROM admin_users`;
    console.log("Admins found:", JSON.stringify(admins, null, 2));
  } catch (err) {
    console.error("Error connecting to DB:", err.message);
  } finally {
    await sql.end();
  }
}

checkAdmins();
