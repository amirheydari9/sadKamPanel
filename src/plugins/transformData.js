import store from "../store/store";
import {entryType} from './constant';
import Jmoment from 'moment-jalaali'
import moment from 'moment'

Jmoment.loadPersian({
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
    return enType ? enType.fa : value
}
export const transformTitleType = (value) => {
    const titleType = store.getters['product/getTitleTypes'].find(item => item.en === value)
    return titleType ? titleType.fa : value
}

export const transformDateToJalali = (value) => {
    return Jmoment(value).format('jYYYY/jMM/jDD')
}
export const transformJalaliDateToGeorgian = (value) => {
    return Jmoment(value, 'jYYYY/jMM/jDD').format('YYYY/MM/DD')
}

export const transformVideoTimeFormat = (seconds) => {
    return new Date(seconds * 1000).toISOString().substr(11, 8)
}

export const transformVideoTimeToSecond = (format) => {
    return moment.duration(format).asSeconds();
}
