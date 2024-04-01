

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
  
selectGallery.addEventListener('click', (event) => { 
 

})
}


// afficher categories 
const displayCategories = (categoriesData) => {

  const filtersUl = document.createElement('ul')
  filtersUl.classList.add('categories')

  filters.appendChild(filtersUl)

  createFilters(categoriesData, filtersUl)

}
  

//creer les filtres
const createFilters = (categoriesData, filtreUl) => {

  const all = document.createElement('li')
  all.textContent = 'Tous'
  all.classList.add('filters')
  filtreUl.appendChild(all)

  categoriesData.forEach(category => {

  const filterLi = document.createElement('li')
  filterLi.textContent = category.name 
  filterLi.classList.add('filters')

  filtreUl.appendChild(filterLi)

  })
  
}






//appeler les fonctions
const worksData = await getWorks()
console.log(worksData)

const categoriesData = await getCategories()
console.log(categoriesData)

displayWorks(worksData)
displayCategories(categoriesData)

