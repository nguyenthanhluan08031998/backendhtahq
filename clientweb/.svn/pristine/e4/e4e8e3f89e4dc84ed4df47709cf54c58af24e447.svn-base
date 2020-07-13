import * as dataService from "@/app/utils/dataService"


export const makeNewItem = {
    Id: 0,
    Word: "",
    Html: "",
    Description: "",
    Pronounce: "",
    IdTopic: null
}
export const makeNewItemWordLike = {
    Id: 0,
    IdUser: 0,
    IdWord: 0,
    Remembered: null
}
export const makeNewItemWordHistory = {
    Id: 0,
    IdUser: 0,
    IdWord: 0,
    TimeSearch: null,
    Remembered: null
}
const controller = {
    SearchWord: 'timkiem'
}
export const getIdWord = (table, word) => {
    return dataService.getFunction(controller.SearchWord, `searchword?table=${table}&word=${word}`);
}// trả ra cái ID thay vì trả ra word
export const getWordById = (table, id) => {
    return dataService.getFunction(controller.SearchWord, `getWordById?table=${table}&id=${id}`)
}
export const getWordByWord = (table, word) => {
    return dataService.getFunction(controller.SearchWord, `getWordByWord?table=${table}&word=${word}`)
}
export const addOrUpdateWordLike = (item) => {
    return dataService.postFunction(controller.SearchWord, `addOrUpdateWordLike`, item)
}
export const addOrUpdateWordHistory = (item) => {
    return dataService.addOrUpdate(controller.SearchWord, item)
}
export const checkExistWordLike = (IdWord, IdUser) => {
    return dataService.getFunction(controller.SearchWord, `checkExistWordLike?IdWord=${IdWord}&IdUser=${IdUser}`)
}
export const deleteWordLike = (word) => {
    return dataService.postFunction(controller.SearchWord, `deleteWordLike`, word)
}
export const getDictionaryOptions = (languageTable, e) => {
    return dataService.getFunction(controller.SearchWord, `getOption?languageTable=${languageTable}&e=${e}`)
}