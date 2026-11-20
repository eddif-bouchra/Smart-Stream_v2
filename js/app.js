
import { afficheChaine  } from "./ui.js";
import { initRecherche } from "./search.js";
import { afficheCountrys } from "./ui.js";
import { updateChannel , deleteChannel } from "./api.js";
//import { getChannels, createChannel } from "./api.js";
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");
const channelsList = document.getElementById("channelsList");
const toutes = document.getElementById("btnAll");
const favorise = document.getElementById("btnFavoris")
export async function getChannels() {
    const response = await fetch("https://6af34a76d2377d6c3704d720.mockapi.io/channals");

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    console.log(data);
    return data;
    
}


async function init() {
    try {
         loading.classList.remove("hidden");
         loading.classList.add("flex");
        const chaines = await getChannels();
        const filtrerChaines = initRecherche(chaines);
        
        /*const result = await createChannel({
    channelNumber: "2001",
    name: "Test Channel",
    category: "SPORT",
    logo: "https://placehold.co/60x60?text=Test",
    previewImage: "https://placehold.co/800x450?text=Test",
    isFavorite: false,
    isBlacklisted: false
});
console.log(result)*/
        /*const result = await updateChannel("1", {
    isFavorite: false
});

console.log(result);*/
        const countries = [...new Set(chaines.map((e) => e.country))];
        document.getElementById("nbrChaine").textContent = chaines.length;
        afficheChaine(chaines);
        channelsList.addEventListener("click",  async e => {
            const btn = e.target.closest("button");
            if(!btn) return;
            const id = btn.closest("[data-id]").dataset.id;
            const action = btn.dataset.action;
            if(action === "favorite"){
                const channel = chaines.find((c) => c.id === id);
                const newValue = !channel.isFavorite;
                try{
                    await updateChannel(id,{isFavorite:newValue});
                    channel.isFavorite = newValue;
                    filtrerChaines();
            }catch (error){
                console.log(error)
            }
            
            }
            if(action === "delete"){
                const confirmation = confirm("Supprimer cette chaine ?");
                if(confirmation ){
                    try{
                        await deleteChannel(id);
                        const i = chaines.findIndex((c) => c.id === id);
                        chaines.splice(i,1);
                        filtrerChaines();
                    }catch (error){
                        console.log(error);
                    }
                }
            }
        });
        favorise.addEventListener("click",() =>{
            const favoris = chaines.filter((chaine) => {
                return chaine.isFavorite === true;
            })
            afficheChaine(favoris);
        })
        toutes.addEventListener("click",() =>{
            afficheChaine(chaines)
        })
        

        afficheCountrys(countries);
        
    } catch (erreur) {
        

        errorMessage.classList.remove("hidden");
        errorMessage.textContent = "Impossible de charger les chaînes. Veuillez réessayer"
    }finally{
        loading.classList.remove("flex");
        loading.classList.add("hidden");
    }
}

init();



