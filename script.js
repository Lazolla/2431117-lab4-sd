document.getElementById("searchBtn").addEventListener("click", () => {
    const countryName = document.getElementById("countryInput").value.trim();
    if (!countryName) {
        alert("Please enter a country name.");
        return;
    }

    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Country not found");
            }
            return response.json();
        })
        .then(data => {
            const country = data[0];
            document.getElementById("country-info").innerHTML = `
                <h2>${country.name.common}</h2>
                <p><strong>Capital:</strong> ${country.capital}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <img class="flag" src="${country.flags.svg}" alt="Flag of ${country.name.common}">
            `;

            if (country.borders) {
                fetch(`https://restcountries.com/v3.1/alpha?codes=${country.borders.join(",")}`)
                    .then(response => response.json())
                    .then(borderCountries => {
                        document.getElementById("bordering-countries").innerHTML = `<h3>Bordering Countries:</h3>` +
                            borderCountries.map(border => `
                                <p><strong>${border.name.common}:</strong> <img class="flag" src="${border.flags.svg}" alt="Flag of ${border.name.common}"></p>
                            `).join("");
                    });
            } else {
                document.getElementById("bordering-countries").innerHTML = "<p>No bordering countries.</p>";
            }
        })
        .catch(error => {
            document.getElementById("country-info").innerHTML = `<p style="color: red;">${error.message}</p>`;
            document.getElementById("bordering-countries").innerHTML = "";
        });
});
