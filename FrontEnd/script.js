// declarer l'url de l'api
const worksAPI = 'http://localhost:5678/api/works'

//recuperer les travaux avec la fonction fetch 
fetch(worksAPI)



//traiter la reponse de l'api pour pouvoir utiliser les donnees reçues, 
.then (response => {

//verifier si cest ok / ("!"" negation)
//" si la reponse est fausse = afficher une erreur "
if (!response.ok) {
  throw new error ('erreur')
}
// si cest ok, retourner la reponse en JSON
return response.json ()
})



//traiter les data (afficher une reponse sur la console etc)
.then (data => {
  console.log(data, 'cest ok!')

 // selectionner la galerie dans le HTML
 const gallery = document.querySelector('#gallery');

 // supprimer le contenu precedent de la galerie 
 gallery.innerHTML = '';




//ajouter les travaux au html
data.forEach(work => {
  
//creer les new elements dans le html
const idWork = document.createElement ('figure') // idWork
const title = document.createElement ('figcaption') // titre 
const imageUrl = document.createElement ('img') // img


//recuperer les src des elements crees
imageUrl.src = work.imageUrl // img
imageUrl.textContent = work.title // legende img
title.textContent = work.title // titre


//ajouter l'img et le titre au idWork 
idWork.appendChild(imageUrl)
idWork.appendChild(title)

//ajouter idWork a la gallery

gallery.appendChild(idWork)
});

})

//afficher une eventuelle erreur dans la console 
.catch(error => {
  console.log('erreur')
})


