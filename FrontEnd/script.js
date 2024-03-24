

async function getWorks () {

  const worksURL = 'http://localhost:5678/api/works'
  const response = await fetch(worksURL)
  return await response.json()
}

function displayWorks() {

const worksData = getWorks() 
console.log(worksData)
}

displayWorks(worksData)
  
function selectGallery (){

  const gallery = document.querySelector('#gallery');
  gallery.innerHTML = ''; 
}
selectGallery ()

function elementsHtml (){  
  
  works.forEach(work => {  
    //creer les new elements dans le html
    const elementsWork = document.createElement ('figure') // elementWork
    const title = document.createElement ('figcaption') // titre 
    const imageUrl = document.createElement ('img') // img 
  }
}

elementsHtml()

function getSrcElements(work){
    //recuperer les src des elements crees //
    imageUrl.src = work.imageUrl // img //
    imageUrl.textContent = work.title // legende img //
    title.textContent = work.title // titre //
}

function addSrcElement() {
    //ajouter l'img et le titre au idWork //
    elementsWork.appendChild(imageUrl)
    elementsWork.appendChild(title)
    //ajouter elementsWork a la gallery //
    gallery.appendChild(elementsWork)

    workID.push(work.id);

};

async function getCategories () {

const categoriesURL = 'http://localhost:5678/api/categories'
const response = await fetch(categoriesURL)
return await response.json()

}

function displayCategories () { 
  
  const categoriesData = getCategories()
  console.log(categoriesData)
  
}
displayCategories(categoriesData) 


function selectFiltersHtml (){

  const selectorFilter = document.getElementById('filtersSection');
  console.log(selectorFilter)
}
  
 
function createFiltersList () { 

    const createList = document.createElement('ul')
    console.log(createList)

    const listCategories = document.createElement("li")
    console.log(listCategories)
}

function addCategoriesToTheList () {

categoriesData.forEach(category => {

 listCategories.textContent = category.name 
 listCategories.setAttribute('data-category-id', category.id))
 console.log(category.id , "OKKKKK")
}

function listenerGallery () {

  const worksSelect = document.querySelectorAll('.gallery ')
  listCategories.addEventListener()
  console.log(worksSelect)
}
  
function ClickAndFilter () {

 listCategories = ('click' , () => { 

  worksSelect.forEach(element => { 

  if (worksData !== categoriesData ) 
  {
    element.style.display ='none';
  } else {
    element.style.display ='block'
  }
      })

      
    })

  createList.appendChild(listCategories)

}



selectorFilter.appendChild(createList())

  



  
