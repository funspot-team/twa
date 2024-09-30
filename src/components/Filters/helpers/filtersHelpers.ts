/* eslint-disable @typescript-eslint/no-explicit-any */
import { MultiselectOption } from "@telegram-apps/telegram-ui/dist/components/Form/Multiselect/types";

export const getSpotsByFilters = (data: any, filters: MultiselectOption[], withChildren: boolean, price: number, searchStr?: string) => {
    const valueArr = filters.map(({ value }) => value);
    
    let filteredSpots = data.filter(({ minPrice }: any) => {
        return minPrice <= price;
    });

    if (withChildren) {
        filteredSpots = filteredSpots.filter(({ minAge }: any) => {
            return minAge < 18;
        });
    }

    let result = filters.length
        ? filteredSpots.filter(({ tags }: any) => {
            return tags.filter((tag: string) => valueArr.includes(tag)).length === filters.length
            // return tags.filter((tag: string) => valueArr.includes(tag)).length
        })
        : filteredSpots;

    if (searchStr) {
        result = result.filter(({ name, search }: any) => {
            const str = searchStr.toLowerCase();
            return name.toLowerCase().includes(str) || search.toLowerCase().includes(str);
        });
    }

    return result;
}