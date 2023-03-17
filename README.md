# Challenge-Stack-API-Vuejs

## Groupe
```bash
Louise Bertin -- Front-end
Quentin Hiribarne Pionnier -- API
```

## API

### Installation

```bash
- Depuis le dossier API
- npm install
```

### Lancement

```bash
- Depuis le dossier API
- npm start. L'API est lancée sur le port 3000
```

### Routes

#### Recipe

```bash
POST /recipe - Créer une recette
GET /recipe/:id - Récupérer une recette par son id
DELETE /recipe/:id - Supprimer une recette par son id
PUT /recipe/:id - Modifier une recette par son id
POST /recipe/analyse/ - Analyse la valeur nutritionnelle (total des calories) en fonction des ingrédients d'une recette recupérée depuis le body de la requête
```

#### Recipes

```bash
GET /recipes - Récupérer toutes les recettes avec leurs total de calories
```

#### Ingredient

```bash
POST /ingredient - Créer un ingrédient
GET /ingredient/:id - Récupérer un ingrédient par son id
DELETE /ingredient/:id - Supprimer un ingrédient par son id
PUT /ingredient/:id - Modifier un ingrédient par son id
```

#### Ingredients

```bash
GET /ingredients - Récupérer tous les ingrédients
```

#### Token

```bash
GET /token/generate - Générer un token
GET /token/verify/:token - Vérifier un token
```

### Tests de l'API

```bash
- Dans le dossier tests, recuperer le fichier postman.json
- Importer le fichier dans postman
- Générer un token
- Tester les routes en utilisant le token généré dans le header de la requête (Bearer Token)
```

#### Données de test

```bash
- Dans le dossier tests/data, recuperer le fichier recipes.json et ingredients.json
- Remplacer les fichiers recipes.json et ingredients.json le dossier data par ceux récupérés
    - Le fichier recipes.json contient une recette avec les 3 ingrédients present dans le fichier ingredients.json. Le total des calories de la recette est de 601
    - Le fichier ingredients.json contient 3 ingrédients
```
