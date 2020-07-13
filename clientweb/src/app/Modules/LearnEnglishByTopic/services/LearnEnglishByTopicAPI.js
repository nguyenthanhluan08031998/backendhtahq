import * as dataService from "@/app/utils/dataService"

const controller = {
    LearnEnglishByTopic: 'hoctienganhtheochude'
}

export const getDataListTopic = (e) => {
    return dataService.getAllPaging(controller.LearnEnglishByTopic, e)
}
export const getListVocabularyByTopic = (idTopic) => {
    return dataService.getFunction(controller.LearnEnglishByTopic, `getListVocabularyByTopic?idTopic=${idTopic}`)
}