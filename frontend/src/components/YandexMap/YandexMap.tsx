import React, { useEffect, useRef } from "react";
import { loadYMaps } from "../../utils";

let mapInstance: ymaps.Map | null = null; // Строгая типизация для карты

const YandexMap: React.FC = () => {
	const mapRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		(async () => {
			try {
				// Загрузка API Яндекс.Карт
				const ymaps = await loadYMaps(import.meta.env.VITE_YANDEX_API_KEY);

				if (mapRef.current) {
					// Если карта уже создана, не создаем новую
					if (!mapInstance) {
						mapInstance = new ymaps.Map(mapRef.current, {
							center: [54.1921, 37.6156], // Координаты Тулы
							zoom: 11,
						});
					}
				}
			} catch (error) {
				console.error("Ошибка загрузки карты:", error);
			}
		})();

		// Очистка карты при размонтировании компонента
		return () => {
			if (mapInstance) {
				mapInstance.destroy(); // Уничтожить карту
				mapInstance = null;
			}
		};
	}, []);

	return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};

export default YandexMap;
