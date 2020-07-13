import * as dataService from "@/app/utils/dataService"

const controller = {
    Favorite: 'yeuthich'
}

export const makeNewItem = {
    Id: 0,
    Word: "",
}

export const getFavorite = (e) => {
    return dataService.getAllPaging(controller.Favorite, e)
}

