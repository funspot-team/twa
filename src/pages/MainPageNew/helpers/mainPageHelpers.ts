/* eslint-disable @typescript-eslint/no-explicit-any */
export const shuffleArray = (array: unknown[]) => {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const getSpotsByTag = (spots: any, tag: string) => {
  const filteredSpots = tag
      ? spots.filter((spot: any) => spot.tags.includes(tag))
      : spots;
    
  return filteredSpots;
}

export const getCountSpotsInCategory = (spots: any, tag: string) => {
  const filteredSpots = getSpotsByTag(spots, tag);

  return filteredSpots.length;
}

export const getTwoRandomCollections = (arr: any) => {
    if (arr.length < 2) {
      return [];
    }
  
    const firstIndex = Math.floor(Math.random() * arr.length);

    let secondIndex;
  
    do {
      secondIndex = Math.floor(Math.random() * arr.length);
    } while (secondIndex === firstIndex);
  
    return [arr[firstIndex], arr[secondIndex]];
};

export const getSpotByDayOfWeekAndSearch = (spots: any, search: string) => {
    const filteredSpots = spots.filter((spot: any) => spot.search.includes(search));
    
    if (filteredSpots.length === 0) return null;

    const dayOfWeek = new Date().getDay();

    const index = dayOfWeek % filteredSpots.length;

    return filteredSpots[index];
};

export const getSpotByDayOfWeekAndTag = (spots: any, tag: string) => {
    const filteredSpots = getSpotsByTag(spots, tag);
    
    if (filteredSpots.length === 0) return null;

    const dayOfWeek = new Date().getDay();

    const divisionFactor = Math.floor(filteredSpots.length / 7) || 1;
    const adjustedIndex = (dayOfWeek * divisionFactor) % filteredSpots.length;

    return filteredSpots[adjustedIndex];
};

export const getDataForBlocks = (spots: any) => {
  if (!spots || !spots.length) return {};
  // food
  const food = {
    id: 'food',
    title: 'Где поесть',
    mainImg: getSpotByDayOfWeekAndTag(spots, 'еда')?.mainImg,
    description: 'Свидание или встреча с друзьями',
    filters: [{
      value: 'еда',
      label: 'Еда',
    }]
  };
  
  // active
  const active = {
    id: 'active',
    title: 'Активный отдых',
    mainImg: getSpotByDayOfWeekAndTag(spots, 'активно')?.mainImg,
    description: 'Проведем время активно',
    filters: [{
      value: 'активно',
      label: 'Активно',
    }]
  };

  // hotels
  const hotels = {
    id: 'hotels',
    title: 'Базы и глемпинги',
    mainImg: getSpotByDayOfWeekAndTag(spots, 'жилье')?.mainImg,
    description: 'Яркие выходные с ночёвкой',
    filters: [{
      value: 'жилье',
      label: 'Жилье',
    }]
  };

  // nature
  const nature = {
    id: 'nature',
    title: 'Музеи и природа',
    mainImg: getSpotByDayOfWeekAndTag(spots, 'прогулка')?.mainImg,
    description: 'Места для спокойного отдыха',
    filters: [{
      value: 'прогулка',
      label: 'Прогулка',
    }]
  };

  // events
  const events = {
    id: 'events',
    title: 'События и выставки', // Не пропустите
    mainImg: getSpotByDayOfWeekAndTag(spots, 'события')?.mainImg,
    description: 'События, выставки и кино',
    filters: [{
      value: 'события',
      label: 'События',
    }]
  };

  // bad weather
  const weather = {
    id: 'weather',
    title: 'Плохая погода',
    mainImg: getSpotByDayOfWeekAndTag(spots, 'плохая погода')?.mainImg,
    description: 'Идеи для плохой погоды',
    filters: [{
      value: 'плохая погода',
      label: 'Плохая погода',
    }]
  };

  return {
    food,
    hotels,
    active,
    nature,
    events,
    weather,
  };
}

export const getDataForCategories = (spots: any) => {
  if (!spots || !spots.length) return {};

  const active = {
    id: 'active',
    title: 'Экстрим',
    mainImg: getSpotByDayOfWeekAndTag(spots, 'экстрим')?.mainImg,
    description: 'Проведем время экстремально',
    filters: [{
      value: 'экстрим',
      label: 'Экстрим',
    }],
    badge: getCountSpotsInCategory(spots, 'экстрим'),
  };

  const drive = {
    id: 'drive',
    title: 'Вождение',
    mainImg: getSpotByDayOfWeekAndTag(spots, 'вождение')?.mainImg,
    description: 'Дрифт, мотоциклы, квадро',
    filters: [{
      value: 'вождение',
      label: 'Вождение',
    }],
    badge: getCountSpotsInCategory(spots, 'вождение'),
  };

  const water = {
    id: 'water',
    title: 'Водное',
    mainImg: getSpotByDayOfWeekAndTag(spots, 'водное')?.mainImg,
    description: 'Серфинг, гидроцикл, вейк',
    filters: [{
      value: 'водное',
      label: 'Водное',
    }],
    badge: getCountSpotsInCategory(spots, 'водное'),
  };

  const fly = {
    id: 'fly',
    title: 'Полеты',
    mainImg: getSpotByDayOfWeekAndTag(spots, 'полеты')?.mainImg,
    description: 'Аэротруба, парашюты, самолеты',
    filters: [{
      value: 'полеты',
      label: 'Полеты',
    }],
    badge: getCountSpotsInCategory(spots, 'полеты'),
  };

  const sport = {
    id: 'sport',
    title: 'Спорт',
    mainImg: getSpotByDayOfWeekAndTag(spots, 'спорт')?.mainImg,
    description: 'Батуты, сквош, скейтборд',
    filters: [{
      value: 'спорт',
      label: 'Спорт',
    }],
    badge: getCountSpotsInCategory(spots, 'спорт'),
  };

  const master = {
    id: 'master',
    title: 'Мастер-класс',
    mainImg: getSpotByDayOfWeekAndTag(spots, 'мастер-класс')?.mainImg,
    description: 'Рисование, приготовление еды',
    filters: [{
      value: 'мастер-класс',
      label: 'Мастер-класс',
    }],
    badge: getCountSpotsInCategory(spots, 'мастер-класс'),
  };

  const animal = {
    id: 'animal',
    title: 'Животные',
    mainImg: getSpotByDayOfWeekAndTag(spots, 'животные')?.mainImg,
    description: 'Зоопарки, фермы, экопарки',
    filters: [{
      value: 'животные',
      label: 'Животные',
    }],
    badge: getCountSpotsInCategory(spots, 'животные'),
  };

  const hotels = {
    id: 'hotels',
    title: 'Жилье',
    mainImg: getSpotByDayOfWeekAndTag(spots, 'жилье')?.mainImg,
    description: 'Базы, глемпинги, гостиницы',
    filters: [{
      value: 'жилье',
      label: 'Жилье',
    }],
    badge: getCountSpotsInCategory(spots, 'жилье'),
  };

  return {
    active,
    drive,
    water,
    fly,
    sport,
    hotels,
    master,
    animal,
  };
}

export const getDataForCatalog = (spots: any) => {
  if (!spots || !spots.length) return {};

  const catalog = {
    id: 'catalog',
    title: 'Каталог',
    mainImg: '/twa/images/catalogue0.png',
    description: 'Посмотрите все предложения',
    filters: [],
    style: { transform: 'scale(1.5)' }
  };

  const map = {
    id: 'map',
    title: 'Карта',
    mainImg: '/twa/images/main-map-mini.jpeg',
    description: 'Искать места рядом с вами',
    filters: []
  };

  return {
    catalog,
    map,
  };
}