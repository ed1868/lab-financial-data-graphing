const ajaxBitcoinRequest = () => {
    const bitCoinInfo = axios.create({
        baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json',
    });

    bitCoinInfo.get()
        .then((bitcoinData) => {
            let data = bitcoinData.data.bpi;
            drawChart(Object.values(data), Object.keys(data));
            paintValues(Object.values(data));;
        })
        .catch(error => {
            console.log(error);
        });

}
const bitcoinDataClickHandler = () => {
    return ajaxBitcoinRequest();
}


document.getElementById('btn-bitcoin').onclick = bitcoinDataClickHandler


drawChart = (bitcoins, bitDates) => {
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

getDatesData = () => {
    let dateFrom = document.querySelector('#date-from').value;
    let dateTo = document.querySelector('#date-to').value;
    return [dateFrom, dateTo]
}

getCurrentData = () => {
    return currency = document.querySelector('#currency-selector').value;
}

paintValues = (arr) => {
    document.querySelector('#max').innerHTML = Math.max(...arr);
    document.querySelector('#min').innerHTML = Math.min(...arr);
}



document.getElementById('date-to').onchange = () => {
    let arr = getDatesData();
    let dateFrom = arr[0];
    let dateTo = arr[1];

    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}`)
        .then((bitcoinData) => {
            let data = bitcoinData.data.bpi;
            drawChart(Object.values(data), Object.keys(data));
            paintValues(Object.values(data));;
        })
        .catch(error => {
            console.log(error);
        });
}

document.getElementById('currency-selector').onchange = () => {
    let curr = getCurrentData();
    let arr = getDatesData();
    let dateFrom = arr[0];
    let dateTo = arr[1];
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}&currency=${curr}`)
        .then((bitcoinData) => {
            let data = bitcoinData.data.bpi;
            drawChart(Object.values(data), Object.keys(data));
            paintValues(Object.values(data));;
        })
        .catch(error => {
            console.log(error);
        });
}