const handleMessage = (message: MessageEvent<unknown>): void => {
  self.postMessage(message)
}

self.onmessage = handleMessage
export default {}