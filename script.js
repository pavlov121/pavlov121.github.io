// window.document.querySelector("h1").style.color = "red";

// let modal = document.querySelector("#modal");
// document.querySelector("#btn").addEventListener("click", function(){
//     modal.style.display = "block";
// })
// document.querySelector(".close").addEventListener("click", function(){
//     modal.style.display = "none";
// })
// window.addEventListener("click", function(event){
//     if(event.target == modal){
//         modal.style.display = "none";
//     }
// })

// let box = document.querySelector(".box");
// console.log(box.getBoundingClientRect().top); //Высота 
// console.log(box.getBoundingClientRect().width); //Ширина обьекта 





//ДЗ !
//Цвет сделан двумя способами: Через массив цветов! и Через rgb (Оба метода через датчик случайных чисел ) 





let start = document.querySelector("#start");
let game = document.querySelector("#game");
let time = document.querySelector("#time");
let timeHeader = document.querySelector("#time-header");
let resultheader = document.querySelector("#result-header");
let score = 0;
let result = document.querySelector("#result")
let isGameStarted = false;
let gameTime = document.querySelector("#game-time");
// let mass = ['red', 'yellow', 'blue', 'gray'] // (массив цветов) метод второй 

start.addEventListener("click", startgame)
game.addEventListener("click", habdleBox)
gameTime.addEventListener("input", setGameTime)

function setGameTime(){
    let tm = +gameTime.value;
    time.textContent = tm.toFixed(1);
    timeHeader.classList.remove("hide");
    resultheader.classList.add("hide")
}

function getRendom(min, max){
    return Math.floor(Math.random() * (max-min) + min);
}

function habdleBox(event){
    if(!isGameStarted){
        return;
    }
    if(event.target.dataset.box){
        score++;
        renderBox()}
}


function startgame(){
    score = 0;
    setGameTime();
    gameTime.setAttribute('disabled', 'true');
    timeHeader.classList.remove('hide');
    resultheader.classList.add('hide');
    isGameStarted = true;
    console.log("start")
    start.classList.add("hide");
    game.style.background = "#FFF";


    let interval = setInterval(function(){
        let t = time.textContent;  //получаем доступ к егго содержимому(5.0)
        if(t <= 0){
            clearInterval(interval);
            endGame();
        }
        else{
            time.textContent = (t - 0.1).toFixed(1); //После точки один символ
        }

    },100)

    

    renderBox()
}

function endGame(){
    isGameStarted = false;
    start.classList.remove("hide");
    game.innerHTML = ""; //Пустое поле
    game.style.background = " rgb(155, 232, 251)";
    timeHeader.classList.add("hide");
    resultheader.classList.remove("hide");
    result.textContent = score;
    gameTime.removeAttribute("disabled");
}

function renderBox(){
    game.innerHTML = "";// Чтобы поле очищалось
    let box = document.createElement("div") // Добавляем на игровое поле 
    let boxSize = getRendom(30, 100);
    let gameSize = game.getBoundingClientRect();
    // let color = getRendom(0,3)//ДЗ (метод второй)
    let color2 = getRendom(0,250); //ДЗ2 (метод первый)
    let color3 = getRendom(0,250); //ДЗ2 (метод первый)
    let color4 = getRendom(0,250); //ДЗ2 (метод первый)
    box.style.background = ` rgb(${color2},${color3},${color4})`;
    let maxTop = gameSize.height - boxSize;
    let maxLeft = gameSize.width - boxSize;
    box.style.width = box.style.height = boxSize + "px";
    // box.style.background = mass[color]; (метод второй)
    box.style.position = "absolute";
    box.style.top = getRendom(0,maxTop) + "px";
    box.style.left = getRendom(0, maxLeft) + "px";

    box.style.cursor = "pointer";
    box.setAttribute("data-box", "true") //Установить пользоват атрибут
    game.insertAdjacentElement("afterbegin", box);
}

