import store from "../store/store";
// import {entryType} from "./constant";
const entryTypes = [
    {
        "en": "single",
        "fa": "تکی"
    },
    {
        "en": "multiple",
        "fa": "چندتایی"
    }
]

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

export const transformEntryType = (value) => {
    const entryType = entryTypes.find(item => item.en === value.entryType)
    return entryType ? entryType.fa : value.entryType
}
export const transformTitleType = (value) => {
    const titleType = store.getters['product/getTitleTypes'].find(item => item.en === value.titleType)
    return titleType ? titleType.fa : value.titleType
}
