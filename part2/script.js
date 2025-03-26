// On form submission
document.getElementById('carbonForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const electricityUsage = parseFloat(document.getElementById('electricityUsage').value);
    const gasUsage = parseFloat(document.getElementById('gasUsage').value);

    // Carbon footprint calculation
    const carbonFootprint = (electricityUsage * 0.92) + (gasUsage * 1.83); // Placeholder formula

    // Display calculated footprint
    document.getElementById('carbonFootprint').innerText = carbonFootprint.toFixed(2);

    // Display recommendations based on carbon footprint
    displayRecommendations(carbonFootprint);
});

// Display recommendations based on carbon footprint
function displayRecommendations(footprint) {
    const recommendationsList = document.getElementById('recommendationsList');
    recommendationsList.innerHTML = ''; // Clear previous recommendations

    let recommendation = '';
    if (footprint < 5) {
        recommendation = 'You have a low carbon footprint. Keep up the good work!';
    } else if (footprint < 15) {
        recommendation = 'Your carbon footprint is moderate. Consider using more energy-efficient appliances.';
    } else {
        recommendation = 'Your carbon footprint is high. Try reducing energy consumption and consider renewable energy sources.';
    }

    const li = document.createElement('li');
    li.innerText = recommendation;
    recommendationsList.appendChild(li);
}
