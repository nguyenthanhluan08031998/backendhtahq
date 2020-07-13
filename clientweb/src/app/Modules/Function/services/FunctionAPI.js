import * as dataService from "@/app/utils/dataService"

const controller = {
    FuncMenu: 'home',
}
export const getFuncMenu = () => {
    return dataService.getAll(controller.FuncMenu, 'GET');
}