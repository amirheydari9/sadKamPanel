import {authService} from "./authService";
import axios from "axios";

export function organizationService() {

    const token = `Bearer ${authService().getToken()}`

    const getAllOrganization = async () => {
        try {
            return await axios.get('http://sadkam.lincast.ir/organizations', {headers: {'Authorization': token}})
        } catch (e) {
            console.log(e)
        }
    }

    return {
        getAllOrganization,
    }
}
