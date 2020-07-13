import { useState, useEffect } from 'react'
// import * as api from '../services/FuncMenuAPI'
import { EditorUtils } from "@progress/kendo-react-editor";
// import { notification } from "@/components/Notification/RenderNotification"
import { useSelector } from "react-redux"
import io from 'socket.io-client';
import { IpServer, APIPortSocket } from '../../../utils/Port'
import { initReactI18next } from 'react-i18next';
const socket = io(`http://${IpServer}:${APIPortSocket}`);

export const useItem = ({ notification, history, t, isNullOrEmpty }) => {
    const currentUser = useSelector((state) => state.authService.user)
    const [item, setItem] = useState({
        Name: "Phòng của " + currentUser.Name,
        IsPassword: false,
        Password: null,
        PlayerNumber: null,
        Time: null
    })
    const [roomList, setRoomList] = useState([])
    const [open, setOpen] = useState(false)
    const [password, setPassword] = useState("")
    const [selectedRoom, setSelectedRoom] = useState({})

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        socket.on('sendRoomOwner', res => {
            history.push(`/game?Id=${res.id}`)
        })
        socket.on("roomList", res => {
            console.log(res.activeRoom)
            setRoomList(res.activeRoom)
        });
        socket.emit('getRoom')
    }, [])

    const creatRoom = async (dataItem) => {
        await socket.emit("createRoom", {
            name: dataItem.Name,
            numOfPlayers: dataItem.PlayerNumber,
            password: dataItem.Password,
            time: dataItem.Time,
            players: [],
            owner: currentUser.Name
        })
        notification(t("Đã tạo phòng"), "success")
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const onJoinGame = (room) => {
        setSelectedRoom(room)
        setOpen(true)
    }
    const onCheckPassword = () => {
        if (selectedRoom.password == password || isNullOrEmpty(selectedRoom.password)) {
            history.push(`/game?Id=${selectedRoom.id}`)
        }
        else {
            notification(t("Sai mật khẩu"), "error")
        }
    }

    return {
        item,
        roomList,
        open,
        selectedRoom,
        password,
        onCheckPassword,
        onJoinGame,
        onChangePassword,
        creatRoom,
        handleClose
    }
}
