const searchFormHandler = async (event) => {
    event.preventDefault();

    const plantName = document.querySelector("#plantName").value;

    if(plantName) {
        const response = await fetch(`/get-plant-data/${encodeURI(plantName)}`);
        const plant = await response.json();

        document.querySelector("#plantData").innerHTML = plant;
    }
};

document.querySelector('form').addEventListener('submit', searchFormHandler);