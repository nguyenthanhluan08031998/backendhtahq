import { useState, useEffect } from 'react'
import * as api from '../services/GameAPI'
import { IpServer, APIPortSocket } from '../../../utils/Port'
import { EditorUtils } from "@progress/kendo-react-editor";
// import { notification } from "@/components/Notification/RenderNotification"
import { useSelector } from "react-redux"
import { getURLParamsKey } from "@/app/utils/dataService"

import io from 'socket.io-client';
const socket = io(`http://${IpServer}:${APIPortSocket}`);

export const useItem = ({ location, history, notification }) => {
    const [messages, setMessage] = useState([])
    const [text, setText] = useState("")
    const [disable, setDisable] = useState(true)
    const [room, setRoom] = useState({ players: [], owner: {} })
    const [game, setGame] = useState({ id: 0, playerOrder: [], time: 0, historyWord: [] })
    const [time, setTime] = useState(-1)
    const [word, setWord] = useState({ Id: 0 })
    const [result, setResult] = useState({ isPlaying: true })
    const [endGame, setEndGame] = useState({ IsFinish: false, Winner: "" })
    let id = getURLParamsKey(location.search, "Id")
    const currentUser = useSelector((state) => state.authService.user)

    useEffect(() => {
        socket.on('sendRoomInfo', async res => {
            if (res) {
                setRoom(res)
            }
            else {
                history.push(`/game/menu`)
            }
        })
        socket.on('sendGame', async game => {
            console.log("game", game)
            socket.emit("joinGame", { roomId: room.id, gameId: game.id })
            setGame(game)
            setResult({ isPlaying: true })
            let currentWord = await api.getWordByWord(game.currentWord)
            if (currentWord.Id > 0) {
                setWord(currentWord)
            }
            else {
                setWord({ Id: 0 })
            }
        })
        socket.on('sendResult', res => {
            setResult(res)
        })
        socket.on('sendGameEnd', res => {
            setEndGame({ IsFinish: true, Winner: res.winner })
            setResult({ isPlaying: false })
        })
        socket.on('sendTimer', timeNow => {
            if (timeNow >= 0) {
                setTime(timeNow)
            }
        })
    }, [])

    useEffect(() => {
        socket.emit('getRoomById', parseInt(id))
    }, [id])

    useEffect(() => {
        if (room.id > 0 && !room.players.find(x => x.playerId == currentUser.Id)) {
            socket.emit('joinRoom', {
                roomId: id,
                player: { playerId: currentUser.Id, playerName: currentUser.Name }
            })
        }
    }, [room])

    useEffect(() => {
        socket.on('sendData', res => {
            setMessage(res.data)
        });
    }, [messages])

    const updateData = async (e) => {
        if (e.which === 13 || e.keyCode === 13 || e.which === 1 || e.type === "click") {
            let word = await api.getWordByWord(text)
            if (word.Id > 0) {
                socket.emit("sendWord", { id: game.id, word: text });
                setText("")
            }
            else {
                notification("Từ này không có trong từ điển", "error")
            }
        }
    }

    const replay = () => {
        if (!disable) {
            socket.emit("replay", {})
            setMessage([])
        }
    }

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const onRemovePlayer = (playerId) => {
        // socket.emit("leaveRoom", { roomId: parseInt(room.id), playerId: parseInt(playerId) })
    }

    const onStartGame = () => {
        if (room.id > 0) {
            socket.emit("startGame", room.id)
        }
    }

    return {
        messages,
        text,
        room,
        disable,
        result,
        game,
        time,
        word,
        endGame,
        updateData,
        handleChange,
        replay,
        onRemovePlayer,
        onStartGame
    }
}
