
let workID = []

// fonction async recuperer API 
async function getWorks () {

  const worksURL = 'http://localhost:5678/api/works'
  const response = await fetch(worksURL)
  return await response.json()
}


// fonction async pour afficher les works 
async function displayWorks() {

  const gallery = document.querySelector('#gallery');
  gallery.innerHTML = '';
  const worksData = await getWorks()

  worksData.forEach(work => {  
    //creer les new elements dans le html
    const elementsWork = document.createElement ('figure') // elementWork
    const title = document.createElement ('figcaption') // titre 
    const imageUrl = document.createElement ('img') // img
  
    //recuperer les src des elements crees //
    imageUrl.src = work.imageUrl // img //
    imageUrl.textContent = work.title // legende img //
    title.textContent = work.title // titre //
  

    elementsWork.setAttribute('data-work-id', work.id);

    //ajouter l'img et le titre au idWork //
    elementsWork.appendChild(imageUrl)
    elementsWork.appendChild(title)
    //ajouter elementsWork a la gallery //
    gallery.appendChild(elementsWork)

    workID.push(work.id);
    });
  console.log(worksData); }

displayWorks();


// function pour fetch API categories
async function getCategories () {

const categoriesURL = 'http://localhost:5678/api/categories'
const response = await fetch(categoriesURL)
return await response.json()
}


//function async pour afficher les categories
async function displayCategories () { // fonction Afficher les Categories
  
  const categoriesData = await getCategories()
  console.log(categoriesData)

  const selectorFilter = document.getElementById('filtersSection');
  console.log(selectorFilter)
  
 
    function createList () { // fonction CREER LISTE UL
    const createList = document.createElement('ul')

    categoriesData.forEach(category => {
      
      const listCategories = document.createElement("li")
      console.log(listCategories)
      listCategories.textContent = category.name // setup text 
      listCategories.setAttribute('data-category-id', category.id);
      console.log(category.id , "OKKKKK")
      
      const worksSelect = document.querySelectorAll('.gallery ') //selectionner toute la gallery 
      
      listCategories.addEventListener('click', () => { // event listener

      
      const ID = workID // recuperer les ID du tableau, probleme => que les ID, pas les Works
      console.log(workID, "OK")

      worksSelect.forEach(element => { 

        if (ID !== category.id ) 
        {
          element.style.display ='none';
        } else {
          element.style.display ='block'
        }
      })

      
    })

  createList.appendChild(listCategories)

})

return createList
    }

selectorFilter.appendChild(createList())

  }

displayCategories()

  
