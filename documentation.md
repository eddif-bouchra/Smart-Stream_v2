# Documentation – Smart Stream TV

# 1. API REST et MockAPI

### Définition

Une API (Application Programming Interface) permet à une application de communiquer avec un autre service pour échanger des données.

Une API REST utilise des requêtes HTTP pour manipuler des ressources.

### Définition de MockAPI

MockAPI est un service qui permet de créer une fausse API afin de tester les opérations CRUD sans développer un véritable serveur.

### Exemple

```javascript
const API_URL = "https://example.com/channels";

fetch(API_URL)
    .then(response => response.json())
    .then(data => console.log(data));
```

### Application dans Smart Stream TV

MockAPI est utilisé pour stocker et gérer les chaînes télévisées. Chaque chaîne contient notamment :

- `id` : identifiant de la chaîne.
- `channelNumber` : numéro de la chaîne.
- `name` : nom de la chaîne.
- `category` : catégorie.
- `logo` : logo de la chaîne.
- `previewImage` : image de prévisualisation.
- `isFavorite` : indique si la chaîne est favorite.
- `isBlacklisted` : indique si la chaîne est blacklistée.

---

# 2. Fetch API en JavaScript

### Définition

Fetch API est une fonctionnalité JavaScript native qui permet d'effectuer des requêtes HTTP pour récupérer ou envoyer des données.

### Syntaxe

```javascript
fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });
```

### Les principales méthodes HTTP

- `GET` : récupérer des données.
- `POST` : créer une nouvelle ressource.
- `PUT` : remplacer ou mettre à jour une ressource.
- `PATCH` : modifier une partie d'une ressource.
- `DELETE` : supprimer une ressource.

### Application dans Smart Stream TV

Fetch est utilisé pour communiquer avec MockAPI et effectuer les opérations de récupération, création, modification et suppression des chaînes.

---

# 3. Les opérations CRUD

### Définition

CRUD représente les quatre opérations principales permettant de gérer les données d'une application.

| Opération | Méthode HTTP | Description |
|---|---|---|
| Create | POST | Créer une chaîne |
| Read | GET | Récupérer les chaînes |
| Update | PUT | Modifier une chaîne |
| Delete | DELETE | Supprimer une chaîne |

### Exemple GET

```javascript
async function getChannels() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération");
    }

    return await response.json();
}
```

### Exemple POST

```javascript
async function createChannel(channel) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(channel)
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la création");
    }

    return await response.json();
}
```

### Exemple PUT

```javascript
async function updateChannel(id, channel) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(channel)
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la modification");
    }

    return await response.json();
}
```

### Exemple DELETE

```javascript
async function deleteChannel(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
    }

    return true;
}
```

### Application dans Smart Stream TV

Les opérations CRUD permettent de gérer les chaînes depuis l'interface :

- Afficher les chaînes.
- Ajouter une nouvelle chaîne.
- Modifier le statut d'une chaîne favorite.
- Supprimer une chaîne.

---

# 4. JavaScript asynchrone : Promises et async/await

### Définition

Une opération asynchrone permet d'exécuter une tâche qui prend du temps sans bloquer l'exécution du reste du programme.

Une Promise représente le résultat futur d'une opération asynchrone.

### Les états d'une Promise

- `Pending` : opération en attente.
- `Fulfilled` : opération réussie.
- `Rejected` : opération échouée.

### Exemple avec then()

```javascript
fetch(API_URL)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
```

### Exemple avec async/await

```javascript
async function chargerChaines() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Erreur HTTP");
        }

        const chaines = await response.json();

        console.log(chaines);

    } catch (error) {
        console.log(error.message);
    }
}
```

### Explication

- `async` : déclare une fonction asynchrone.
- `await` : attend le résultat d'une Promise.
- `try` : contient le code à exécuter.
- `catch` : permet de gérer les erreurs.

### Application dans Smart Stream TV

Les fonctions asynchrones permettent d'attendre les réponses de MockAPI avant d'afficher, d'ajouter, de modifier ou de supprimer une chaîne.

---

# 5. Gestion des erreurs HTTP

### Définition

Une erreur HTTP indique qu'une requête n'a pas pu être traitée correctement ou que le serveur a rencontré un problème.

### Principaux codes HTTP

| Code | Signification |
|---|---|
| 200 | OK : requête réussie |
| 201 | Created : ressource créée |
| 204 | No Content : requête réussie sans contenu |
| 400 | Bad Request : requête incorrecte |
| 401 | Unauthorized : authentification nécessaire ou invalide |
| 403 | Forbidden : accès refusé |
| 404 | Not Found : ressource introuvable |
| 500 | Internal Server Error : erreur interne du serveur |

### Vérification avec Fetch

```javascript
fetch(API_URL)
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur HTTP : " + response.status);
        }

        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.log(error.message));
```

### Application dans Smart Stream TV

La gestion des erreurs permet d'informer l'utilisateur lorsqu'une requête échoue et d'éviter de traiter des données incorrectes.

---

# 6. Manipulation du DOM

### Définition

Le DOM (Document Object Model) représente la structure HTML d'une page sous forme d'objets que JavaScript peut manipuler.

Il permet de modifier le contenu, les attributs et les styles des éléments HTML.

### Méthodes principales

- `getElementById()` : récupérer un élément avec son identifiant.
- `querySelector()` : sélectionner le premier élément correspondant à un sélecteur CSS.
- `querySelectorAll()` : sélectionner plusieurs éléments.
- `createElement()` : créer un nouvel élément HTML.
- `appendChild()` : ajouter un élément comme enfant.
- `remove()` : supprimer un élément.
- `textContent` : modifier le texte d'un élément.
- `innerHTML` : modifier le contenu HTML.

### Exemple

```javascript
const titre = document.getElementById("title");

titre.textContent = "Smart Stream TV";
```

### Création d'un élément

```javascript
const nouvelleChaine = document.createElement("div");

nouvelleChaine.textContent = "Nouvelle chaîne";

document.body.appendChild(nouvelleChaine);
```

### Application dans Smart Stream TV

Le DOM permet d'afficher dynamiquement les chaînes récupérées depuis MockAPI et de mettre à jour l'interface après les actions de l'utilisateur.

---

# 7. Les événements JavaScript

### Définition

Un événement est une action réalisée par l'utilisateur ou déclenchée par le navigateur.

JavaScript permet de détecter ces actions avec `addEventListener()`.

### Événements principaux

- `click` : lorsqu'un utilisateur clique sur un élément.
- `submit` : lorsqu'un formulaire est envoyé.
- `input` : lorsque la valeur d'un champ change.
- `change` : lorsque la valeur d'un élément est modifiée.
- `DOMContentLoaded` : lorsque le document HTML est entièrement chargé et analysé.

### Exemple

```javascript
const bouton = document.getElementById("myButton");

bouton.addEventListener("click", function() {
    console.log("Bouton cliqué");
});
```

### Exemple avec un formulaire

```javascript
form.addEventListener("submit", function(e) {
    e.preventDefault();

    console.log("Formulaire envoyé");
});
```

### Application dans Smart Stream TV

Les événements permettent de gérer les clics sur les boutons, les favoris, la suppression des chaînes, la recherche et l'envoi du formulaire d'ajout.

---

# 8. Event Delegation en JavaScript

### Définition

L'Event Delegation est une technique qui consiste à placer un seul écouteur d'événement sur un élément parent pour gérer les événements de ses éléments enfants.

Elle utilise le mécanisme de propagation des événements (Event Bubbling).

### Exemple

```javascript
const channelsList = document.getElementById("channelsList");

channelsList.addEventListener("click", function(e) {

    if (e.target.classList.contains("delete-btn")) {
        console.log("Supprimer la chaîne");
    }

});
```

### Explication

1. L'utilisateur clique sur un bouton enfant.
2. L'événement remonte vers l'élément parent.
3. Le parent détecte l'événement.
4. `e.target` permet d'identifier l'élément qui a déclenché l'événement.

### Application dans Smart Stream TV

L'Event Delegation permet de gérer les actions sur les chaînes affichées dynamiquement avec un seul écouteur sur la liste des chaînes.

---

# 9. Les méthodes de tableaux en JavaScript

### Définition

JavaScript propose plusieurs méthodes permettant de parcourir, filtrer, transformer et rechercher des éléments dans un tableau.

### Méthode filter()

`filter()` retourne un nouveau tableau contenant uniquement les éléments qui respectent une condition.

```javascript
const chaines = [
    { name: "France 2", country: "France" },
    { name: "2M", country: "Maroc" },
    { name: "France 3", country: "France" }
];

const chainesFrance = chaines.filter(chaine => {
    return chaine.country === "France";
});

console.log(chainesFrance);
```

### Méthode find()

`find()` retourne le premier élément qui respecte une condition.

```javascript
const chaine = chaines.find(chaine => {
    return chaine.name === "France 2";
});
```

### Méthode map()

`map()` permet de transformer chaque élément d'un tableau et retourne un nouveau tableau.

```javascript
const noms = chaines.map(chaine => chaine.name);

console.log(noms);
```

### Méthode forEach()

`forEach()` permet de parcourir chaque élément d'un tableau sans retourner un nouveau tableau.

```javascript
chaines.forEach(chaine => {
    console.log(chaine.name);
});
```

### Application dans Smart Stream TV

Ces méthodes permettent de rechercher des chaînes, filtrer par pays, afficher les favoris et parcourir les données récupérées depuis l'API.

---

# 10. Les objets en JavaScript

### Définition

Un objet est une structure qui permet de regrouper plusieurs informations sous forme de propriétés et de valeurs.

### Exemple

```javascript
const chaine = {
    id: 1,
    channelNumber: 10,
    name: "France 2",
    country: "France",
    isFavorite: false,
    isBlacklisted: false
};
```

### Accéder aux propriétés

```javascript
console.log(chaine.name);

console.log(chaine["channelNumber"]);
```

### Modifier une propriété

```javascript
chaine.isFavorite = true;
```

### Ajouter une propriété

```javascript
chaine.category = "Information";
```

### Supprimer une propriété

```javascript
delete chaine.category;
```

### Application dans Smart Stream TV

Chaque chaîne est représentée par un objet contenant ses informations et son état (favori ou blacklistée).

---

# 11. Les formulaires en JavaScript

### Définition

Un formulaire HTML permet à l'utilisateur de saisir des informations et de les envoyer à l'application.

JavaScript permet de récupérer les valeurs, vérifier les champs et traiter les données.

### Récupérer une valeur

```javascript
const name = document.getElementById("channelName").value;
```

### Empêcher le rechargement de la page

```javascript
form.addEventListener("submit", function(e) {
    e.preventDefault();
});
```

### Validation simple

```javascript
if (name.trim() === "") {
    console.log("Le nom est obligatoire");
}
```

### Application dans Smart Stream TV

Le formulaire permet d'ajouter une nouvelle chaîne en saisissant son numéro et son nom. Les champs sont vérifiés avant l'envoi des données à MockAPI.

---

# 12. JSON et échanges de données

### Définition

JSON (JavaScript Object Notation) est un format léger utilisé pour représenter et échanger des données entre les applications et les serveurs.

### Exemple JSON

```json
{
    "channelNumber": 10,
    "name": "France 2",
    "isFavorite": false,
    "isBlacklisted": false
}
```

### Méthodes principales

- `JSON.stringify()` : transforme un objet JavaScript en chaîne JSON.
- `JSON.parse()` : transforme une chaîne JSON en objet JavaScript.

### Exemple

```javascript
const chaine = {
    name: "France 2",
    isFavorite: true
};

const chaineJSON = JSON.stringify(chaine);

const chaineObjet = JSON.parse(chaineJSON);
```

### Application dans Smart Stream TV

JSON est utilisé pour envoyer les informations des chaînes à MockAPI et convertir les réponses du serveur en objets JavaScript.

---

# 13. LocalStorage en JavaScript

### Définition

LocalStorage est un mécanisme de stockage du navigateur qui permet de conserver des données même après la fermeture du navigateur.

### Méthodes principales

- `setItem()` : enregistrer une donnée.
- `getItem()` : récupérer une donnée.
- `removeItem()` : supprimer une donnée.
- `clear()` : supprimer toutes les données.

### Exemple

```javascript
localStorage.setItem("filter", "favorites");

const savedFilter = localStorage.getItem("filter");

console.log(savedFilter);
```

### Stocker un objet

```javascript
const chaine = {
    name: "France 2",
    isFavorite: true
};

localStorage.setItem("chaine", JSON.stringify(chaine));
```

### Récupérer un objet

```javascript
const chaineStockee = JSON.parse(
    localStorage.getItem("chaine")
);
```

### Application dans Smart Stream TV

LocalStorage peut être utilisé pour mémoriser le filtre sélectionné par l'utilisateur et restaurer son choix après l'actualisation de la page.

---

# Conclusion

Smart Stream TV permet de mettre en pratique plusieurs notions fondamentales du développement web avec JavaScript :

- Communication avec une API REST.
- Utilisation de Fetch et des méthodes HTTP.
- Manipulation du DOM.
- Gestion des événements et Event Delegation.
- Manipulation des tableaux et des objets.
- Création et validation des formulaires.
- Gestion des opérations asynchrones.
- Stockage des préférences avec LocalStorage.

Ces notions permettent de développer une application web dynamique, interactive et organisée.