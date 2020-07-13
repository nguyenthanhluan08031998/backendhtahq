import { useState, useEffect } from 'react'
import * as api from '../services/FuncMenuAPI'
import { EditorUtils } from "@progress/kendo-react-editor";
// import { notification } from "@/components/Notification/RenderNotification"
import { useSelector } from "react-redux"

export const useItem = (props) => {
    const currentUser = useSelector((state) => state.authService.user)
    const [textSearch, setTextSearch] = useState('')
    const [wordHistory, setWordHistory] = useState(api.makeNewItemWordHistory)
    const { history } = props
    const [data, setData] = useState([])
    const [dictionaryOptions, setDictionaryOptions] = useState([])
    const [languageSelect, setLanguageSelect] = useState("English")
    const [languageTable, setLanguageTable] = useState('')// q bien de chuyen doi English sang AV de phuc vu cho gon

    const changeLanguageTable = () => {
        if (languageSelect == "English") {
            setLanguageTable("AV")
        }
        if (languageSelect == "Tiếng việt") {
            setLanguageTable("VA")
        }
    }
    useEffect(() => {
        changeLanguageTable()
    }, [languageSelect])

    const onInputChange = async (e) => {
        if (e) {
            const list = await api.getDictionaryOptions(languageTable, e)
            setDictionaryOptions(list)
        }
    }
    const onChangeLanguageSelect = (e) => {
        if (e && e.target.value) {
            setLanguageSelect(e.target.value)
        }
    }
    async function getData() {
        let result = await api.getFuncMenu();
        if (result) {
            if (currentUser.IdRole == 2) {
                setData(result.filter(x => x.Permission != 1))
            }
            else {
                setData(result)
            }

        }
    }
    useEffect(() => {
        getData()
    }, [])

    const onSearch = async () => {
        if (textSearch) {
            if (languageSelect == "English") {
                let wordID = await api.getWord('AV', textSearch)
                if (wordID) {
                    if (currentUser.isAuthenticated == true) {
                        wordHistory.IdUser = currentUser.Id
                        wordHistory.IdWord = wordID
                        wordHistory.TimeSearch = new Date()
                        api.addOrUpdates(wordHistory)
                    }

                    history.push(`/timkiem?LanguageTranslate=${languageSelect}&Id=${wordID}`)
                }
            }
            if (languageSelect == "Tiếng việt") {
                let wordID = await api.getWord('VA', textSearch)
                if (wordID) {
                    history.push(`/timkiem?LanguageTranslate=${languageSelect}&Id=${wordID}`)
                }
            }

        }

    }

    const onKeyPress = (e) => {
        console.log("hi3")

        if (e.which === 13 || e.keyCode === 13 || e.which === 1 || e.type === "click") {
            console.log("hi2")

            if (e.which === 13 && dictionaryOptions.length == 1) {
                console.log("hi")
                onSearch(dictionaryOptions[0].Word)
            }
            else onSearch(textSearch)
        }

    }

    const onChangeSearch = (e) => {
        setTextSearch(e.target.value)
    }

    const goToPage = (Link) => {
        if (currentUser.Id > 0) {
            history.push(Link)
        }
        else {
            history.push('/dangnhap')
        }
    }
    return {
        data,
        textSearch,
        onSearch,
        onChangeSearch,
        goToPage,
        onKeyPress,
        dictionaryOptions,
        onInputChange,
        languageSelect,
        onChangeLanguageSelect
    }
}
