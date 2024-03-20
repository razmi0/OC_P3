const worksURL = 'http://localhost:5678/api/works'

//recuperer les travaux avec la fonction fetch 
fetch(worksURL)

//traiter la reponse de l'api pour pouvoir utiliser les donnees reçues, 
.then (response => {

if (!response.ok) {
  throw new error ('erreur')
}

return response.json ()
})

.then (data => {
  console.log(data, 'cest ok!')

 const gallery = document.querySelector('#gallery');

 gallery.innerHTML = '';

 const dataWorks = data 

//ajouter les travaux au html
dataWorks.forEach(work => {
  
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


// recuperer les categories //
const categoriesURL = 'http://localhost:5678/api/categories'

fetch(categoriesURL)

.then (response => {
if (!response.ok) {
  throw new error ('erreur')
}
return response.json ()
})

.then (data => {
  console.log(data, 'cest ok!')

 const dataCategories = data

 const tous = new Set()
 tous.add(dataWorks)
 tous.forEach

  console.log(tous)


















  }) 


.catch(error => {
  console.log('erreur')
})


})

