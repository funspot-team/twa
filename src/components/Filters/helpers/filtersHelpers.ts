/* eslint-disable @typescript-eslint/no-explicit-any */
import { MultiselectOption } from "@telegram-apps/telegram-ui/dist/components/Form/Multiselect/types";

export const getSpotsByFilters = (data: any, filters: MultiselectOption[], withChildren: boolean, price: number) => {
    const valueArr = filters.map(({ value }) => value);
    
    let filteredSpots = data.filter(({ minPrice }: any) => {
        return minPrice <= price;
    })

    if (withChildren) {
        filteredSpots = filteredSpots.filter(({ minAge }: any) => {
            return minAge < 18;
        });
    }  

    return filters.length
        ? filteredSpots.filter(({ tags }: any) => {
            return tags.filter((tag: string) => valueArr.includes(tag)).length === filters.length
            // return tags.filter((tag: string) => valueArr.includes(tag)).length
        })
        : filteredSpots;
}