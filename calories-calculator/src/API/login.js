class Login {
    async generateToken() {
        return fetch(`http://127.0.0.1:3000/token/generate`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        
        }).then((res) => res.json()
        
        ).catch(err => console.log(err));
    }
};

export default new Login();