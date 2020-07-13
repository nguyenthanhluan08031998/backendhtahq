import * as dataService from "@/app/utils/dataService"

const controller = {
    DictionaryManagement: 'quanlitudien'
}

export const makeNewItem = {
    Id: 0,
    Word: "",
    Html: "",
    Description: "",
    Pronounce: "",
    YoutubeLink: "",
    IdTopic: null
}

export const getDictionary = (e) => {
    return dataService.getAllPaging(controller.DictionaryManagement, e)
}

export const addOrUpdate = (item) => {
    return dataService.addOrUpdate(controller.DictionaryManagement, item)
}

export const checkExist = (Word, Id) => {
    return dataService.getFunction(controller.DictionaryManagement, `get?Word=${Word}&Id=${Id}`)
}

export const getTopicOption = () => {
    return dataService.getFunction(controller.DictionaryManagement, `getOption`)
}

export const getWordByTopic = (Id) => {
    return dataService.getFunction(controller.DictionaryManagement, `getWordByTopic?IdTopic=${Id}`)
}