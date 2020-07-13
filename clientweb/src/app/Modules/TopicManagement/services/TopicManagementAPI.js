import * as dataService from "@/app/utils/dataService"

const controller = {
    TopicManagement: 'quanlichude',
    SearchWord:'timkiem'
}

export const makeNewItem = {
    Id: 0,
    NameTopic: "",
    Translate: ""
}

export const getTopic = (e) => {
    return dataService.getAllPaging(controller.TopicManagement, e)
}

export const addOrUpdate = (item) => {
    return dataService.addOrUpdate(controller.TopicManagement, item)
}
export const checkExist = (NameTopic, Id) => {
    return dataService.getParams(controller.TopicManagement, `get?NameTopic=${NameTopic}&Id=${Id}`)
}
export const getDictionaryOptions =(e) =>{
    return dataService.getFunction(controller.SearchWord, `getOption?e=${e}`)
}