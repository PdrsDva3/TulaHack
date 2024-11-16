import React, { useEffect, useRef } from "react";
import { loadYMaps } from "../../utils";

interface YandexMapProps {
	center: [number, number];
	zoom: number;
}

export const YandexMap: React.FC<YandexMapProps> = ({ center, zoom }) => {
	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstance = useRef<ymaps.Map | null>(null); // Ссылка на инстанс карты

	useEffect(() => {
		let isMounted = true; // Флаг для предотвращения действий после размонтирования

		(async () => {
			try {
				// Загружаем API Яндекс.Карт
				const ymaps = await loadYMaps(import.meta.env.VITE_YANDEX_API_KEY);

				// Проверяем корректность загрузки API
				if (!ymaps || !ymaps.Map) {
					throw new Error("Yandex Maps API не загружен корректно.");
				}

				// Проверяем корректность координат
				if (!Array.isArray(center) || center.length !== 2 || typeof center[0] !== "number" || typeof center[1] !== "number") {
					throw new Error("Некорректный формат координат. Ожидается массив вида [широта, долгота].");
				}

				// Создаем карту только если контейнер существует и компонент не размонтирован
				if (mapRef.current && isMounted && !mapInstance.current) {
					mapInstance.current = new ymaps.Map(mapRef.current, {
						center,
						zoom,
					});

					console.log("Карта успешно создана.", { center, zoom });
				}
			} catch (error) {
				console.error("Ошибка загрузки карты:", error);
			}
		})();

		return () => {
			// Устанавливаем флаг размонтирования
			isMounted = false;

			// Уничтожаем инстанс карты
			if (mapInstance.current) {
				mapInstance.current.destroy();
				mapInstance.current = null;
			}
		};
	}, [center, zoom]);

	return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};
