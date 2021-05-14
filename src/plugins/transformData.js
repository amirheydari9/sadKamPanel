import store from "../store/store";
import {entryType} from './constant';
import moment from 'moment-jalaali'

moment.loadPersian({
    usePersianDigits: true
})

export const transformRoles = (value) => {
    const roles = []
    value.forEach(item => {
        const role = store.getters['getAllRoles'].find(i => i.role === item)
        if (role) {
            roles.push(role.fa)
        }
    })
    return roles.length ? roles.join(',') : value.organizationRoles
}

export const transformOrganizationType = (value) => {
    const organizationType = store.getters['getOrganizationTypes'].find(item => item.type === value)
    return organizationType ? organizationType.fa : value
}

export const transformOrganization = (value) => {
    const organization = store.getters['getOrganizations'].find(item => item._id === value)
    return organization ? organization.name : value
}

export const transformEntryType = (value) => {
    const enType = entryType.find(item => item.en === value)
    return enType ? entryType.fa : value
}
export const transformTitleType = (value) => {
    const titleType = store.getters['product/getTitleTypes'].find(item => item.en === value)
    return titleType ? titleType.fa : value
}

export const transformDateToJalali = (value) => {
    return moment(value).format('jYYYY/jMM/jDD')
}
export const transformJalaliDateToGeorgian = (value) => {
    return moment(value,'jYYYY/jMM/jDD').format('YYYY/MM/DD')
}
