let button = document.querySelector("button")
button.addEventListener('click', () => {
    document.getElementById("city").defaultValue = "london";
    let city = document.getElementById("city").value
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=b2e13f98fb5e4e278d491710243007&q=${city}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            document.getElementById('city-1').textContent = ` ${data.location.name}`;
            document.getElementById('state').textContent = ` ${data.location.region}` + " |";
            document.getElementById('country').textContent = ` ${data.location.country}`;
            document.getElementById('weather-img').src = data.current.condition.icon;
            document.getElementById('weather-img').alt = data.current.condition.text;
            document.getElementById('text-1').textContent = `${data.current.condition.text}`;

            document.getElementById('temperature').textContent = ` ${data.current.temp_c}°C` + " / " + " ";
            document.getElementById('Fahrenheit').textContent = ` ${data.current.temp_f}°f`;

        })

});
