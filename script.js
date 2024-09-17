const apiKey = 'YOUR_API_KEY'; // Ganti dengan API key dari layanan konversi mata uang
const apiUrl = `https://api.exchangerate-api.com/v4/latest/USD`;

async function fetchCurrencies() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const currencies = Object.keys(data.rates);
    populateCurrencyOptions(currencies);
}

function populateCurrencyOptions(currencies) {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.textContent = currency;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = currency;
        option2.textContent = currency;
        toCurrency.appendChild(option2);
    });
}

async function convertCurrency() {
    const amount = document.getElementById('amountInput').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (amount === '' || fromCurrency === '' || toCurrency === '') {
        alert('Please fill in all fields');
        return;
    }

    const response = await fetch(`${apiUrl}?base=${fromCurrency}`);
    const data = await response.json();
    const rate = data.rates[toCurrency];
    const result = amount * rate;

    document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
}

fetchCurrencies();