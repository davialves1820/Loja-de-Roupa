import { useState } from "react"

export default function ClothesServices() {
    const [clothesLoading, setclothesLoading] = useState(false)
    const [refetchclothes, setRefetchclothes] = useState(true)
    const [clothesList, setclothesList] = useState([])

    const url = 'http://localhost:3000/clothes'

    const getAvailableclothes = () => {
        setclothesLoading(true)
        
        fetch(`${url}/availables`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
        .then((response) => response.json())
        .then((result) => {
            if(result.success) {
                setclothesList(result.body)
            } else {
                console.log(result)
            }
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            setclothesLoading(false)
            setRefetchclothes(false)
        })
    }

    return { 
        getAvailableclothes, 
        clothesLoading, 
        refetchclothes, 
        clothesList 
    }
}
