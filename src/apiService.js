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

    static addToWatchlist(pk, token){
        return fetch(`http://127.0.0.1:8000/api/products/${pk}/add_to_watchlist/`,{
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json',
                'Accept' : 'application/json',
                'Authorization': `Token ${token}`

            }
        })
    }

    static getWatchlist(token){
        return fetch(`http://127.0.0.1:8000/api/watchlist/`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Accept' : 'application/json',
                'Authorization': `Token ${token}`

            }
        }).then(resp => resp.json())
    }

    static searchProducts(product){
        return fetch(`http://127.0.0.1:8000/api/search/custom/?search=${product}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
    }
}