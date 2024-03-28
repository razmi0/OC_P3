
const worksURL = 'http://localhost:5678/api/works'
const categoriesURL = 'http://localhost:5678/api/categories'
const selectGallery = document.querySelector('#gallery')



const getWorks  = async ()  => {
  const response = await fetch(worksURL)
  return await response.json()
}


const getCategories  = async ()  => {
  const response = await fetch(categoriesURL)
  return await response.json()
}


// afficher wokrs
const displayWorks = (works) => {

  selectGallery.innerHTML = ''
  
    const elementsWork = document.createElement ('figure') 
    const caption = document.createElement ('figcaption') 
    const img = document.createElement ('img')

    img.src = works.imageUrl
    img.textContent = works.title
    caption.textContent = works.title
    elementsWork.setAttribute('data-work-id', id);

   
    elementsWork.appendChild(img)
    elementsWork.appendChild(caption)
    gallery.appendChild(elementsWork)

}

// au click ...
const click = (works, categories) => {
  
//evnt listener pour afficher les works

// au click si cat est dif de works  
//ne pas afficher les works 
//sinon 
//afficher works si = cat id === cat id (filtre)
}


// afficher categories et creer un elements (Ul) et leurs ajouter le filtre
const displayCategories = () => {

}

//creer les filtres 



//ecouter filtre et ajouter function filtre





//appeler les fonctions
const worksData = await getWorks()
console.log(worksData)
const categoriesData = await getCategories()
console.log(categoriesData)