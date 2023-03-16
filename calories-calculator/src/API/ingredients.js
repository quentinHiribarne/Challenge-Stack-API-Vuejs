class Ingredients {

    async getIngredients(token) {
        return fetch(`http://127.0.0.1:3000/ingredients`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        
        }).then((res) => {
            if (res.status == 401) {
                location.assign('/login');
            } else {
               return res.json(); 
            }
        
        }).catch(err => {
            console.log(err);
        })
    };

    async getIngredient(id, token) {
        return fetch(`http://127.0.0.1:3000/ingredient/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        
        }).then((res) => {
            if (res.status == 401) {
                location.assign('/login');
            } else {
               return res.json(); 
            }
        
        }).catch(err => console.log(err));
    };

    async createIngredient(ingredient, token) {
        return fetch(`http://127.0.0.1:3000/ingredient`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(ingredient)
        
        }).then((res) => {
            if (res.status == 401) {
                location.assign('/login');
            } else {
               return res.json(); 
            }
        
        }).catch(err => console.log(err));
    };

    async updateIngredient(ingredient, token) {
        return fetch(`http://127.0.0.1:3000/ingredient/${ingredient.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(ingredient)
        
        }).then((res) => {
            if (res.status == 401) {
                location.assign('/login');
            } else {
                return res.json();
            }
        
        }).catch(err => console.log(err));
    };

    async deleteIngredient(id, token) {
        return fetch(`http://127.0.0.1:3000/ingredient/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        
        }).then((res) => {
            if (res.status == 401) {
                location.assign('/login');
            } else {
               return res.json(); 
            }
        
        }).catch(err => console.log(err));
    };
};

export default new Ingredients();