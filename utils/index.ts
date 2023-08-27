/* 
Этот код скопирован из https://rapidapi.com/apininjas/api/cars-by-api-ninjas
const url = 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '81a6c9e4a6msh674dd8b3d4238f2p1d40cejsn24db3f11daf9',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
} 

*/

import { CarProps, FilterProps } from "@/types";

export async function fetchcars(filters: FilterProps) {
    const { manufacturer, year, model, limit, fuel } = filters;
    const headers = {
        'X-RapidAPI-Key': '81a6c9e4a6msh674dd8b3d4238f2p1d40cejsn24db3f11daf9',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }

    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`, {
        headers: headers,
    });

    const result = await response.json();

    return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Базовая стоимость аренды в сутки в долларах
    const mileageFactor = 0.1;  // Дополнительная плата за пройденную милю
    const ageFactor = 0.05;     // Дополнительная ставка за год эксплуатации транспортного средства
  
    // Рассчитайте дополнительный тариф на основе пробега и возраста
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    // Рассчитайте общую арендную ставку за сутки
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
  };

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL("https://cdn.imagin.studio/getimage");
    const { make, model, year } = car;

    url.searchParams.append('customer', 'hrjavascript-mastery');
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(" ")[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${ year }`);
    // url.searchParams.append('zoomLevel', zoomLevel);
    url.searchParams.append('angle', `${ angle }`);

    return `${url}`;
}

export const updateSearchParams = (type: string, value: string) => {
    // Получить текущие параметры поиска по URL-адресу
    const searchParams = new URLSearchParams(window.location.search);
  
    // Установить для указанного параметра поиска заданное значение
    searchParams.set(type, value);
  
    // Установить для указанного параметра поиска заданное значение
    const newPathname = `${ window.location.pathname }?${ searchParams.toString() }`;
  
    return newPathname;
};
  