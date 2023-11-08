const typeColor = {
  bug: '#26de81',
  dragon: '#ffeaa7',
  electric: '#fed330',
  fairy: '#ff0069',
  fighting: '#30336b',
  fire: '#f0932b',
  flying: '#81ecec',
  grass: '#00b894',
  ground: '#efb549',
  ghost: '#a55eea',
  ice: '#74b9ff',
  normal: '#95afc0',
  poison: '#6c5ce7',
  psychic: '#a29bfe',
  rock: '#2d3436',
  water: '#0190ff',
}

const url = 'https://pokeapi.co/api/v2/pokemon/'
const card = document.getElementById('card')
const btn = document.getElementById('btn')

let getPokeData = () => {
  // Random number between 1 and 150
  let id = Math.floor(Math.random() * 151)
  const finalUrl = url + id

  fetch(finalUrl)
    .then((response) => response.json())
    .then((json) => {
      generateCard(json)
    })
}

// Generate Card
let generateCard = (json) => {
  // Get necessary data and assign it to variables
  console.log(json)
  const hp = json.stats[0].base_stat
  const imgSrc = json.sprites.other.dream_world.front_default
  const pokeName = json.name
  const statAttack = json.stats[1].base_stat
  const statDefense = json.stats[2].base_stat
  const statSpeed = json.stats[3].base_stat

  // setThemeColor based on pokemon type
  const themeColor = typeColor[json.types[0].type.name]
  console.log(themeColor)

  card.innerHTML = `
            <p class="hp">
                <span>HP</span>
                ${hp}
            </p>
            <img src="${imgSrc}" alt="">
            <h2 class="poke-name">${pokeName}</h2>
            <div class="types">

            </div>
            <div class="stats">
                <div>
                    <h3>${statAttack}</h3>
                    <p>Attack</p>
                </div>
                <div>
                    <h3>${statDefense}</h3>
                    <p>Defense</p>
                </div>
                <div>
                    <h3>${statSpeed}</h3>
                    <p>Speed</p>
                </div>
            </div>`

  appendTypes(json.types)
  styleCard(themeColor)
}

let appendTypes = (types) => {
  console.log(types)
  types.forEach((item) => {
    let span = document.createElement('span')
    span.textContent = item.type.name
    console.log(span)

    document.querySelector('.types').appendChild(span)
  })
}

let styleCard = (color) => {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`
  card.querySelectorAll('.types span').forEach((typeColor) => {
    typeColor.style.backgroundColor = color
  })
}

btn.addEventListener('click', getPokeData)
window.addEventListener('load', getPokeData)
