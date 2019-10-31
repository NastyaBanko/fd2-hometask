function WheatherWidget() {
    let self = this;
    self.create = function () {
        let body = document.getElementById('kappa'),
            div = document.createElement('div'),
            threeDays = document.createElement('div'),
            firstDay = document.createElement('button'),
            thirdDay = document.createElement('button'),
            name = document.createElement('div'),
            inf = document.createElement('div'),
            location = document.createElement('div'),
            nameWeather = document.createElement('div'),
            close = document.createElement('button');

        let forAll = document.createElement('div'),
            //для первой
            name1 = document.createElement('div'),
            inf1 = document.createElement('div'),
            location1 = document.createElement('div'),
            nameWeather1 = document.createElement('div'),
            //для второй даты
            name2 = document.createElement('div'),
            inf2 = document.createElement('div'),
            location2 = document.createElement('div'),
            nameWeather2 = document.createElement('div'),
            //для третьей
            name3 = document.createElement('div'),
            inf3 = document.createElement('div'),
            location3 = document.createElement('div'),
            nameWeather3 = document.createElement('div');

        forAll.style.cssText = 'display:none;';

        div.setAttribute('id', 'mainBlock');
        threeDays.setAttribute('id', 'threeDays');
        firstDay.setAttribute('id', 'firstDay');
        thirdDay.setAttribute('id', 'thirdDay');
        name.setAttribute('id', 'words');
        location.setAttribute('id', 'location');
        nameWeather.setAttribute('id', 'nameWeather');
        close.setAttribute('id', 'close');
        inf.setAttribute('id', 'inf');
        forAll.setAttribute('id', 'forAll');

        inf.classList.add('infBorder');
        div.classList.add("animated", 'delay-1s', 'fadeInLeft', 'slow');
        firstDay.classList.add('colorClick', 'forDays');
        thirdDay.classList.add('forDays');

        firstDay.innerText = 'На сегодня';
        thirdDay.innerText = 'На три дня';
        close.textContent = 'Закрыть';

        name1.setAttribute('id', 'words1');
        inf1.setAttribute('id', 'inf1');
        location1.setAttribute('id', 'location1');
        nameWeather1.setAttribute('id', 'nameWeather1');
        inf1.classList.add('infBorder');
        name2.setAttribute('id', 'words2');
        inf2.setAttribute('id', 'inf2');
        location2.setAttribute('id', 'location2');
        nameWeather2.setAttribute('id', 'nameWeather2');
        inf2.classList.add('infBorder');
        name3.setAttribute('id', 'words3');
        inf3.setAttribute('id', 'inf3');
        location3.setAttribute('id', 'location3');
        nameWeather3.setAttribute('id', 'nameWeather3');
        inf3.classList.add('infBorder');

        body.appendChild(div);
        div.appendChild(threeDays);
        threeDays.appendChild(firstDay);
        threeDays.appendChild(thirdDay);
        div.appendChild(name);
        div.appendChild(inf);
        inf.appendChild(location);
        inf.appendChild(nameWeather);

        div.appendChild(forAll);
        forAll.appendChild(name1);
        forAll.appendChild(inf1);
        inf1.appendChild(location1);
        inf1.appendChild(nameWeather1);
        forAll.appendChild(name2);
        forAll.appendChild(inf2);
        inf2.appendChild(location2);
        inf2.appendChild(nameWeather2);
        forAll.appendChild(name3);
        forAll.appendChild(inf3);
        inf3.appendChild(location3);
        inf3.appendChild(nameWeather3);

        div.appendChild(close);

        close.addEventListener('click', function () {
            div.style.display = 'none';
        });
    };
    self.cityID = 625144;
    self.apiUrl = "https://api.openweathermap.org/data/2.5/";
    self.apiKey = "0a7db113032710f1a62e411e2fbc7372";
    self.apiQuery = self.apiUrl + "/weather?id=" + self.cityID + "&units=metric&lang=ru&appid=" + self.apiKey;
    self.apiQueryForecast = self.apiUrl + "/forecast?id=" + self.cityID + "&units=metric&lang=ru&appid=" + self.apiKey;
    self.one = false;
    self.three = false;

    self.weatherForOneDay = function () {
        fetch(self.apiQuery, {method: 'get'})
            .then(response => response.json())
            .then(function (data) {
                self.one = true;
                let name = document.getElementById('words');
                let inf = document.getElementById('inf');
                let locTemp = document.getElementById('location');
                let weatherName = document.getElementById('nameWeather');
                let firstDay = document.getElementById('firstDay');
                let thirdDay = document.getElementById('thirdDay');
                let forAll = document.getElementById('forAll');

                function forToday() {
                    if (data.name === 'Minsk') name.innerHTML = 'Погода в Минске: ';
                    locTemp.innerHTML = '<img id="img" src="https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png">' + data.main.temp + '&#8451;';
                    weatherName.innerHTML = '<b>' + data.weather[0].description + ' | ' + 'ветер ' + data.wind.speed + ' м/с </b>';
                    document.getElementById('img').style.cssText = 'margin-bottom:-15px; margin-left:-10px;';
                }

                firstDay.addEventListener('click', function () {
                    if(!self.one){
                        inf.innerHTML = 'Загрузка...';
                        console.log('hi');
                    }
                    firstDay.classList.add('colorClick');
                    thirdDay.classList.remove('colorClick');
                    forToday();
                    forAll.style.cssText = 'display:none';
                    name.style.cssText = 'display:block';
                    inf.style.cssText = 'display:block; margin:0 auto;';
                });

                if (firstDay.classList.contains('colorClick')) forToday();
            })
            .catch(error => console.log('Причина ошибки: ' + error));
    };

    self.weatherForThreeDays = function () {
        fetch(self.apiQueryForecast, {method: 'get'})
            .then(response => response.json())
            .then(function (data) {
                self.three = true;
                let div = document.getElementById('mainBlock'),
                    forAll = document.getElementById('forAll'),
                    name = document.getElementById('words'),
                    inf = document.getElementById('inf'),
                    name1 = document.getElementById('words1'),
                    inf1 = document.getElementById('inf1'),
                    locTemp1 = document.getElementById('location1'),
                    weatherName1 = document.getElementById('nameWeather1'),
                    firstDay = document.getElementById('firstDay'),
                    thirdDay = document.getElementById('thirdDay'),
                    name2 = document.getElementById('words2'),
                    locTemp2 = document.getElementById('location2'),
                    weatherName2 = document.getElementById('nameWeather2'),
                    name3 = document.getElementById('words3'),
                    locTemp3 = document.getElementById('location3'),
                    weatherName3 = document.getElementById('nameWeather3');

                let phrase1 = data.list[0].dt_txt,
                    dayA1 = phrase1.slice(0, -9).split('-'),
                    phrase2 = data.list[7].dt_txt,
                    dayA2 = phrase2.slice(0, -9).split('-'),
                    phrase3 = data.list[15].dt_txt,
                    dayA3 = phrase3.slice(0, -9).split('-');

                thirdDay.addEventListener('click', function () {
                    if(!self.three){
                       forAll.innerHTML = 'Загрузка...';
                    }
                    thirdDay.classList.add('colorClick');
                    firstDay.classList.remove('colorClick');

                    name.style.cssText = 'display:none';
                    inf.style.cssText = 'display:none';
                    forAll.style.cssText = 'display:block; margin: 0 auto;';
                    //для сегодня
                    name1.innerHTML = 'Погода в Минске: ' + '<br>' + '<b>' + dayA1[2] + '. ' + dayA1[1] + '. ' + dayA1[0] + '</b>';
                    locTemp1.innerHTML = '<img src="https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '@2x.png">'
                        + data.list[0].main.temp + '&#8451;';
                    weatherName1.innerHTML = '<b>' + data.list[0].weather[0].description + ' | ' + 'ветер ' + data.list[0].wind.speed + ' м/с </b>';
                    inf1.style.cssText = 'margin:0 auto;';
                    //для завтра
                    name2.innerHTML = '<b>' + dayA2[2] + '. ' + dayA2[1] + '. ' + dayA2[0] + '</b>';
                    locTemp2.innerHTML = '<img src="https://openweathermap.org/img/wn/' + data.list[7].weather[0].icon + '@2x.png">'
                        + data.list[7].main.temp + '&#8451;';
                    weatherName2.innerHTML = '<b>' + data.list[7].weather[0].description + ' | ' + 'ветер ' + data.list[7].wind.speed + ' м/с </b>';
                    //для послезавтра
                    name3.innerHTML = '<b>' + dayA3[2] + '. ' + dayA3[1] + '. ' + dayA3[0] + '</b>';
                    locTemp3.innerHTML = '<img src="https://openweathermap.org/img/wn/' + data.list[7].weather[0].icon + '@2x.png">'
                        + data.list[15].main.temp + '&#8451;';
                    weatherName3.innerHTML = '<b>' + data.list[15].weather[0].description + ' | ' + 'ветер ' + data.list[15].wind.speed + ' м/с </b>';

                    let image = document.getElementsByTagName('img');
                    for (let i = 0; i < image.length; i++) image[i].classList.add('forImage');
                    locTemp1.classList.add('smallerLocation');
                    weatherName1.classList.add('forNameWeather');
                    locTemp2.classList.add('smallerLocation');
                    weatherName2.classList.add('forNameWeather');
                    locTemp3.classList.add('smallerLocation');
                    weatherName3.classList.add('forNameWeather');
                });
            })
            .catch(error => console.log('Причина ошибки: ' + error));
    };

    self.update = function () {
        setTimeout(function updateWeather() {
            self.weatherForOneDay();
            self.weatherForThreeDays();
            setTimeout(updateWeather, 5000);
        }, 0);
    };

    self.getWeather = function () {
        self.weatherForOneDay();
        self.weatherForThreeDays();
        self.create();
        self.update();
    };
}