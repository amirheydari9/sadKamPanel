import {productService} from "../../service/productService";

export const namespaced = true;

export const state = {
    products: [],
    generes: [],
    titleTypes:[]
};

export const mutations = {
    SET_PRODUCTS(state, payload) {
        state.products = payload
    },
    SET_GENERES(state, payload) {
        state.generes = payload
    },
    SET_TITLE_TYPES(state, payload) {
        state.titleTypes = payload
    }
};

export const getters = {
    getProducts(state) {
        return state.products
    },
    getGeneres(state) {
        return state.generes
    },
    getTitleTypes(state) {
        return state.titleTypes
    }
}

export const actions = {
    async fetchAllProducts({commit}) {
        try {
            const {data} = await productService().getAllProducts()
            console.log(data,'products')
            commit('SET_PRODUCTS', data.data)
        } catch (e) {
            console.log(e)
        }
    },
    async fetchAllGeneres({commit}) {
        try {
            const {data} = await productService().getAllGeneres()
            commit('SET_GENERES', data)
        } catch (e) {
            console.log(e)
        }
    },

    async fetchAllTitleTypes({commit}) {
        try {
            const {data} = await productService().getAllTitleType()
            commit('SET_TITLE_TYPES', data)
        } catch (e) {
            console.log(e)
        }
    },
};
