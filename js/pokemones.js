//DOMContentLoader (disparado cuando el documento htm esta completamente cargado)
document.addEventListener ("DOMContentLoaded", () => {
    const random = getRandomInt(1, 20)//lanzará una de las 20 card random en html
    fetchData(random)
  })
  
  const getRandomInt = (min, max) => {
    return Math.floor (Math.random() * (max - min)) + min;
  }
  
  const fetchData = async (id) => {
    try {
        const res = await fetch (`https://pokeapi.co/api/v2/pokemon/${id}`) //cremillas invertidas permiten mezclar con javascript, en este caso el id
        const data =await res.json()
        console.log(data)//para consultar en consola
       //crear objeto 
       //en consola se busca la ruta de la imagen, el nombre, la vida o hp
        const pokemon = {
          img: data.sprites.other.dream_world.front_default,
          nombre: data.name,
          hp: data.stats [0].base_stat,
          experiencia: data.base_experience,
  
        }
        pintarCard (pokemon)
    } catch (error) {
        console.error(error)
  
    }
  }
  const pintarCard = (pokemon) => {
    console.log(pokemon)
  
    const flex = document.querySelector('.flex')
    const template = document.querySelector('#template-card').content
    const clone = template.cloneNode (true)
    const fragment = document.createDocumentFragment()
  
  //cambiar imagen para que cambie con cada card
    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img) //Element.setAttribute (name, value); 
    clone.querySelector ('.card-body-title').innerHTML = `${pokemon.nombre} <span>${pokemon.hp} HP </span>`
    clone.querySelector('.card-body-text').textContent = pokemon.experiencia + ' Exp'
    //pasa el clone al fragment
    fragment.appendChild(clone)
    flex.appendChild(fragment)
  
  
  }