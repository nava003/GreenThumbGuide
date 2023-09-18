//const { response } = require("express");

const searchFormHandler = async (event) => {
    event.preventDefault();

    const plantName = document.querySelector("#plantName").value;

    if(plantName) {
        console.log('entered if statement of \'If plantName has a value\':', plantName)
        const response = await fetch('/get-plant-data')
        .catch((error) => {
            console.log('Error:', error);
        });

        console.log('homepage.js response:', response);

        // if(response.ok) {

        //     document.location.replace('/');
        // } else {
        //     alert('Failed to retrieve plant name.');
        // }
    }
};

document.querySelector('form').addEventListener('submit', searchFormHandler);