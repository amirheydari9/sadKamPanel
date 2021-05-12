import axios from '../plugins/axios'

export function productService() {

    const getAllProducts = async () => {
        try {
            return await axios.get('http://sadkam.lincast.ir/products')
        } catch (e) {
            console.log(e)
        }
    }
    const getProduct = async (id) => {
        try {
            return await axios.get(`http://sadkam.lincast.ir/products/${id}`)
        } catch (e) {
            console.log(e)
        }
    }

    const createProduct = async (product) => {
        try {
            await axios.put('http://sadkam.lincast.ir/products', product)
        } catch (e) {
            console.log(e)
        }
    }

    const updateProduct = async (product) => {
        try {
            await axios.post('http://sadkam.lincast.ir/products', product)
        } catch (e) {
            console.log(e)
        }
    }

    const getAllGeneres = async () => {
        try {
            return await axios.get('http://sadkam.lincast.ir/products/related/generes')
        } catch (e) {
            console.log(e)
        }
    }

    return {
        getAllProducts,
        getProduct,
        createProduct,
        updateProduct,
        getAllGeneres
    }
}
