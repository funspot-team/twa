/* eslint-disable @typescript-eslint/no-explicit-any */
import { MultiselectOption } from "@telegram-apps/telegram-ui/dist/components/Form/Multiselect/types";

export const getSpotsByFilters = (data: any, filters: MultiselectOption[]) => {
    const valueArr = filters.map(({ value }) => value);
    return filters.length
        ? data.filter(({ tags }: any) => {
            // return tags.filter((tag: string) => valueArr.includes(tag)).length === filters.length
            return tags.filter((tag: string) => valueArr.includes(tag)).length
        })
        : data;
}