let cookie = document.querySelector("#cookie");
let display = document.querySelector("#output");
let multiBtn = document.querySelector("#multi");
let multiDisp = document.querySelector("#mult");
let priceDisp = document.querySelector("#price");
let autoClick = document.querySelector("#autoclick");
let bonus = document.querySelector("#bonus");
let decompte = document.querySelector("#decompte");

let score = 0;
let multiplier = 1;
let price = 50;
let flag;
let autoSwitch = false;
let bonusSwitch = false;
let bonusMult = 1;


let featuresprice = {
    multi: 50,
    autoclick: 500,
    bonus: 20,
}

let scoreInc = () => {
    // autoClicker(); in Case of auto switch
    score += (multiplier * bonusMult);
    console.log(score);
    display.innerHTML = score;
    if (score >= featuresprice.multi) {
        multiBtn.className = "enabled";
    } else { multiBtn.className = "disabled"; }
    if (score >= featuresprice.autoclick) {
        autoClick.className = "enabled";
    } else {
        autoClick.className = "disabled";
    }
    if (score >= featuresprice.bonus && bonusSwitch == false) {
        bonus.className = "enabled";
    } else {
        bonus.className = "disabled";
    }
}

// Se met en marche dès qu'on dépasse 200 points

// function autoClicker() {
//     if (autoSwitch == false && score < 200 && score + multiplier >= 200) {
//         window.setInterval(function() { scoreInc() }, 1000);
//         console.log('test timer');
//         autoSwitch = true;
//     }
// }

function bonusF() {
    if (bonusSwitch == false && score >= featuresprice.bonus) {
        bonusMult = 2;
        bonusSwitch = true;
        bonus.className = "disabled";

        let timeleft = 30;
        let downloadTimer = setInterval(function() {
            decompte.textContent = --timeleft;
            bonus.className = "disabled";
            decompte.style.color = "white";

            if (timeleft <= 0)
                clearInterval(downloadTimer);
        }, 1000);

        setTimeout(function() {
            bonusSwitch = false;
            bonusMult = 1;
            bonus.className = "enabled";
        }, 30000);

        mult.textContent = `X ${multiplier}`;
        priceDisp.textContent = `${featuresprice.bonus}`;
        console.log(multiplier);
        console.log(featuresprice.bonus);

    } else if (bonusSwitch == true && score >= featuresprice.bonus) {
        alert(`already running`);
    }

}

function autoClicker() {
    if (autoSwitch == false && score >= featuresprice.autoclick) {
        window.setInterval(function() { scoreInc() }, 1000);
        console.log('test timer');
        autoSwitch = true;
        autoClick.style.display = "none";
    }
}

let increaseMultiplier = () => {
    if (multiplier < 6 && score >= featuresprice.multi) {
        score = score - featuresprice.multi;
        display.textContent = score;
        multiplier += 1;
        mult.textContent = `X ${multiplier}`;
        priceDisp.textContent = `${featuresprice.multi}`;
        console.log(multiplier);
        console.log(featuresprice.multi);


    } else if (multiplier >= 6 && score >= featuresprice.multi) {
        score = score - featuresprice.multi;
        featuresprice.multi = featuresprice.multi * 2;
        display.textContent = score;
        multiplier += 1;
        multiDisp.textContent = `X ${multiplier}`;
        priceDisp.textContent = `${featuresprice.multi}`;
        console.log(multiplier);
        console.log(featuresprice.multi);

    } else {
        alert(`not enough money`);
        console.log(multiplier);
        console.log(price);
    }
}


// Buying a lot of multipliers is too easy.
// After buying six multipliers you'll figure out why the price should increase with each multiplier bought.
// For example, the first should be worth 50, the next 100, 200, and so on...
// Make it simple, you don't need a lot of conditions. Find a good way to raise the price !






cookie.addEventListener("click", scoreInc);

multiBtn.addEventListener("click", increaseMultiplier);

autoClick.addEventListener("click", autoClicker);

bonus.addEventListener("click", bonusF);