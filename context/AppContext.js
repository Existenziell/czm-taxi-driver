import { createContext, useState, useContext, useEffect } from 'react'
import { useChannel } from "../components/RealtimeEffect"

const AppContext = createContext()
const useApp = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
  const [notificationMsg, setNotificationMsg] = useState('')
  const [newRequest, setNewRequest] = useState('')
  const [receivedRequests, setRequests] = useState([])
  const [ctxMap, setCtxMap] = useState()

  // Listen on ably channel for new taxi requests
  const [channel, ably] = useChannel("czmTaxi", (message) => {
    if (message.name === 'czmTaxiRequest') {
      // console.log("New Request: ", message)
      const history = receivedRequests.slice(-199)
      setRequests([...history, message])
    }
  })

  // Broadcasting service over ably (name = channel name)
  const broadcast = (name, data) => {
    channel.publish({ name, data })
  }

  const notify = (msg) => {
    const notification = document.querySelector('.notification')
    notification.classList.remove('-translate-y-20')
    setNotificationMsg(msg)
    setTimeout(() => {
      notification.classList.add('-translate-y-20')
    }, 2500)
  }

  const contextValue = {
    receivedRequests,
    setRequests,
    newRequest,
    setNewRequest,
    broadcast,
    ctxMap,
    setCtxMap,
    notificationMsg,
    setNotificationMsg,
    notify,
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

export default useApp
