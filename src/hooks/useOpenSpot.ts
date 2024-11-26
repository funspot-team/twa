/* eslint-disable @typescript-eslint/ban-ts-comment */
import { onChangeSpotVisible } from "@/pages/ItemPage/model";
// import { useNavigate } from "react-router-dom";

export const useOpenSpot = () => {
    // const navigate = useNavigate();

    const openSpot = (id: string) => {
        // @ts-ignore
        // const { history, index } = JSON.parse(sessionStorage.getItem('app-navigation-state')) || {};
        // const item = history[index];
        // navigate(item);
        onChangeSpotVisible(id);
    }

    return {
        openSpot,
    }
}