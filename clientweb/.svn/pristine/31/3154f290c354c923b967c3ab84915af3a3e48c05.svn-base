import { useState, useEffect } from 'react'
import * as api from '../services/AppBarAPI'
import language from "@/app/utils/i18next"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "@/store/redux/auth/authActions"
export const useItem = (props) => {
    const dispatch = useDispatch();

    const { history } = props
    const [open, setOpen] = useState(false);
    const [wordTranslate, setWordTranslate] = useState(api.newWord)
    const [selectedText, setSelectedText] = useState('')
    const [openLogin, setOpenLogin] = useState(false)
    const currentUser = useSelector((state) => state.authService.user)
    const [isCheckTranslate, setIsCheckTranslate] = useState(false)
    const [openButtonTranslate, setOpenButtonTranslate] = useState(false)

    const handleClose = () => {
        setOpen(false);
    };
    const getWordByGetSelectionText = async () => {
        if (selectedText) {
            let word = await api.getWordByGetSelectionText(selectedText)
            if (word && selectedText.length > 0) {
                setWordTranslate(word)
                setOpen(true)
                setOpenButtonTranslate(true)
            }
        }

    }
    useEffect(() => {
        getWordByGetSelectionText(selectedText)
    }, [selectedText])

    // const getSelectionText = () => {
    //     var text = ''
    //     if (window.getSelection) { // all modern browsers and IE9+
    //         text = window.getSelection().toString()
    //         setSelectedText(text)
    //     }
    //     return text
    // }
    // document.addEventListener('mouseup', async function () {
    //     var thetext = getSelectionText()
    //     if (thetext.length > 0) {
    //         await setSelectedText(thetext)
    //         setIsCheckTranslate(false)
    //     }
    // }, false)

    const changeLanguage = (e) => {
        if (e == 'vi') {
            language.changeLanguage("vi")
            console.log('currentUser.isAuthenticated', currentUser.isAuthenticated)
        }
        if (e == 'en') {
            language.changeLanguage("en")
        }
    }

    const onNextToPageLogin = () => {
        history.replace("/dangnhap")
    }

    const checkInLogin = () => {
        if (currentUser.isAuthenticated == true) {
            setOpenLogin(true)
            setOpen(false);
        }
        else {
        }
    }
    useEffect(() => {
        checkInLogin()
    }, [currentUser])

    const onButtonTranslate = () => {
        setIsCheckTranslate(true)
        setOpenButtonTranslate(false)
        console.log("openButtonTranslate", openButtonTranslate)
    }
    const onLogout = () => {
        setOpenLogin(false)
        setOpen(false);
        dispatch(logout())
        history.push('/dangnhap')
    }

    const onChangePassWord = () => {
        history.push('/doimatkhau')
    }

    return {
        open,
        handleClose,
        wordTranslate,
        changeLanguage,
        onNextToPageLogin,
        openLogin,
        isCheckTranslate,
        onButtonTranslate,
        openButtonTranslate,
        currentUser,
        onLogout,
        onChangePassWord
    }
}