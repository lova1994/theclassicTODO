"Use strict";

// todo list av Lova Unger 2018
// variabler

var newToDoEl = document.getElementById("newtodo");
var newToDoButtonEl = document.getElementById("newtodobutton");
var messageEl = document.getElementById("message");
var toDoListEl = document.getElementById("todolist");
var i;
var clearButtonEl = document.getElementById("clearbutton");
var todo = document.getElementsByClassName("todo");

// Händelsehanterare;
newToDoEl.addEventListener("keyup", checkInput, false);
newToDoButtonEl.addEventListener("click", addItem, false);
window.onload = init;
clearButtonEl.addEventListener("click", clearStorage, false)


// Startfunktion
function init() {
    console.log("Initierar...");

    // Inaktivera lägg till-knappen
    newToDoButtonEl.disabled = true

    // läs in lista
    if (todo != null) {
        loadStorage();
    }
}

// Kontrollera input
function checkInput() {
    console.log("Kontrollerar input");

    var input = newToDoEl.value;

    // Kontroll om korrekt längd

    if (input.length > 4) {
        messageEl.innerHTML = "";
        newToDoButtonEl.disabled = false

    } else {
        messageEl.innerHTML = "Måste vara minst fem tecken!"
        newToDoButtonEl.disabled = true
    }
}


// Lägga till i lista
function addItem() {
    


    // Skapar nytt element
    var input = newToDoEl.value;

    var newEl = document.createElement("article");
    var newTextNode = document.createTextNode(input);

    newEl.appendChild(newTextNode);
    newEl.className = "todo";

    // Lägger till i listan
    toDoListEl.appendChild(newEl);

    // Lägg till en klickhanterare
    newEl.addEventListener("click", function (e) {
        e.target.remove();
        storeItem();
    });
    // Raderar input-fält
    newToDoEl.value = "";
    newToDoButtonEl.disabled = true

    // anropar lagring
    storeItem();
}


// Spara lista 
function storeItem() {
    console.log("Lagrar lista...");

    // Läs in i listan
    var todo = document.getElementsByClassName("todo");
    var tempArr = [];

    // Loopa genom listan och lagrar till temporär array
    for (i = 0; i < todo.length; i++) {
        tempArr.push(todo[i].innerHTML);
    }

    // Konverterar till JSON-sträng
    var jsonStr = JSON.stringify(tempArr);

    // Lagra i web storage
    localStorage.setItem("todo", jsonStr);
    console.log(tempArr);
}


// Läs in lista

function loadStorage() {
    console.log("Läser in lista...")

    // Läs in och konvertera från JSON till array
    var todo = JSON.parse(localStorage.getItem("todo"));
    
    // Loopa genom arrayen
    for (i = 0; i < todo.length; i++) {

        // Skapa nya element
        var newEl = document.createElement("article");
        var newTextNode = document.createTextNode(todo[i]);
        newEl.appendChild(newTextNode);
        newEl.className = "todo";

        // Lägger till i listan
        toDoListEl.appendChild(newEl);



        // Lägg till en klickhanterare
        newEl.addEventListener("click", function (e) {
            e.target.remove()
            console.log("Raderar")

            // Lagra listan på nytt
            storeItem();

        });
    }
}

// Clear storage och lista-funktion
function clearStorage() {
    console.log("Raderar")
    localStorage.clear();
    toDoListEl.innerHTML = ""

}


