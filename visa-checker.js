let visaData = [];
let nationalities = new Set();
let destinations = new Set();

const csvText = `nationality,destination,requirement
Afghanistan,Albania,e-visa
Afghanistan,Algeria,visa required
Afghanistan,Andorra,visa required`;

// Parse the CSV using PapaParse
Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
        // Process the parsed data
        visaData = results.data.map(entry => ({
            nationality: entry.nationality?.trim(),
            destination: entry.destination?.trim(),
            requirement: entry.requirement?.trim()
        }));

        // Extract unique nationalities and destinations
        visaData.forEach(entry => {
            if (entry.nationality) nationalities.add(entry.nationality);
            if (entry.destination) destinations.add(entry.destination);
        });

        // Populate dropdowns
        populateDropdown('nationality', Array.from(nationalities));
        populateDropdown('destination', Array.from(destinations));
    },
    error: function (error) {
        console.error('PapaParse Error:', error);
    }
});

// Populate dropdowns with data
function populateDropdown(dropdownId, items) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = `<option value="" disabled selected>Select ${dropdownId}...</option>`;
    items.sort().forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        dropdown.appendChild(option);
    });
}

// Check visa requirements
function checkVisa() {
    const nationalityInput = document.getElementById('nationality').value;
    const destinationInput = document.getElementById('destination').value;

    const resultDiv = document.getElementById('result');

    if (visaData.length === 0) {
        resultDiv.innerHTML = '<p>No visa data available. Ensure the CSV is parsed correctly.</p>';
        return;
    }

    const match = visaData.find(
        entry =>
            entry.nationality === nationalityInput &&
            entry.destination === destinationInput
    );

    if (match) {
        resultDiv.innerHTML = `<p><strong>Requirement:</strong> ${match.requirement}</p>`;
    } else {
        resultDiv.innerHTML = '<p><strong>Requirement:</strong> No requirement found. Please check the selected options.</p>';
    }
}


                
