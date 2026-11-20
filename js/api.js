
const API_URL = "https://6af34a76d2377d6c3704d720.mockapi.io/channals";
//stocker url dans une constante de api
/*
// GET : lire toutes les chaînes
export async function  getChannels(){
    //declaration de fct asynchrone pour recuperer la liste des chianes depuis api
    const response = await fetch(API_URL);
    //envoyer une requete HTTP a l API et attendre sa réponse
    if(!response.ok){
        //vérification de reponse 
        throw new Error(`Erreur ${response.status}`);
        //arrete de exucuyion et affiche une erreur si la requte a echeoue 
    }
    const data = await response.json();
    //convertir la reponse reçue au format JSON en données js
    return data;
}
export const createChannel = async(channel) => {
// declaration de fct asynchrone pour creé  une nouvelle chaines 
 const response = await fetch(API_URL,{
    method: 'POST',//methode de creation 
    headers:{"Content-Type": "application/json"},//information sur les info quant va envoyer
    body: JSON.stringify(channel)//transformation l'objet js en chaine json 
 })
    if(!response.ok){
        throw new Error('Erreur reseau');
    }
    return response.json();
}

export const updateChannel = async (id , changes) => {
    const response = await fetch(`${API_URL}/${id}` , {
        //pricise la chaine que va modifier
        method:'PUT',
        headers: {'Content-Type' : 'application/json; charset=UTF-8'},
        body : JSON.stringify(changes)
    })
    if(!response.ok){
        throw new Error("Failed to update channel");
    }
    return response.json();
    
}

export const deleteChannel = async(id) => {
    const response = await fetch(`${API_URL}/${id}`,{
       //pricise la chaine que va supprimer 
       method:'DELETE',
    })
    if(!response.ok){
        throw new Error ("Failed to delete channel ")
    }
    return response.json();
}

*/

// js/api.js


// GET : lire toutes les chaînes
export const getChannels = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error(`Erreur ${response.status}`);
  return response.json();
};

// POST : ajouter une chaîne
export const createChannel = async (channel) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(channel),
  });
  if (!response.ok) throw new Error(`Erreur ${response.status}`);
  return response.json();
};

// PUT : modifier une chaîne
export const updateChannel = async (id, changes) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changes),
  });
  if (!response.ok) throw new Error(`Erreur ${response.status}`);
  return response.json();
};

// DELETE : supprimer une chaîne
export const deleteChannel = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error(`Erreur ${response.status}`);
  return response.json();
};


//import { getChannels } from "./api.js";
//import { renderChannels } from "./ui.js";

const message = document.querySelector("#message");
let channels = [];

const loadChannels = async () => {
  try {
    message.textContent = "Chargement...";
    channels = await getChannels();
    message.textContent = "";
    renderChannels(channels);
  } catch (error) {
    // message.textContent = "Impossible de charger les chaînes.";
  console.error(error)
  }
};
loadChannels();
