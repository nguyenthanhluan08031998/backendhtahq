import { useState, useEffect } from 'react'
import * as api from "../services/LoginAPI"
import { setCookie } from "@/app/utils/dataService"
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux"

export const useItem = ({ history, notification, buildUserInfo }) => {
    const { t } = useTranslation()
    const currentUser = useSelector((state) => state.authService.user)

    const checkLogin = async (dataItem) => {
        api.checkUser(dataItem.Email, dataItem.Password).then(result => {
            if (result.Id > 0) {
                buildUserInfo(result)
                setCookie("myLogin", JSON.stringify(result), 1)
                notification(t("Đăng nhập thành công"), "success")
                history.push('/home')
            }
            else {
                notification(t("Đăng nhập thất bại"), "error")
            }
        })
    }

    const onChangePassword = async (dataItem) => {
        let item = { Email: currentUser.Email, ...dataItem }
        if (item.PasswordConfirm != item.Password) {
            notification("Nhập lại mật khẩu không đúng", "error")
            return
        }
        let result = await api.onChangePassword(item)

        if (result > 0) {
            notification("Đổi mật khẩu thành công", "success")
            history.push('/home')
        }
        else {
            notification("Mật khẩu hiện tại không đúng", "error")
        }
    }
    return {
        checkLogin,
        onChangePassword
    }
}


