export default {
  insert: (table, object) => {
    const cols = Object.keys(object).join(', ');
    const values = `"${Object.values(object).join('", "')}"`;
    const sql = `INSERT INTO ${table} (${cols}) VALUES (${values});`;
    return sql;
  },
}