class Ingredients {

    async getIngredients(token) {
        return fetch(`http://127.0.0.1:3000/ingredients`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        
        }).then((res) => res.json()
        
        ).catch(err => console.log(err));
    }
};

export default new Ingredients();