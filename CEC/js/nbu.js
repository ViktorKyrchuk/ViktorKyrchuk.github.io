const exchangeForm = document.getElementById('exchangeForm');
const currencySelect = document.getElementById('currency');
const selectedCurrency = document.getElementById('selectedCurrency');
const selectedCurrencyDisplay = document.getElementById('selectedCurrencyDisplay');
const dateFromInput = document.getElementById('dateFrom');
const dateToInput = document.getElementById('dateTo');
const apiUrl = 'https://bank.gov.ua/NBU_Exchange/exchange_site?';

let selectedDateFrom = formatDate(new Date(dateFromInput.value));
let selectedDateTo = formatDate(new Date(dateToInput.value));

let ratesData = []; // Array to store fetched rates data
const minValElement = document.getElementById('minVal');
const avgValElement = document.getElementById('avgVal');
const maxValElement = document.getElementById('maxVal');
let exchangeRateChart = null;

// https://bank.gov.ua/NBU_Exchange/exchange_site?start=20220115&end=20220131&valcode=usd&sort=exchangedate&json

const currencyOptions = [
    { value: 'USD', text: 'USD — Долар США', selected: true },
    { value: 'EUR', text: 'EUR — Євро' },
    { value: 'GBP', text: 'GBP — Фунт стерлінгів' },
    { value: 'JPY', text: 'JPY — Японська єна' },
    { value: 'CHF', text: 'CHF — Швейцарський франк' },
    { value: 'CAD', text: 'CAD — Канадський долар' },
    { value: 'AUD', text: 'AUD — Австралійський долар' },
];

// On page load, set default dates and populate currency options
window.addEventListener('load', function () {
    // Set default dates for the date inputs
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);
    dateFromInput.value = oneWeekAgo.toISOString().split('T')[0];
    dateToInput.value = today.toISOString().split('T')[0];

    selectedDateFrom = formatDate(new Date(dateFromInput.value));
    selectedDateTo = formatDate(new Date(dateToInput.value));

    // Populate the currency select dropdown with options
    populateCurrencyOptions();
    fetchRates(selectedDateFrom, selectedDateTo, currencySelect.value);
});


// Populate the currency select dropdown with options
function populateCurrencyOptions() {
    currencyOptions.forEach(optionData => {
        const option = document.createElement('option');
        option.value = optionData.value;
        option.textContent = optionData.text;
        if (optionData.selected) {
            option.selected = true;
        }
        currencySelect.appendChild(option);
    });
}

// Set up an event listener for the currency select dropdown
currencySelect.addEventListener('change', function () {
    const selectedCurrency = currencySelect.value;
    selectedCurrencyDisplay.textContent = selectedCurrency;
    // console.log(`Selected Currency: ${selectedCurrency}`);
});

//Date Beautify
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}
//Start date and end date inputs
dateFromInput.addEventListener('change', function () {
    selectedDateFrom = formatDate(new Date(dateFromInput.value));
    // console.log(`Selected Start Date: ${selectedDateFrom}`);
});

dateToInput.addEventListener('change', function () {
    selectedDateTo = formatDate(new Date(dateToInput.value));
    // console.log(`Selected End Date: ${selectedDateTo}`);
});

//AJAX request to the NBU exchange archive 
function fetchRates(startDate, endDate, currencyCode) {
    const url = `${apiUrl}start=${startDate}&end=${endDate}&valcode=${currencyCode}&sort=exchangedate&json`;
    console.log(`Fetching rates from URL: ${url}`);

    ratesData = [];

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Rates fetched successfully:', xhr.response);
            for (const rate of xhr.response) {
                ratesData.push({
                    date: rate.exchangedate,
                    rate: Number(rate.rate)
                });
            }
            console.log('Rates Data:', ratesData);
            renderExchangeRateChart(currencyCode);
            updateRateStatistics();
        } else {
            console.error('Failed to fetch rates:', xhr.status, xhr.statusText);
        }
    };
    xhr.send();
}

// Create the line chart or update it after a new API request
function renderExchangeRateChart(currencyCode) {
    const chartCanvas = document.getElementById('exchangeRateChart');

    if (!chartCanvas || ratesData.length === 0) {
        return;
    }

    const labels = ratesData.map(item => item.date);
    const rates = ratesData.map(item => item.rate);

    if (exchangeRateChart) {
        exchangeRateChart.destroy();
    }

    exchangeRateChart = new Chart(chartCanvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `${currencyCode} / UAH`,
                data: rates,
                borderColor: '#0d6efd',
                backgroundColor: 'rgba(13, 110, 253, 0.12)',
                borderWidth: 2,
                pointBackgroundColor: '#0d6efd',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true,
                tension: 0.25
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `Курс: ${context.parsed.y.toFixed(4)} UAH`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Дата'
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Курс, UAH'
                    },
                    ticks: {
                        callback: function (value) {
                            return Number(value).toFixed(2);
                        }
                    }
                }
            }
        }
    });
}

// Update statistics after the asynchronous API request has completed
function updateRateStatistics() {
    const rates = ratesData.map(item => item.rate);

    if (rates.length === 0) {
        minValElement.textContent = 'N/A';
        avgValElement.textContent = 'N/A';
        maxValElement.textContent = 'N/A';
        return;
    }

    const minRate = Math.min(...rates);
    const maxRate = Math.max(...rates);
    const avgRate = rates.reduce((sum, rate) => sum + rate, 0) / rates.length;

    minValElement.textContent = `${minRate.toFixed(2)} UAH`;
    avgValElement.textContent = `${avgRate.toFixed(2)} UAH`;
    maxValElement.textContent = `${maxRate.toFixed(2)} UAH`;
}

// Call the function to fetch currency options when form is submitted
exchangeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!currencySelect.value) {
        alert('Будь ласка, оберіть валюту.');
        return;
    }
    fetchRates(selectedDateFrom, selectedDateTo, currencySelect.value);
});
