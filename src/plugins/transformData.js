import {organizationRoles, organizationTypes} from "./constant";

export const transformOrganization = (value) => {
    const data = organizationTypes.find(item => item.type === value.organizationType)
    return data.fa
}

export const transformRoles = (value) => {
    console.log(value.organizationRoles)
    const data = []
    if (value) {
        value.forEach(item => {
            const faTitle = organizationRoles.find(i=>i.fa === item)
            data.push(faTitle.fa)
        })
    }

    console.log(data);
    data.length ? data.join(','):value.organizationRoles
    // if(data.length > 0){
    //     return  dat
    // }
    //
    // return value.organizationRoles ? value.organizationRoles.join(',') : value.organizationRoles
}
