import { useState, useEffect } from "react";

function useCurrencyInfo(currency){
    const [data,setData] = useState({})

    useEffect(()=>{
        fetch(`https://apilayer.net/api/live?access_key=2048371ad9999e713fb59ca652f4c60d&source=${currency}&format=1`)
        .then((res)=> res.json())
        .then((res)=> setData(res.quotes))
    },[currency])
    
    return data
}

export default useCurrencyInfo;