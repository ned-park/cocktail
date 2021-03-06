//The user will enter a cocktail. Get a cocktail name, photo, and instructions
//and place them in the DOM

document.querySelector('#submit').addEventListener('click', getCocktail)
document.querySelector('#right').addEventListener('click', () => cycle(1))
document.querySelector('#left').addEventListener('click', () => cycle(-1))

let current = 0
let cache
const timeouts = []

function cycle(direction) {
  let max = cache.drinks.length
  current = (current + direction) % max
  current = current < 0 ? current + max : current

  //only one timeout running at a time
  for (let i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i]);
  }
  timeouts.push(setTimeout(() => cycle(direction), 3000))
  display()
}

function display() {
  let drink = cache.drinks[current]
  document.querySelector('img').src = drink.strDrinkThumb
  document.querySelector('img').alt = drink.strDrink
  document.querySelectorAll('.hidden').forEach(e => e.classList.toggle('hidden'))
  document.querySelector('#name').innerText = drink.strDrink
  document.querySelector('#instructions').innerText = drink.strInstructions


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
      cache = data
      running = false
      display()
    })
    .catch(err => {
      console.log(err)
    })
}