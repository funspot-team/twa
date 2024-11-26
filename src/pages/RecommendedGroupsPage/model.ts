/* eslint-disable @typescript-eslint/no-explicit-any */
import { createEffect, createStore } from "effector";

export const fetchRecommendedFx = createEffect(async (city: string) => {
    const response = await fetch('https://funspot.ru/recommended/?cityId=' + city);
  
    if (!response.ok) {
      throw new Error('Failed to fetch recommended');
    }
  
    try {
      return await response.json();
    } catch (error) {
      throw new Error('Failed to parse JSON response');
    }
  });
  
export const $recommended = createStore([])
  .on(fetchRecommendedFx.doneData, (_, result) => {
    if (!result?.data) return [];
    return result.data
      .map((item: any) => ({
          ...item,
          spots: item.spots.split(','),
      }));
  });