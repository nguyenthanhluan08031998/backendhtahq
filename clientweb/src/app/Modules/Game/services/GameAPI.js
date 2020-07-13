import * as dataService from "@/app/utils/dataService"

const controller = {
    FuncMenu: 'home',
    SearchWord: 'timkiem'
}
export const getFuncMenu = () => {
    return dataService.getAll(controller.FuncMenu, 'GET');
}

export const getWordByWord = (word) => {
    return dataService.getFunction(controller.SearchWord, `getWordByWord?table=av&word=${word}`)
}