

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
  const works = await getWorks()

  works.forEach(work => {
  
    //creer les new elements dans le html
    const elementsWork = document.createElement ('figure') // elementWork
    const title = document.createElement ('figcaption') // titre 
    const imageUrl = document.createElement ('img') // img
    //recuperer les src des elements crees //
    imageUrl.src = work.imageUrl // img //
    imageUrl.textContent = work.title // legende img //
    title.textContent = work.title // titre //
    //ajouter l'img et le titre au idWork //
    elementsWork.appendChild(imageUrl)
    elementsWork.appendChild(title)
    //ajouter elementsWork a la gallery //
    gallery.appendChild(elementsWork)
    });
  console.log(works); }

displayWorks();


// function pour fetch API categories
async function getCategories () {

const categoriesURL = 'http://localhost:5678/api/categories'
const response = await fetch(categoriesURL)
return await response.json()
}


//function async pour afficher les categories
async function displayCategories () {
  const categories = await getCategories()
  console.log(categories)


}
displayCategories()


