// KEYS

var appIdKey = "fb8bd818";
var key = "1ee8d0a3faf133a445302bde96c5b11a";

var button = document.querySelector('.search-button');
var searchField = document.querySelector('.keyword-input');
var section = document.querySelector('#recipes');
var count = document.querySelector('.recipe-count-number');

function onSearch () {

    section.innerHTML = '';
    count.innerHTML = '0';

    var healthy = document.getElementById('first-option').value;
    var diety = document.getElementById('second-option').value;

    var httpOne = "https://api.edamam.com/search?q=" + searchField.value + "&app_id=" +  appIdKey + "&app_key=" + key;

    var httpTwo = "https://api.edamam.com/search?q=" + searchField.value + "&app_id=" +  appIdKey + "&app_key=" + key + "&health=" + healthy + "&diet=" + diety;

    if(searchField.value && !healthy && !diety){
        getRecepie(httpOne)
    } else if(searchField.value && healthy && diety){
        getRecepie(httpTwo)
    }

    searchField.value && getRecepie(searchField.value, healthy, diety)

    searchField.value = '';
       
}

function getRecepie (req) {

   var request = new XMLHttpRequest ();

    request.open("GET", req);

    request.onload = function() {
        listRecipes(JSON.parse(request.responseText).hits);
        console.log(request)
        counter(JSON.parse(request.responseText).count);
    }

    request.send();

}

function counter (number) {
    count.innerHTML = number;
}

function listRecipes (meals) {
    
    meals.forEach(function(element){
        addRecipe(element);
    })
}

function addRecipe (data) {

    if(data) {

        var card = document.createElement('div');
        card.className = 'recipe-element';
        section.appendChild(card)
    
        var img = document.createElement('img');
        card.appendChild(img);
    
        var calo = document.createElement('div');
        calo.className = 'calories';
        card.appendChild(calo)
    
        var title = document.createElement('h3');
        card.appendChild(title)
        
        var labels = document.createElement('div');
        labels.className = 'labels';
        card.appendChild(labels);
    
        var health = data.recipe.healthLabels;
        var diets = data.recipe.dietLabels;

        img.setAttribute = 'src';
        img.src = data.recipe.image;

        title.innerHTML = data.recipe.label;
        calo.innerHTML = "cal" + "<br>" + data.recipe.calories.toFixed();
    } 

        health.forEach(function(element){
        var label = document.createElement('div');
        label.className = 'label';
        labels.appendChild(label);
        label.innerHTML=element;

    })

        diets.forEach(function(element){
        var label = document.createElement('div');
        label.className = 'label';
        labels.appendChild(label);
        label.innerHTML=element;

    })
 console.log(data)
}

button.addEventListener('click', onSearch);




