const { Pool } = require('pg');

export async function fetchSampleData(query: string, type: string) {
  const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });
  try {

    const data = await pool.query(`
    SELECT 
    TO_CHAR(DATE_TRUNC('year', transfer_date), 'YYYY') AS transfer_date,
    ROUND(AVG(CASE WHEN property_type = 'T' THEN price ELSE NULL END))::INTEGER AS terraced,
    ROUND(AVG(CASE WHEN property_type = 'S' THEN price ELSE NULL END))::INTEGER AS semi_detached_houses_average_price,
    ROUND(AVG(CASE WHEN property_type = 'D' THEN price ELSE NULL END))::INTEGER AS detached_houses_average_price,
    ROUND(AVG(CASE WHEN property_type = 'F' THEN price ELSE NULL END))::INTEGER AS flats_average_price
    FROM 
        LE4
    GROUP BY 
        DATE_TRUNC('year', transfer_date)
    ORDER BY 
        transfer_date;
      `);

    // log count of rows in data
    // console.debug("Data rowcount: " + data.rowCount);
    // console.log("Sample data: ", data.rows);
    return data.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch SAMPLE table.');
  }
}

export async function fetchRealData(query: string, type: string) {
  const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });
  try {
    let data = [];
    const postcodeQuery = `SELECT 
    TO_CHAR(DATE_TRUNC('year', transfer_date), 'YYYY') AS transfer_date,
    ROUND(AVG(CASE WHEN property_type = 'T' THEN price ELSE NULL END))::INTEGER AS terraced,
    ROUND(AVG(CASE WHEN property_type = 'S' THEN price ELSE NULL END))::INTEGER AS semi_detached_houses_average_price,
    ROUND(AVG(CASE WHEN property_type = 'D' THEN price ELSE NULL END))::INTEGER AS detached_houses_average_price,
    ROUND(AVG(CASE WHEN property_type = 'F' THEN price ELSE NULL END))::INTEGER AS flats_average_price
    FROM 
        price_paid_complete
    WHERE
        postcode = $1
    GROUP BY 
        DATE_TRUNC('year', transfer_date)
    ORDER BY 
        transfer_date;`;

    const outcodeQuery = `SELECT 
        TO_CHAR(DATE_TRUNC('year', transfer_date), 'YYYY') AS transfer_date,
        ROUND(AVG(CASE WHEN property_type = 'T' THEN price ELSE NULL END))::INTEGER AS terraced,
        ROUND(AVG(CASE WHEN property_type = 'S' THEN price ELSE NULL END))::INTEGER AS semi_detached_houses_average_price,
        ROUND(AVG(CASE WHEN property_type = 'D' THEN price ELSE NULL END))::INTEGER AS detached_houses_average_price,
        ROUND(AVG(CASE WHEN property_type = 'F' THEN price ELSE NULL END))::INTEGER AS flats_average_price
        FROM 
            price_paid_complete
        WHERE
            outcode = $1
        GROUP BY 
            DATE_TRUNC('year', transfer_date)
        ORDER BY 
            transfer_date;`;
    if (type === 'postcode') {
      data = await pool.query(postcodeQuery, [query]);
    } else {
      data = await pool.query(outcodeQuery, [query]);
    }

    // log count of rows in data
    console.debug("Data rowcount: " + data.rowCount);



    // console.log("Sample data: ", data.rows);
    return data.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch SAMPLE table.');
  }
}