import { useCallback, useEffect, useState } from "react"

async function sendHttpRequest(url,config){
    const response = await fetch(url,config)
    const responseData = await response.json()
    if(!response.ok){
        throw new Error(responseData.message || 'Request failed!')
    }
    return responseData
}
export default function useHttp(url,config, initialData){
    const [data, setData] = useState(initialData)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    function clearData(){
        setData(initialData)
    }

    const sendRequest = useCallback(async function sendRequest(data){
        setIsLoading(true)
        try {
            const resData = await sendHttpRequest(url,{...config, body: JSON.stringify(data)})
            setData(resData)
        } catch (error) {
            setError(error.message || 'Something went wrong!')
        }
        setIsLoading(false)
    },[url,config])
    useEffect(()=>{
        if((config && (config.method === 'GET' || !config.method)) || !config){
            sendRequest()
        }
    },[sendRequest, config])
    
    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    }
}