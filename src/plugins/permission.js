import store from "../store/store";

export default class Permission {
    can(permission) {
        return store.getters['getCurrentUser'].organizationRoles.indexOf(permission) !== -1;
    }

    isSuperAdmin() {
        return (
            store.getters['getCurrentUser'].organizationRoles.length === 3
            &&
            store.getters['getCurrentUser'].organizationType === 'secretariant'
        )
    }

    isAdmin() {
        return (
            store.getters['getCurrentUser'].organizationRoles.length === 3
            &&
            store.getters['getCurrentUser'].organizationType !== 'secretariant'
        )
    }

    isUserManager() {
        return (
            store.getters['getCurrentUser'].organizationRoles.indexOf('user_manager') !== -1
        )
    }

    isFinancial() {
        return (
            store.getters['getCurrentUser'].organizationRoles.indexOf('financial') !== -1
        )
    }

    isOrders() {
        return (
            store.getters['getCurrentUser'].organizationRoles.indexOf('orders') !== -1
        )
    }
}
