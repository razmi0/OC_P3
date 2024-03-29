

const worksURL = 'http://localhost:5678/api/works'
const categoriesURL = 'http://localhost:5678/api/categories'
const selectGallery = document.querySelector('#gallery')
const filters = document.getElementById('filtersSection')



const getWorks  = async ()  => {
  const response = await fetch(worksURL)
  return await response.json()
}


const getCategories  = async ()  => {
  const response = await fetch(categoriesURL)
  return await response.json()
}


// afficher wokrs
const displayWorks = () => {

selectGallery.innerHTML = ''

worksData.forEach(work => {
  
    const elementsWork = document.createElement ('figure') 
    const caption = document.createElement ('figcaption') 
    const img = document.createElement ('img')

    img.src = work.imageUrl
    img.textContent = work.title
    caption.textContent = work.title
    elementsWork.setAttribute('data-work-id', work.id);

    elementsWork.appendChild(img)
    elementsWork.appendChild(caption)
    selectGallery.appendChild(elementsWork)
  });

  }
  


// au click ...
const click = (works, categories) => {
  
selectGallery.addEventListener('click', () => {

if (categories.id !== works.id ) {
works.style.display = 'none'

} else {
// 

}
})

}


// afficher categories 
const displayCategories = () => {

  const filtreUl = document.createElement('ul')
  filters.appendChild(filtreUl)

  filtreUl.appendChild(createFilters()) //fonctionne pas 

}
  


//creer les filtres
const createFilters = () => {

  const all = document.createElement('Tous')
  all = displayWorks() 

  categoriesData.forEach(category => {

  const filterLi = document.createElement('li')
  filterLi.textContent = category.name 
  })
  
}






//appeler les fonctions
const worksData = await getWorks()
console.log(worksData)

const categoriesData = await getCategories()
console.log(categoriesData)

displayWorks(worksData)
displayCategories(categoriesData)
