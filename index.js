const API_URL = "https://restcountries.com/v3.1/all"
const API_URL_NAME = "https://restcountries.com/v3.1/name"
function init() {

    document.querySelector("#allButton").addEventListener("click", async () => {
        try {
            const result = await getCountriesByName();
            console.log(result)
            drawTotalResult(result.length)
            drawPopulationStats(result)
            drawCountriesPopulationTable(result)
            drawRegionStats(result)
            drawCoinsStats(result)
        } catch (error) {
            console.log(error)
            alert("Something went Wrong!")
        }
    })

    document.querySelector("#searchButton").addEventListener("click", async () => {
        try {
            const cName = document.querySelector("#searchInput").value
            const result = await getCountriesByName(cName);
            console.log(result)
            drawTotalResult(result.length)
            drawPopulationStats(result)
            drawCountriesPopulationTable(result)
            drawRegionStats(result)
            drawCoinsStats(result)
        } catch (error) {
            console.log(error)
            alert("Something went Wrong!")
        }
    })


}

function drawCoinsStats(countries) {
    if (!Array.isArray(countries)) return;
    let allCurrencies = [];
    countries.forEach(c => {
        if (c.currencies) {
            allCurrencies.push(...Object.values(c.currencies))
        }
    })
    const countriesCurrencies = allCurrencies.reduce((ccObj, currency) => {
        if (ccObj[currency.name]) {
            ccObj[currency.name]++
        } else {
            ccObj[currency.name] = 1
        }
        return ccObj
    }, {})

    console.log(countriesCurrencies)
}

function drawRegionStats(countries) {
    document.querySelector("#regionCountry").innerHTML = "";
    if (!Array.isArray(countries)) return;
    const regionCountry = countries.reduce((regionCountryObject, currentCountry) => {
        if (!currentCountry?.region) return regionCountryObject;
        if (regionCountryObject[currentCountry.region]) {
            regionCountryObject[currentCountry.region]++;
        } else {
            regionCountryObject[currentCountry.region] = 1;
        }
        return regionCountryObject;
    }, {})

    const res = Object.entries(regionCountry).map(([region, numberOfCountries]) => {
        const tr = document.createElement("tr")
        const tdRegion = document.createElement("td")
        const tdNum = document.createElement("td")
        tdRegion.innerText = region
        tdNum.innerText = numberOfCountries
        tr.append(tdRegion, tdNum)
        return tr;
    })
    document.querySelector("#regionCountry").append(...res)
}

function drawPopulationStats(countries) {
    if (!Array.isArray(countries)) return;
    const total = countries.reduce((totalPopulation, currentCountry) => {
        if (!currentCountry?.population) return totalPopulation;
        return totalPopulation + Number(currentCountry?.population)
    }, 0)
    document.querySelector("#totalPopulation").innerText = total;
    document.querySelector("#averagePopulation").innerText = (total / countries.length).toFixed(2);

}
function drawCountriesPopulationTable(countries) {
    document.querySelector("#countriesPopulation").innerHTML = ""
    if (!Array.isArray(countries)) return;
    const trCountriesPopulation = countries.map(_createCountryPopulationRow)
    function _createCountryPopulationRow(c) {
        const tr = document.createElement("tr")
        const tdName = document.createElement("td")
        const tdPopulation = document.createElement("td")
        tdName.innerText = c?.name?.common;
        tdPopulation.innerText = c.population;
        tr.append(tdName, tdPopulation)
        return tr;
    }
    document.querySelector("#countriesPopulation").append(...trCountriesPopulation)
}
function drawTotalResult(n) {
    document.querySelector("#totalResult").innerText = n;
}
async function getCountriesByName(name) {
    const result = await fetch(name ? API_URL_NAME + "/" + name : API_URL)
    const countries = await result.json();
    return countries;
}

init()