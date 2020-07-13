import * as dataService from "@/app/utils/dataService"

const controller = {
    FuncMenu: 'home',
    SearchWord: 'timkiem'
}
export const makeNewItemWordHistory = {
    Id:0,
    IdUser:0,
    IdWord:0,
    TimeSearch: null,
    Remembered:0
}
export const getFuncMenu = () => {
    return dataService.getAll(controller.FuncMenu, 'GET');
}
export const getWord = (table,textSearch) =>{
    return dataService.getFunction(controller.SearchWord,`searchword?table=${table}&word=${textSearch}`);
}
export const addOrUpdates = (item) =>{
    return dataService.addOrUpdate(controller.SearchWord,item)
}
export const getDictionaryOptions =(languageTable,e) =>{
    return dataService.getFunction(controller.SearchWord, `getOption?languageTable=${languageTable}&e=${e}`)
}