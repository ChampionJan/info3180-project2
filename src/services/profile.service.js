import store from '../store/store'
export default{
    async getUser(id){
        let res = await fetch(`/api/v1/users/${id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${ store.getters.getAuth || localStorage.getItem('authToken')}`,
            }
        })

        return res.status === 200 ? res.json() : null
    },
    async addPost(id, payload, csrf){
        console.log(id)
        let res = await fetch(`/api/v1/users/${id}/posts`, {
            method: "POST",
            body: payload,
            headers: {
                'Authorization': `Bearer ${ store.getters.getAuth || localStorage.getItem('authToken')}`,
                'X-CSRFToken': csrf
            }
        })

        return res.json()
    },
    async getPosts(id){
        let res = await fetch(`/api/v1/users/${id}/posts`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${ store.getters.getAuth || localStorage.getItem('authToken')}`,
            }
        })

        return res.status === 200 ? res.json() : null
    },
    async addFollow(id, csrf){
        let res = await fetch(`/api/users/${id}/follow`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ store.getters.getAuth || localStorage.getItem('authToken')}`,
                'X-CSRFToken': csrf
            }
        })

        return res.json()
    },
}