/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CatalogItem } from '@/components/CatalogItem/CatalogItem';
import { FC, useCallback, useEffect, useState } from 'react';
import { shuffleArray } from '../helpers/mainPageHelpers';

export interface IInfiniteScrollSpotsProps {
  spots: any;
}
export const InfiniteScrollSpots: FC<IInfiniteScrollSpotsProps> = ({ spots }) => {
  // Сразу перемешиваем список при первом рендере
  const [shuffledItems] = useState(shuffleArray(spots));
  const [displayedItems, setDisplayedItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Функция для загрузки следующих 5 элементов
  const loadMoreItems = useCallback(() => {
    const newItems = shuffledItems.slice(currentIndex, currentIndex + 50);
    // @ts-ignore
    setDisplayedItems((prevItems: any) => [...prevItems, ...newItems]);
    setCurrentIndex(prevIndex => prevIndex + 50);
  }, [shuffledItems, currentIndex]);

  // Настройка обработчика скролла
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        loadMoreItems();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreItems]);

  // Загрузка первых элементов при инициализации
  useEffect(() => {
    loadMoreItems();
  }, []);


  return displayedItems.map((spot: any) => {
    return (
      <CatalogItem
        key={spot.id}
        spot={spot}
        isLarge
      />
    );
  });
}

// const InfiniteScrollComponent2: FC<IInfiniteScrollComponentProps> = ({ spots }) => {
//   const [shuffledItems] = useState(() => shuffleArray(spots));
//   const [displayedItems, setDisplayedItems] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const observerRef = useRef(null);

//   const loadMoreItems = useCallback(() => {
//     const newItems = shuffledItems.slice(currentIndex, currentIndex + 5);
//     // @ts-ignore
//     setDisplayedItems(prevItems => [...prevItems, ...newItems]);
//     setCurrentIndex(prevIndex => prevIndex + 5);
//   }, [shuffledItems, currentIndex]);

//   useEffect(() => {
//     loadMoreItems();
//   }, []);

//   useEffect(() => {
//     // Проверяем поддержку IntersectionObserver и инициализируем
//     if (!observerRef.current && typeof IntersectionObserver !== "undefined") {
//       // @ts-ignore
//       observerRef.current = new IntersectionObserver(entries => {
//         if (entries[0].isIntersecting) {
//           loadMoreItems();
//         }
//       },
//       {
//         root: null, // Следим за viewport
//         rootMargin: '200px', // Подгружаем заранее, за 200px до триггера
//         threshold: 0 // Запуск, когда элемент появляется хотя бы на 1 пиксель
//       });
//     }
//     // Очищаем observer при размонтировании компонента
//     return () => {
//       if (observerRef.current) {
//         // @ts-ignore
//         observerRef.current.disconnect();
//       }
//     };
//   }, [loadMoreItems]);
  
//   // Реф для "триггерного" элемента
//   // @ts-ignore
//   const triggerRef = useCallback(node => {
//     if (observerRef.current) {
//       // @ts-ignore
//       observerRef.current.disconnect(); // Очищаем предыдущий observer, если есть
//       // @ts-ignore
//       if (node) observerRef.current.observe(node); // Проверяем наличие node перед вызовом observe
//     }
//   }, []);

//   return (
//     <div>
//       {displayedItems.map((spot: any) => {
//         return (
//           <CatalogItem
//             key={spot.id}
//             spot={spot}
//             isLarge
//           />
//         );
//       })}

//       {/* Элемент для отслеживания, когда он попадет в область видимости */}
//       <div ref={triggerRef} style={{ height: '3px', backgroundColor: 'red' }}></div>
//     </div>
//   );
// }
