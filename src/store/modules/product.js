import {productService} from "../../service/productService";

export const namespaced = true;

export const state = {
    products: [],
    generes: []
};

export const mutations = {
    SET_PRODUCTS(state, payload) {
        state.products = payload
    },
    SET_GENERES(state, payload) {
        state.generes = payload
    }
};

export const getters = {
    getProducts(state) {
        return state.products
    },
    getGeneres(state) {
        return state.generes
    }
}

export const actions = {
    async fetchAllProducts({commit}) {
        try {
            const {data} = await productService().getAllProducts()
            commit('SET_PRODUCTS', data.data)
        } catch (e) {
            console.log(e)
        }
    },
    async fetchAllGeneres({commit}) {
        try {
            const {data} = await productService().getAllGeneres()
            commit('SET_GENERES', data.data)
        } catch (e) {
            console.log(e)
        }
    },
};
