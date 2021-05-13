import axios from '../plugins/axios'

export function productService() {

    const searchProduct = async (search) => {
        try {
            return await axios.get(`http://sadkam.lincast.ir/api/products/search/${search}`)
        } catch (e) {
            console.log(e)
        }
    }

    const getAllProducts = async () => {
        try {
            return await axios.get('http://sadkam.lincast.ir/api/products')
        } catch (e) {
            console.log(e)
        }
    }
    const getProduct = async (id) => {
        try {
            return await axios.get(`http://sadkam.lincast.ir/api/products/${id}`)
        } catch (e) {
            console.log(e)
        }
    }

    const createProduct = async (product) => {
        try {
            await axios.post('http://sadkam.lincast.ir/api/products', product)
        } catch (e) {
            console.log(e)
        }
    }

    const updateProduct = async (product) => {
        try {
            await axios.put('http://sadkam.lincast.ir/api/products', product)
        } catch (e) {
            console.log(e)
        }
    }

    const getAllGeneres = async () => {
        try {
            return await axios.get('http://sadkam.lincast.ir/api/products/related/generes')
        } catch (e) {
            console.log(e)
        }
    }

    const getAllTitleType = async () => {
        try {
            return await axios.get('http://sadkam.lincast.ir/api/products/related/types')
        } catch (e) {
            console.log(e)
        }
    }

    return {
        searchProduct,
        getAllProducts,
        getProduct,
        createProduct,
        updateProduct,
        getAllGeneres,
        getAllTitleType
    }
}
