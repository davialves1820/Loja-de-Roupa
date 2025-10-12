import { useEffect } from "react";
import ClothesServices from "../../services/clothes";
import Loading from "../loading/pages";

export default function Clothes() {
    const { getAvailableclothes, clothesLoading, refetchclothes, clothesList } = ClothesServices();

    useEffect(() => {
        if (refetchclothes) {
            getAvailableclothes()
        }
    }, [refetchclothes])

    if (clothesLoading) {
        return ( <Loading/>)
    }

    console.log(clothesList)

    return (
        <h1>Clothes</h1>
    );
}