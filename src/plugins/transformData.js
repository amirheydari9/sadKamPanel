import store from "../store/store";

export const transformRoles = (value) => {
    const roles = []
    value.organizationRoles.forEach(item => {
        const role = store.getters['getAllRoles'].find(i => i.role === item)
        roles.push(role.fa)
    })
    return roles.length ? roles.join(',') : value.organizationRoles
}

export const transformOrganizationType = (value) => {
    const organizationType = store.getters['getOrganizationTypes'].find(item => item.type === value.organizationType)
    return organizationType ? organizationType.fa : value.organizationType
}

export const transformOrganization = (value) => {
    const organization = store.getters['getOrganizations'].find(item => item._id === value.organization)
    return organization ? organization.name : value.organization
}
