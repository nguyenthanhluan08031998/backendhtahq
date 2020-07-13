import * as dataService from "@/app/utils/dataService"

const controller = {
    Setting: 'setting',
}

export const timePerRemind = 5  // second

export const getHistory = (id) => {
    return dataService.getFunction(controller.Setting, `getRandomHistory?IdUser=${id}`)
}

export const getFavorite = (id) => {
    return dataService.getFunction(controller.Setting, `getRandomFavorite?IdUser=${id}`)
}

export const getTopic = (id, idtopic) => {
    return dataService.getFunction(controller.Setting, `getRandomTopic?IdUser=${id}&IdTopic=${idtopic}`)
}

export const getById = (id) => {
    return dataService.getFunction(controller.Setting, `getById?IdUser=${id}`)
}