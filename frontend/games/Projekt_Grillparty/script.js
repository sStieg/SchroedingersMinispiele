let grillImg = document.getElementById("grillImg");
let grillFlex = document.getElementById("grillFlex");
let ingList = document.getElementById("ingredientList");
let orderBox = document.getElementById("noteBlock");
let finishedList = document.getElementById("finishedFood");
let orders = document.getElementById("orders")
let tempBox = document.getElementById("tempBox");
let title = document.getElementById("title");
let grillArr = new Array(4);
let doneFoodArr = new Array();
let orderArr = new Array(3);
let isOpened = false;
let grillTemp = document.getElementById("temperature");
let allIngredients = ['Hühnchen', 'Rippchen', 'Maiskolben', 'Zucchini', 'Schweinekotlett', 'Ofenkartoffel', 'Käsekrainer', 'Baguette'];
let timeLine = document.getElementById("timeLine");
let nameInput = document.getElementById("nameInput");

let orderInterval = undefined;
let orderCheckInterval = undefined;
let isGameOver = false;

let totalPoints = 0;
let userName = '';

function startGame() {
    if(nameInput.value.length > 0 && nameInput.value.length <= 10){
        userName = nameInput.value;
        document.getElementById("maskottchen").style.left = "-40%";
        document.getElementById("grillstart").style.right = "-50%";
        title.style.width = "35vw";
        title.style.top = "5vh";
        title.style.left = "6vw";
        title.style.fontSize = "400%";
        document.getElementById("startbutton").style.top = "100%";
        orderInterval = setInterval(getOrder, 5000);
        setTimeout(function(){document.getElementById("startscreen").remove()}, 200);
        orderCheckInterval = setInterval(checkOrders, 1000);
        setTimeout(function(){
            timeLine.style.animation = "time 120s linear";
            document.getElementById("grill").style.left = "5vw";
        }, 1000)
        setTimeout(endGame, 121000);
    }
    else{
        if(nameInput.value.length === 0){
            document.getElementById("error").innerHTML = '<h3>Du musst zuerst einen Namen eingeben!</h3>';
        } else if(nameInput.value.length > 10){
            document.getElementById("error").innerHTML = '<h3>Dein Name darf nicht länger als 10 Zeichen sein!</h3>';
        }
    }
}

function openGrill(button) {
    if (!isOpened) {
        grillImg.src = './Hintergrund/Grill_offen.png';
        button.innerHTML = 'Klicke um zu schließen';
        button.style.right = '50%';
        button.style.top = '5%';
        grillFlex.style.opacity = "1";
        ingList.style.left = "65vw";
        tempBox.style.top = "45%";
        orderBox.style.bottom = "43vh";
        finishedList.style.bottom = "1vh";
        finishedList.style.left = "1vw";
        isOpened = true;
    }
    else {
        grillImg.src = './Hintergrund/Grill_geschlossen.png';
        button.innerHTML = 'Klicke um zu öffnen';
        button.style.right = '8%';
        button.style.top = '15%';
        grillFlex.style.opacity = "0";
        ingList.style.left = "100vw";
        tempBox.style.top = "100%";
        orderBox.style.bottom = "100vh";
        finishedList.style.bottom = "-10vh";
        finishedList.style.left = "-80vw";
        isOpened = false;
    }
}
function addToGrill(ingredient, temperature, time) {
    for (let i = 0; i < grillArr.length; i++) {
        if (grillArr[i] == null) {
            let id = `${i}${ingredient}`;
            document.getElementById(`${i}`).innerHTML += `<img id="${id}" class="food" src="./Ingredients/${ingredient}_raw.png" onclick="takeOffGrill(this.id)">`;
            let food = {
                name: ingredient,
                id: id,
                status: "raw",
                rawCount: 0,
                grilledCount: 0,
                burnedCount: 0,
                temp: temperature,
                timer: time,
                amount: 1,
            };
            grillArr[i] = food;
            startCooking(food);
            return;
        }
    }
}
function startCooking(food) {
    document.getElementById(food.id.charAt(0)).innerHTML += `<h3 class="timer">${food.timer}</h3>`;
    let timer = setInterval(function(){checkFood(food, timer)}, 1000);
}
function checkFood(food, timer){
    if(!isGameOver){
        if((food.timer-1) > 0){
            food.timer--;
            document.getElementById(food.id.charAt(0)).getElementsByClassName("timer")[0].innerHTML = food.timer;
            if(grillTemp.value <= food.temp+20 && grillTemp.value >= food.temp-20){
                food.grilledCount++;
            } else if(grillTemp.value > food.temp){
                food.burnedCount++;
            } else if(grillTemp.value < food.temp){
                food.rawCount++;
            }
        }
        else{
            clearInterval(timer);
            document.getElementById(food.id.charAt(0)).getElementsByClassName("timer")[0].remove();
            if(food.grilledCount > food.rawCount && food.grilledCount > food.burnedCount){
                food.status = 'grilled';
            } else if(food.burnedCount > food.rawCount && food.burnedCount > food.grilledCount){
                food.status = 'burned';
            }
            document.getElementById(food.id.charAt(0)).innerHTML = `<img id="${food.id}" class="food" src="./Ingredients/${food.name}_${food.status}.png" onclick="takeOffGrill(this.id)">`;
        }
    }  
}
function takeOffGrill(id){
    let food = undefined;
    for(let i = 0; i < grillArr.length; i++){
        if(grillArr[i] != null && grillArr[i].id === id){
            food = grillArr[i];
            grillArr[i] = null;
            document.getElementById(id).remove();
        }
    }
    for(let i = 0; i < doneFoodArr.length; i++){
        if(doneFoodArr[i] !== null && doneFoodArr[i].name === food.name){
            if(doneFoodArr[i].status === food.status){
                doneFoodArr[i].amount++;
                document.getElementById(`${doneFoodArr[i].status}-${doneFoodArr[i].name}`).getElementsByTagName("h3")[0].innerHTML = `${doneFoodArr[i].amount}x`;
                return;
            }
        }
    }
    let isAdded = false;
    for(let i = 0; i < doneFoodArr.length && !isAdded; i++){
        if(doneFoodArr[i] == null){
            doneFoodArr[i] = food;
            isAdded = true;
        }
    }
    if(!isAdded){
        doneFoodArr.push(food);
    }
    
    finishedList.innerHTML += `<div id="${food.status}-${food.name}"><img src="./Ingredients/${food.name}_${food.status}.png"><h3>${food.amount}x</h3></div>`;
}

function getOrder(){
    if(!isGameOver){
        for(let i = 0; i < orderArr.length; i++){
            if(orderArr[i] == null){
                let ingredients = [];
                let totalAmount = 0;
                while(ingredients.length == 0){
                    for(let j = 0; j < allIngredients.length; j++){
                        if(Math.random()*3 <= 1){
                            let amount = Math.floor(Math.random()*2+1);
                            totalAmount += amount;
                            ingredients.push({amount: amount, ingredient: allIngredients[j]});
                        }
                    }
                }
                let time = 0;
                if(totalAmount <= 4){
                    time = 25;
                } else if(totalAmount <= 8){
                    time = 50;
                } else if(totalAmount > 8){
                    time = 60;
                }

                let order = {
                    name: `order${i}`,
                    ingredients: ingredients,
                    isReady: false,
                    time: time,
                }
                orderArr[i] = order;
                printOrder(orderArr[i]);
                return;
            }
        } 
    }
}

function printOrder(order){
    if(!isGameOver){ 
        let ingredientString = '';
        for(let i = 0; i < order.ingredients.length; i++){
            ingredientString += `${order.ingredients[i].amount}x ${order.ingredients[i].ingredient} `;
        }
        orders.innerHTML += `<div id="${order.name}" class="order"><p>${ingredientString}</p><h3 class="timer">${order.time}</h3></div>`;
        let  timer = setInterval(function(){checkOrderTimer(order, timer)}, 1000);
        order.timer = timer;
    }
}

function checkOrderTimer(order, timer){
    if(!isGameOver){
        if(order.time === 0){
            clearInterval(timer);
            order.time--;
            document.getElementById(`${order.name}`).getElementsByClassName("timer")[0].remove();
            document.getElementById(`${order.name}`).innerHTML = `<h3>FAILED!</h3>`;
            
            setTimeout(function(){
                if(!isGameOver){
                    document.getElementById(`${order.name}`).remove();
                    for(let i = 0; i < orderArr.length; i++){
                        if(orderArr[i] !== null && orderArr[i].name === order.name){
                            orderArr[i] = null;
                        }
                    }
                    if(totalPoints - 2 < 0){
                        totalPoints = 0;
                    }
                    else{
                       totalPoints -= 2; 
                    }
                    
                }
            }, 1000);
        }
        else if(order.time > 0){
            order.time--;
            document.getElementById(`${order.name}`).getElementsByClassName("timer")[0].innerHTML = `${order.time}`;
        }
    }
}

function checkOrders(){
    for(let i = 0; i < orderArr.length; i++){
        let isOrderReady = true;
        if(orderArr[i] != null && !orderArr[i].isReady){
            for(let j = 0; j < orderArr[i].ingredients.length && isOrderReady; j++){
                let amount = 0;
                for(let k = 0; k < doneFoodArr.length; k++){
                    if(doneFoodArr[k] !== null && doneFoodArr[k].name === orderArr[i].ingredients[j].ingredient){
                        amount += doneFoodArr[k].amount;
                    }
                }
                if(amount < orderArr[i].ingredients[j].amount){
                    isOrderReady = false;
                }
            }
            if(isOrderReady){
                document.getElementById(`${orderArr[i].name}`).innerHTML += '<div class="greenTick" onclick="giveOutOrder(this.parentNode)"><img src="./order_ready.png"></div>';
                orderArr[i].isReady = true;
            }
        }
    }
}

function giveOutOrder(parentBox){
    let order = undefined;
    for(let i = 0; i < orderArr.length; i++){
        if(orderArr[i] !== null && orderArr[i].name === parentBox.id){
            order = orderArr[i];
            parentBox.remove();
            clearInterval(orderArr[i].timer);
            orderArr[i] = null;
        }
        if(orderArr[i] !==null){
            orderArr[i].isReady = false;
        }
    }

    for(let i = 0; i < document.getElementsByClassName("greenTick").length; i++){
        document.getElementsByClassName("greenTick")[i].remove();
    }
    
    for(let i = 0; i < order.ingredients.length; i++){
        for(let j = 0; j < doneFoodArr.length && order.ingredients[i].amount !== 0; j++){
            if(doneFoodArr[j] !== null && doneFoodArr[j].name === order.ingredients[i].ingredient){
                while(doneFoodArr[j].amount > 0 && order.ingredients[i].amount > 0){
                    doneFoodArr[j].amount--;
                    order.ingredients[i].amount--;

                    switch(doneFoodArr[j].status){
                        case 'grilled':
                            totalPoints += 3;
                            break;
                        case 'burned':
                        case 'raw':
                            totalPoints += 1;
                            break;
                    }
                    console.log(totalPoints, doneFoodArr[j].name, doneFoodArr[j].status);
                }
                if(doneFoodArr[j].amount === 0){
                    document.getElementById(`${doneFoodArr[j].status}-${doneFoodArr[j].name}`).remove();
                    doneFoodArr[j] = null;
                }
                else{
                    document.getElementById(`${doneFoodArr[j].status}-${doneFoodArr[j].name}`).getElementsByTagName("h3")[0].innerHTML = `${doneFoodArr[j].amount}x`;
                }
            }
        }
    }
}

function saveInLeaderboard() {
    let hasChanged = false;
    let arr = [userName, totalPoints];
    for(let i = 0; i < localStorage.length; i++){
        let temp = JSON.parse(localStorage[i]);
        if(userName == temp[0]){
            temp[1] = arr[1];
            localStorage[i] = JSON.stringify(temp);
            hasChanged = true;
        }
    }
    if(!hasChanged){
        localStorage[localStorage.length] = JSON.stringify(arr);
    }
    for(let i = 0; i < localStorage.length; i++){
        for(let j = 0; j < localStorage.length-1; j++){
            let arr1 = JSON.parse(localStorage[j]);
            let arr2 = JSON.parse(localStorage[j+1]);
            if(arr1[1] < arr2[1]){
                localStorage[j] = JSON.stringify(arr2);
                localStorage[j+1] = JSON.stringify(arr1);
            }
        }
    }
}

function writeLeaderboard(){
    for(let i = 0; i < localStorage.length; i++){
        if(i == 0){
            highscores.innerHTML = '<h2>Highscores</h2>';
            highscores.innerHTML += '<h3>Name:</h3> <h3>Punkte:</h3>';
        }
        let temp = JSON.parse(localStorage[i]);
        highscores.innerHTML += `<p>${temp[0]}</p>`;
        highscores.innerHTML += `<p>${temp[1]}</p>`;
    }
}

function endGame() {
    saveInLeaderboard();
    isGameOver = true;
    timeLine.style.animationPlayState = "paused";
    document.getElementById("grill").style.left = "-50%";
    orderBox.style.bottom = "100vh";
    finishedList.style.bottom = "-11vh";
    ingList.style.left = "100vw";
    clearInterval(orderInterval);
    clearInterval(orderCheckInterval);
    setTimeout(function(){
        document.getElementsByTagName("body")[0].innerHTML = `<div id="startscreen"><div id="endText"><div id="startbutton" style="top: 0; left: 0; position: static;" onclick="location.reload()"><h1 style="font-size: 400%;">NEUES SPIEL!</h1></div><h1 id="title" style="width: 40vw; top: 0; left: 0;">Game Over! <p style='font-size: 18px; margin: 10px;'>Das war so lecker ${userName}! Ich habe schon wieder Hunger...Machst du mir was?</p></h1></div></div>`;
        document.getElementById("endText").innerHTML += `<h3 style="font-size: 150%;">Gesamte Punke: ${totalPoints}</h4>`;
        document.getElementById("startscreen").innerHTML += `<div id="highscores"></div>`;
        writeLeaderboard();
    }, 300);
}