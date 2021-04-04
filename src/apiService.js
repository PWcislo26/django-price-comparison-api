export class API {
    static login(body) {
        return fetch(`http://127.0.0.1:8000/api/user/token/`,{
            method : 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static register(body){
        return fetch('http://127.0.0.1:8000/api/user/register/', {
            method : 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static products(){
        return fetch(`http://127.0.0.1:8000/api/products/`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((data)=> data.json())
    }

    static detailedProduct(pk){
        return fetch(`http://127.0.0.1:8000/api/products/${pk}/`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
        
        }).then(resp => resp.json())
    }
}