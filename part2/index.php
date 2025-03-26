<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carbon Footprint Calculator</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <div class="container">
            <h1>Calculate Your Carbon Footprint</h1>
            <p>Enter your energy usage details and track your environmental impact.</p>
        </div>
    </header>

    <!-- Carbon Footprint Calculator Section -->
    <section class="carbon-calculator">
        <div class="container">
            <h2>Energy Usage Details</h2>
            <form id="carbonForm" method="POST" action="storeData.php">
                <div class="form-group">
                    <label for="electricityUsage">Electricity Usage (kWh/month)</label>
                    <input type="number" id="electricityUsage" name="electricityUsage" required>
                </div>
                <div class="form-group">
                    <label for="gasUsage">Gas Usage (m3/month)</label>
                    <input type="number" id="gasUsage" name="gasUsage" required>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Calculate Footprint</button>
                </div>
            </form>
            <div id="calculatedFootprint" class="result">
                <h3>Your Carbon Footprint: <span id="carbonFootprint">0</span> tons/year</h3>
            </div>
        </div>
    </section>

    <!-- Usage Tracking Section -->
    <section class="usage-tracking">
        <div class="container">
            <h2>Usage Tracking</h2>
            <div id="usageChart"></div>
        </div>
    </section>

    <!-- Recommendations Section -->
    <section class="recommendations">
        <div class="container">
            <h2>Recommendations</h2>
            <ul id="recommendationsList">
                <!-- Dynamic recommendations will be inserted here -->
            </ul>
        </div>
    </section>

    <footer>
        <div class="container">
            <p>&copy; 2025 Green Technology Solutions</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>
