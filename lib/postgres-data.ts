const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

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

/*
SELECT transfer_date, price, property_type
FROM price_paid_complete
WHERE postcode = 'LA3 1PT'
ORDER BY transfer_date ASC;
*/

export async function fetchPricePaidDataForPostcode(postcode: string) {
  try {
    let data = [];
    const postcodeQuery = `
    select 
    to_char(transfer_date, 'dd-mm-yyyy') AS transfer_date, 
    price, 
    soan, 
    paon,  
    street, 
    city, 
    county,
    property_type,
    age
    from price_paid_complete 
    where postcode = $1 
    `;
    data = await pool.query(postcodeQuery, [postcode]);
    // log count of rows in data
    console.debug("PricePaidDataForPostcode: " + data.rowCount);

    console.log("fetchPricePaidDataForPostcode data: ", data.rows);
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