import { useState, useEffect } from 'react'
import * as api from '../services/SettingsAPI'
import { webNotification } from "@/components/Notification/RenderNotification"
import { useTranslation } from "react-i18next";
import { getURLParamsKey } from "@/app/utils/dataService"
import { useSelector } from "react-redux"

export const useItem = ({ notification }) => {
    const currentUser = useSelector((state) => state.authService.user)
    const { t } = useTranslation()
    const [state, setState] = useState({
        page: 0,
        rowsPerPage: 10
    })
    const { page, rowsPerPage } = state
    const [item, setItem] = useState(api.makeNewItem)
    const [RemindList, setRemindList] = useState([])
    const [selectedTopic, setSelectedTopic] = useState(null)
    const [historyList, setHistoryList] = useState([])
    const [favoriteList, setFavoriteList] = useState([])
    const [viewList, setViewList] = useState({ ListGrid: [], TotalCount: 0 })
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (currentUser.Id > 0) {
            getById()
            getHistoryList()
            getFavoriteList()
            getTopic()
        }
    }, [])

    const handleClose = () => {
        setState(pre => ({ ...pre, page: 0, rowsPerPage: 10 }))
        setOpen(false)
    }

    const selectTypeRemind = (Id) => {
        setSelectedTopic(selectedTopic == Id ? null : Id)
    }

    const getHistoryList = async () => {

        var data = await api.getAllHistory(currentUser.Id)
        if (data) {
            var row = { Id: -1, NameTopic: "Lịch sử", NumberWord: data.length }
            setHistoryList({ ListGrid: data, TotalCount: data.length })
            setRemindList(x => [...x, row])
        }
    }
    const getFavoriteList = async () => {
        var data = await api.getAllFavorite(currentUser.Id, page, rowsPerPage)
        if (data) {
            var row = { Id: -2, NameTopic: "Yêu thích", NumberWord: data.TotalCount }
            setFavoriteList(data)
            setRemindList(x => [...x, row])
        }
    }
    const getTopic = async () => {
        var data = await api.getAllTopicWithNumberWord()
        if (data) {
            setRemindList(x => [...x, ...data])
        }
    }
    const RemindWordListView = async () => {
        if (!selectedTopic) {
            notification(t("Bạn chưa chọn danh sách nhắc nhở"), "error")
            return
        }
        if (selectedTopic < 0) {
            if (selectedTopic == -2) {
                console.log(favoriteList)
                setViewList(favoriteList)
            }
            else {
                console.log(historyList)

                setViewList(historyList)
            }
        }
        else {
            var wordList = await api.getWordByTopic(selectedTopic)
            setViewList({ ListGrid: wordList, TotalCount: wordList.length })
        }
        setOpen(true)
    }


    const handleGetWord = async () => {
        // if (selectedTopic == -1) {
        //     var history = await api.getAllHistorgetAllFavoritey(IdUser, page, rowsPerPage)
        //     setHistoryList(history)
        //     setViewList(history)
        // }
        if (selectedTopic == -2) {
            var favorite = await api.getAllFavorite(currentUser.Id, page, rowsPerPage)
            setFavoriteList(favorite)
            setViewList(favorite)
        }
    }
    useEffect(() => {
        if (currentUser.Id > 0) {
            handleGetWord()
        }
    }, [page, rowsPerPage, currentUser])

    const addOrUpdate = (dataItem) => {
        if (!selectedTopic && dataItem.TurnOnOff) {
            notification(t("Vui lòng chọn mục nhắc nhở"), "error")
            return
        }
        let newItem = {
            ...item,
            ...dataItem,
            IdUser: currentUser.Id
        };

        if (newItem.TimeStartRemind)
            newItem.TimeStartRemind = convertTimeToString(newItem.TimeStartRemind)
        if (newItem.TimeStopRemind)
            newItem.TimeStopRemind = convertTimeToString(newItem.TimeStopRemind)

        newItem.CategoryReminder =
            selectedTopic == -1 ? 0 :
                selectedTopic == -2 ? 1 :
                    selectedTopic > 0 ? 2 : null
        if (newItem.CategoryReminder == 2) {
            newItem.IdTopic = selectedTopic
        }
        newItem.IdUser = parseInt(newItem.IdUser)
        newItem.TurnOnOff = newItem.TurnOnOff ? 1 : 0
        console.log("data", newItem, dataItem)
        api.addOrUpdate(newItem).then(id => {
            if (id > 0) {
                notification(t("Lưu thành công"), "success");
                window.location.reload()
            } else {
                notification(t("Lưu thất bại"), "error");
            }
        });
    };


    const handleChangePage = (e, newPage) => {
        setState((pre) => ({ ...pre, page: newPage }));
    };

    const handleChangeRowsPerPage = (e) => {
        setState((pre) => ({ ...pre, page: 0, rowsPerPage: parseInt(e.target.value, 10) }));
    };

    const getById = async () => {
        var data = await api.getById(currentUser.Id)
        if (data) {
            if (data.CategoryReminder == 0) setSelectedTopic(-1)
            if (data.CategoryReminder == 1) setSelectedTopic(-2)
            if (data.CategoryReminder == 2) setSelectedTopic(data.IdTopic)
            data.TimeStartRemind = convertStringToTime(data.TimeStartRemind)
            data.TimeStopRemind = convertStringToTime(data.TimeStopRemind)
            setItem(data)
        }
    }

    return {
        open,
        item,
        RemindList,
        selectedTopic,
        page: state.page,
        rowsPerPage: state.rowsPerPage,
        viewList,
        addOrUpdate,
        selectTypeRemind,
        RemindWordListView,
        handleChangePage,
        handleChangeRowsPerPage,
        handleClose,
    }
}


const convertTimeToString = (time) => {
    if (typeof time == typeof "string") {
        if (time.includes("AM"))
            return time.substring(0, 5) + ":00"
        else {
            let hour = time.substring(0, 2)
            let minute = time.substring(3, 5)
            if (hour != "12") {
                hour = parseInt(hour) + 12
            }
            return hour + ":" + minute + ":00"
        }
    }
    else {
        return time.getHours() + ":" + time.getMinutes() + ":00";
    }
}

const convertStringToTime = (time) => {
    if (time) {
        var date = new Date()
        var hour = time.substring(0, 2)
        var minute = time.substring(3, 5)

        date.setHours(parseInt(hour))
        date.setMinutes(parseInt(minute))
        return date
    }
    return null
}
