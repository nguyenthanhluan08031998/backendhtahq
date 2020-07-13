import * as dataService from "@/app/utils/dataService"

const controller = {
    Login: 'hash'
}

export const checkUser = (email, password) => {
    return dataService.getFunction(controller.Login, `login?email=${email}&password=${password}`)
}
export const onChangePassword = (item) => {
    return dataService.postFunction(controller.Login, `changepassword`, item)
}



