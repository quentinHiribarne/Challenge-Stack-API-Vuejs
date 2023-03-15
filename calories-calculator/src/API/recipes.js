class Recipes {

    async getRecipes(token) {
        return fetch(`http://127.0.0.1:3000/recipes`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        
        }).then((res) => res.json()
        
        ).catch(err => console.log(err));
    };

    async updateRecipe(recipe) {
        return fetch(`http://127.0.0.1:3000/recipe/${recipe.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(recipe)
        
        }).then((res) => res.json()
        
        ).catch(err => console.log(err));
    };

    async createRecipe(recipe) {
        return fetch(`http://127.0.0.1:3000/recipe`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(recipe)
        
        }).then((res) => res.json()
        
        ).catch(err => console.log(err));
    };

    async deleteRecipe(id) {
        return fetch(`http://127.0.0.1:3000/recipe/${id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        
        }).then((res) => res.json()
        
        ).catch(err => console.log(err));
    };
};

export default new Recipes();