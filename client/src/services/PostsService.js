import Api from '@/services/api'

export default {
    fetchPosts(){
        return Api().get('posts')
    },
    addPost(params){
        return Api().post('posts', params)
    },
    getPost(params){
        return Api().get('posts/' + params.id)
    },
    updatePost(params) {
        return Api().put('posts/' + params.id, params)
    },
    deletePost(id){
        return Api().delete('posts/' + id)
        console.log(id)
    }
}