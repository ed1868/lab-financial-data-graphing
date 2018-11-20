const ajaxBitcoinRequest = () => {
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
        .then((bitcoinData) => {
            console.log(bitcoinData);
            // renderHTMLIronhack(new CountryData(countryData.data[0].name, countryData.data[0].callingCodes[0]))
        })
}
const bitcoinDataClickHandler =  ()=>{
    return ajaxBitcoinRequest();
}


document.getElementById('btn-bitcoin').onclick = bitcoinDataClickHandler