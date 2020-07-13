import * as dataService from "@/app/utils/dataService"

const controller = {
    Setting: 'setting',
    Favorite: 'yeuthich',
    History: 'lichsu',
    TopicManagement: 'quanlichude',
    DictionaryManagement: 'quanlitudien'
}

export const makeNewItem = {
    Id: 0,
    TurnOnOff: true,
    NumberWordOnDay: 0,
    TimeStartRemind: null,
    TimeStopRemind: null,
    CategoryReminder: null,
    IdTopic: null,
    IdUser: null
}

// export const getAllHistory = (id, page, rowsPerPage) => {
//     return dataService.getAllPaging(controller.History, { IdUser: id, page, rowsPerPage })
// }

export const getAllHistory = (id) => {
    return dataService.getFunction(controller.History, `getAllHistoryAndPaging?IdUser=${id}`)
}

export const getAllFavorite = (id, page, rowsPerPage) => {
    return dataService.getAllPaging(controller.Favorite, { IdUser: id, page, rowsPerPage })
}
export const getAllTopicWithNumberWord = (id) => {
    return dataService.getFunction(controller.TopicManagement, `getAllTopicWithNumberWord`)
}

export const getWordByTopic = (id) => {
    return dataService.getFunction(controller.DictionaryManagement, `getWordByTopic?IdTopic=${id}`)
}

export const getById = (id) => {
    return dataService.getFunction(controller.Setting, `getById?IdUser=${id}`)
}

export const addOrUpdate = (item) => {
    return dataService.postFunction(controller.Setting, "addOrUpdate", item)
}