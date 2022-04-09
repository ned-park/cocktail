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
 }
 
 function display() {
   console.log(cache)
   let drink = cache.drinks[current]
   document.querySelector('h2').innerText = drink.strDrink
   document.querySelector('h3').innerText = drink.strInstructions
   document.querySelector('img').src = drink.strDrinkThumb
   document.querySelector('img').alt = drink.strDrink
 
   let ingredients = []
   for (let i = 0; i < 20; i++) {
     let ingredientNum = `strIngredient${i}`
     let ingredient = drink[ingredientNum]
     if (ingredient === null) 
       break
     ingredients.push(ingredient)
   }
   console.log(ingredients)
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