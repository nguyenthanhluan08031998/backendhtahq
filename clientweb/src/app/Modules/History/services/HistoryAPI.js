import * as dataService from "@/app/utils/dataService"

const controller = {
    History: 'lichsu'
}

export const makeNewItem = {
    Id: 0,
    Word: "",
}

export const getHistory = (e) => {
    return dataService.getAllPaging(controller.History, e)
}

