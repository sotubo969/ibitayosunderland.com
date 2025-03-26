<?php
// Connect to the SQLite database (creates it if it doesn't exist)
$db = new SQLite3('carbonFootprint.db');

// Create the table if it doesn't already exist
$db->exec('CREATE TABLE IF NOT EXISTS carbon_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    electricity_usage REAL,
    gas_usage REAL,
    carbon_footprint REAL
)');

// Get the form data
$electricityUsage = $_POST['electricityUsage'];
$gasUsage = $_POST['gasUsage'];

// Calculate the carbon footprint (example formula)
$carbonFootprint = ($electricityUsage * 0.92) + ($gasUsage * 1.83); // Placeholder

// Insert data into the database
$stmt = $db->prepare('INSERT INTO carbon_data (electricity_usage, gas_usage, carbon_footprint) VALUES (:electricityUsage, :gasUsage, :carbonFootprint)');
$stmt->bindValue(':electricityUsage', $electricityUsage, SQLITE3_FLOAT);
$stmt->bindValue(':gasUsage', $gasUsage, SQLITE3_FLOAT);
$stmt->bindValue(':carbonFootprint', $carbonFootprint, SQLITE3_FLOAT);

if ($stmt->execute()) {
    // Redirect to the same page with success message
    header('Location: index.php?success=1');
} else {
    // Redirect to the same page with error message
    header('Location: index.php?error=1');
}
?>
