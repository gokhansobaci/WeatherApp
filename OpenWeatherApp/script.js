const keyApi = '842a5b0170566b727f06296cfb2ee330';
const api = 'https://api.openweathermap.org/data/2.5/';

// Api ye bağlanmamız için aşağıdaki sorguyu yazdım. 
const setQuery = (e) => {
    if (e.keyCode == '13') {
        getResult(searchBar.value)
    }
}
const setSearch = () => {
    getResult(searchBar.value)
}

const getResult = (cityName) => {
    let query = `${api}weather?q=${cityName}&appid=${keyApi}&units=metric&lang=tr`;

    fetch(query)
        .then(response => {
            return response.json();
        })

        .then(getSonuc => {
            console.log(getSonuc);
            document.getElementById('picture_id').innerHTML = `<img src="https://openweathermap.org/img/wn/${getSonuc.weather[0].icon}@2x.png" class="selam" alt="iconResim">`

            // Durum metninin ilk harfini buyuk yapmak istedim.
            const makeBig = (metin) => {
                return metin.charAt(0).toUpperCase() + metin.slice(1);;
            }

            const hizCevir = (gelen) => {
                let i = gelen * 1.6
                return i.toFixed(2)
            }

            document.getElementById('city_id').innerText = `${getSonuc.name} , ${getSonuc.sys.country} `
            document.getElementById('temp_id').innerText = `${Math.round(getSonuc.main.temp)} °C`
            document.getElementById('state_id').innerText = makeBig(getSonuc.weather[0].description)
            const hiz = Math.round(getSonuc.wind.speed)
            document.getElementById('wind_id').innerText = `Rüzgar hızı : ${hizCevir(hiz)} km`


        })

        .catch(err => console.log(err))
}
const searchBar = document.getElementById('input_id');
searchBar.addEventListener('keypress', setQuery);

const searchIcon = document.getElementById('btn_id');
searchIcon.addEventListener('click', setSearch);


getResult('istanbul')




