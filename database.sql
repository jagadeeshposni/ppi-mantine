CREATE TABLE price_paid_complete (
    id SERIAL PRIMARY KEY,
    trx_uid UUID,
    price NUMERIC,
    transfer_date DATE,
    postcode VARCHAR(8),
    property_type CHAR(1),
    age CHAR(1),
    duration CHAR(1),
    paon VARCHAR(255),
    soan VARCHAR(255),
    street VARCHAR(255),
    locality VARCHAR(255),
    city VARCHAR(255),
    district VARCHAR(255),
    county VARCHAR(255),
    ppd_cat_type CHAR(1),
    record_status CHAR(1)
);

SELECT DATE_TRUNC('month', transfer_date) AS month, AVG(price) AS average_price
        FROM public.price_paid_complete
        WHERE postcode LIKE 'LE1' || '%'
        GROUP BY month
        ORDER BY month;



ALTER TABLE public.price_paid_complete ADD COLUMN transfer_year INT;
UPDATE public.price_paid_complete SET transfer_year = EXTRACT(YEAR FROM transfer_date)::INT;

select max(transfer_date) from public.price_paid_complete;

ALTER TABLE public.price_paid_complete DROP COLUMN trx_uid;


ALTER TABLE public.price_paid_complete ADD COLUMN outcode VARCHAR(8);
update public.price_paid_complete SET outcode = SUBSTRING(postcode FROM 1 FOR POSITION(' ' IN postcode) - 1);

UPDATE public.price_paid_complete
SET outcode = CASE 
                WHEN POSITION(' ' IN postcode) > 0 THEN SUBSTRING(postcode FROM 1 FOR POSITION(' ' IN postcode) - 1)
                ELSE postcode
              END;

select postcode, outcode from price_paid_complete group by postcode, outcode having  postcode like 'LE%';


SELECT 
    TO_CHAR(DATE_TRUNC('year', transfer_date), 'YYYY') AS transfer_date,
    ROUND(AVG(CASE WHEN property_type = 'T' THEN price ELSE NULL END))::INTEGER AS terraced,
    ROUND(AVG(CASE WHEN property_type = 'S' THEN price ELSE NULL END))::INTEGER AS semi_detached_houses_average_price,
    ROUND(AVG(CASE WHEN property_type = 'D' THEN price ELSE NULL END))::INTEGER AS detached_houses_average_price,
    ROUND(AVG(CASE WHEN property_type = 'F' THEN price ELSE NULL END))::INTEGER AS flats_average_price
FROM 
    price_paid_complete
WHERE
    split_part(postcode, ' ', 1) = split_part('LE4 7QL', ' ', 1) -- $1 is the full postcode parameter, and we're extracting the outcode part to match.
    AND postcode = 'LE4 7QL' -- Optional: further filter to match the exact postcode if necessary.
GROUP BY 
    DATE_TRUNC('year', transfer_date)
ORDER BY 
    transfer_date;