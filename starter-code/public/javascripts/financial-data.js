const ajaxBitcoinRequest = () => {
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
        .then((bitcoinData) => {
            let data = bitcoinData.data.bpi;
            drawChart(Object.values(data),Object.keys(data));

            // renderHTMLIronhack(new CountryData(countryData.data[0].name, countryData.data[0].callingCodes[0]))
        })
}
const bitcoinDataClickHandler = () => {
    return ajaxBitcoinRequest();
}


document.getElementById('btn-bitcoin').onclick = bitcoinDataClickHandler


drawChart = (bitcoins,bitDates) => {
    // Chart
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: bitDates,
            datasets: [{
                label: 'BitCoin Price Index',
                data: bitcoins,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                fill: false,
                tension: 0,
                pointHoverRadius: 3,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        min: 750
                    }
                }]
            }
        }
    });
}