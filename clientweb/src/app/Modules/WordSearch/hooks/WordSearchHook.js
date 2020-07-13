import { useState, useEffect } from 'react'
import * as api from '../services/WordSearchAPI'
import Speech from 'speak-tts'
import { useTranslation } from "react-i18next";
import { getURLParamsKey } from "@/app/utils/dataService"
import { useSelector } from "react-redux"
const speech = new Speech()
speech.init({
    'volume': 1,
    'lang': 'en-US',
    'rate': 1,
    'pitch': 1,
    'voice': 'Google UK English Male',
    'splitSentences': true
})

export const useItem = (props) => {
    const { t } = useTranslation()
    const { history, location, notification } = props
    const [textSearch, setTextSearch] = useState('')
    const [wordItem, setWordItem] = useState(api.makeNewItem)
    const [wordLike, setWordLike] = useState(api.makeNewItemWordLike)
    const [wordHistory, setWordHistory] = useState(api.makeNewItemWordHistory)
    const [Id, setId] = useState(null)
    const [color, setColor] = useState('')
    const [isCheckWordLikeExist, setIsCheckWordLikeExist] = useState(false)
    const [languageSelect, setLanguageSelect] = useState("")
    const [languageTable, setLanguageTable] = useState('')// bien de chuyen doi English sang AV de phuc vu cho gon
    const [dictionaryOptions, setDictionaryOptions] = useState([])
    const [disableStar, setDisableStar] = useState(false)
    const currentUser = useSelector((state) => state.authService.user)

    const onInputChange = async (e) => {
        if (e) {
            const list = await api.getDictionaryOptions(languageTable, e)
            setDictionaryOptions(list)
        }
    }
    const onSearch = async (textSearch) => {
        if (textSearch) {
            if (languageSelect == "English") {
                var wordID = await api.getIdWord("AV", textSearch)
                if (wordID) {
                    setDisableStar(false)
                    addNewWordHistory(wordItem)
                    checkExistWordLike(wordID, currentUser.Id)
                    history.replace({ pathName: location.pathName, search: `?LanguageTranslate=${languageSelect}&Id=${wordID}` });
                    setId(wordID)
                    checkExistWordLike(wordID, currentUser.Id)
                }
            }
            if (languageSelect == "Tiếng việt") {
                if (wordID) {
                    var wordID = await api.getIdWord("VA", textSearch)
                    setDisableStar(true)
                    history.replace({ pathName: location.pathName, search: `?LanguageTranslate=${languageSelect}&Id=${wordID}` });
                    setId(wordID)
                }
            }
        }
    }

    const onKeyPress = (e) => {
        if (e.which === 13 || e.keyCode === 13 || e.which === 1 || e.type === "click") {
            if (e.which === 13 && dictionaryOptions.length == 1) {
                onSearch(dictionaryOptions[0].Word)
            }
            else onSearch(textSearch)
        }
    }

    const onChangeSearch = (e) => {
        setTextSearch(e.target.value)
    }

    const getWordByID = async () => {
        let LanguageTranslate = getURLParamsKey(location.search, "LanguageTranslate")
        setLanguageSelect(LanguageTranslate)
        let table = checkLanguage(LanguageTranslate)
        let id = getURLParamsKey(location.search, "Id")
        var word = null
        if (id) {
            word = await api.getWordById(table, id)
        }
        else {
            word = await getWordByWord()
        }
        if (word) {
            checkExistWordLike(word.Id, currentUser.Id)
            setWordItem(word)
        }

    }
    useEffect(() => {
        getWordByID()
    }, [Id])

    const getWordByWord = async () => {
        let word = getURLParamsKey(location.search, "Word")
        if (word) {
            let result = await api.getWordByWord("AV", word)
            setWordItem(result)
            return result
        }
        return null
    }

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

    const checkLanguage = (language) => {
        if (language == 'English') {
            return 'AV'
        }

        if (language == 'Tiếng việt') {
            return 'VA'
        }
    }
    const addNewWordHistory = async (word) => {
        if (currentUser.isAuthenticated == true) {
            wordHistory.IdUser = currentUser.IdUser
            wordHistory.IdWord = word.Id
            wordHistory.TimeSearch = new Date()
            wordHistory.Remembered = 0
            setWordHistory(wordHistory)
            await api.addOrUpdateWordHistory(wordHistory)
        }

    }
    const addNewWordLike = async (word) => {
        if (currentUser.isAuthenticated == true) {
            wordLike.IdUser = currentUser.Id
            wordLike.IdWord = word.Id
            wordLike.Remembered = 0
            setWordLike(wordLike)
            await api.addOrUpdateWordLike(wordLike)
        }
    }
    const onButtonAddWordLike = async () => {
        let isExist = await api.checkExistWordLike(wordItem.Id, currentUser.Id)
        if (isExist) {
            setColor('#adad85')
            setIsCheckWordLikeExist(false)
            await api.deleteWordLike({ Id: isExist })
            notification(t("Xóa thành công ra khỏi mục yêu thích"), "success");
        }
        else {
            setIsCheckWordLikeExist(true)
            setColor('#fd0f2b')
            addNewWordLike(wordItem)
            notification(t("Thêm thành công vào mục yêu thích"), "success");

        }
    }

    const checkExistWordLike = async (idWord) => {
        var isExist = await api.checkExistWordLike(idWord, currentUser.Id)
        if (isExist) {
            setColor('#fd0f2b')//mau vang
            setIsCheckWordLikeExist(true)
        }
        else {
            setColor('#adad85')
            setIsCheckWordLikeExist(false)
        }
    }
    const onGoBack = () => {
        history.goBack()
    }
    const onGoHome = () => {
        history.push("/home")
    }
    const onSpeak = () => {
        speech.speak({
            text: wordItem.Word,
        })
    }
    const onChangeLanguageSelect = (e) => {
        if (e && e.target.value) {
            setLanguageSelect(e.target.value)
        }
    }
    return {
        textSearch,
        onSearch,
        onChangeSearch,
        wordItem,
        onButtonAddWordLike,
        color,
        onGoBack,
        onSpeak,
        dictionaryOptions,
        onKeyPress,
        onInputChange,
        onGoHome,
        languageSelect,
        onChangeLanguageSelect,
        disableStar
    }
}