-- Find earliest user created date
SELECT
	DATE_FORMAT(MIN(created_at), "%M %D %Y") AS "First User"
FROM `join_us`.users;

-- Find user associated with the date
SELECT
	email AS "E-Mail",
    DATE_FORMAT(created_at, "%M %D %Y") AS "Date"
FROM `join_us`.users
WHERE created_at = (SELECT MIN(created_at) FROM `join_us`.users);

-- Monthly activty break down
SELECT
	MONTHNAME(created_at) AS "Month",
    COUNT(created_at) AS "User Creations"
FROM `join_us`.users
GROUP BY Month
ORDER BY "User Creation" DESC;

-- Users with Yahoo addresses
SELECT 
	COUNT(email) AS "Yahoo E-Mail Users"
FROM `join_us`.users
WHERE email LIKE "%@yahoo%";

-- Breakdown by E-mail provider
SELECT
	CASE
		WHEN email LIKE "%@gmail%" THEN "GMail"
        WHEN email LIKE "%@hotmail%" THEN "Hotmail"
        WHEN email LIKE "%@yahoo%" THEN "Yahoo"
        ELSE "Other"
    END AS Provider,
    COUNT(*) AS "Total Users"
FROM `join_us`.users
GROUP BY Provider
ORDER BY "Total Users" DESC;



