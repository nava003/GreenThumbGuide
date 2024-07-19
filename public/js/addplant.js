const addPlantFormHandler = async (event) => {
    event.preventDefault();

    const plant_name = document.querySelector('#plant_name').value.trim();
    const soilType = document.querySelector('#soilType').value.trim();
    const wateringInches = parseFloat(document.querySelector('#wateringInches').value.trim());
    const toxicToPets = (document.querySelector('#toxicToPets').value === 'true');
    const sunlight = document.querySelector('#sunlight').value.trim();
    const wateringFrequency = document.querySelector('#wateringFrequency').value.trim();

    console.log('Before JSON:', plant_name, soilType, wateringInches, toxicToPets, sunlight, wateringFrequency);

    if (plant_name && soilType && !isNaN(wateringInches)
        && typeof toxicToPets === 'boolean' && sunlight && wateringFrequency)
    {
        const response = await fetch(`/api/plants`, {
            method: 'POST',
            body: JSON.stringify({
                plant_name,
                soilType,
                wateringInches,
                toxicToPets,
                sunlight,
                wateringFrequency,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log("JSON Body:", JSON.stringify({ plant_name, soilType, wateringInches, toxicToPets, sunlight, wateringFrequency }))
        console.log(response);

        if (response.ok) {
            document.location.replace('/plantGallery');
        } else {
            alert(response.statusText);
        }
    } else {
        console.log('Statement is false. Fix the code.');
    }
};

document.querySelector('.new-plant-form').addEventListener('submit', addPlantFormHandler);