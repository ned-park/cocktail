//The user will enter a cocktail. Get a cocktail name, photo, and instructions
 //and place them in the DOM

 document.querySelector('#submit').addEventListener('click', getCocktail)
 document.querySelector('#right').addEventListener('click', () => cycle(1))
 document.querySelector('#left').addEventListener('click', () => cycle(-1))
 
 let current = 0
 let max = 0
 let cache
 
 function cycle(direction){
   current = (current + direction) % max
   current = current < 0? current + max : current
 
   display()
   //Make automatic carousel
   setTimeout(() => cycle(direction), 5000)
 }
 
 function display() {
   let drink = cache.drinks[current]
   document.querySelectorAll('.hidden').forEach(e => e.classList.toggle('hidden'))
   document.querySelector('#name').innerText = drink.strDrink
   document.querySelector('#instructions').innerText = drink.strInstructions
   document.querySelector('img').src = drink.strDrinkThumb
   document.querySelector('img').alt = drink.strDrink
 
   let ingredients = []
   for (let i = 1; i < 20; i++) {
     let ingredient = drink[`strIngredient${i}`]
     if (ingredient === null || ingredient === '') 
       break
     ingredients.push(ingredient)
   }
   document.querySelector('#ingredients').innerHTML = ingredients.reduce((str, i) => `${str}<li>${i}</li>`, '')
 }
 
 function getCocktail() {
   let name = document.querySelector('input').value
   fetch(`https:///www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
   .then(res => res.json())
   .then(data => {
     current = 0
     max = data.drinks.length
     cache = data
     display()
   })
   .catch(err => {
     console.log(err)
   })
 }