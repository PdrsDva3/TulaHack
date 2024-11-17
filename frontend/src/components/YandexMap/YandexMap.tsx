import React, { useEffect, useRef, useState } from 'react';
import { convertMarkerColor, loadYMaps } from '../../utils';
import { api } from '../../api/api.ts';
import { Marker, PointDetails, PointDetailsWithGarbage } from '../../constatns';

interface YandexMapProps {
	center: [number, number];
	zoom: number;
	apiEndpoint: string;
	onMarkerClick?: (pointDetails: PointDetailsWithGarbage) => void;
	onLoadingChange?: (isLoading: boolean) => void; // Новый проп для контроля состояния загрузки
}

export const YandexMap: React.FC<YandexMapProps> = ({
	center,
	zoom,
	apiEndpoint,
	onMarkerClick,
	onLoadingChange, // Получаем функцию управления состоянием загрузки
}) => {
	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstance = useRef<ymaps.Map | null>(null);
	const [points, setPoints] = useState<Marker[]>([]);
	const [garbage, setGarbage] = useState<Marker[]>([]);

	// Загрузка данных маркеров
	const fetchMarkers = async () => {
		try {
			const response = await api.get<{ points: Marker[]; garbage: Marker[] }>(
				apiEndpoint,
			);
			setPoints(response.data.points); // Сохраняем обычные точки
			setGarbage(response.data.garbage); // Сохраняем точки с мусором
		} catch (error) {
			console.error('Ошибка загрузки точек с бэкенда:', error);
		}
	};

	// Загрузка подробностей точки
	const fetchPointDetails = async (id: number, isGarbage: boolean) => {
		try {
			onLoadingChange?.(true);

			const response = await api.get<PointDetails>(`/point/${id}`);
			onMarkerClick?.({ ...response.data, isGarbage });

			onLoadingChange?.(false);
		} catch (error) {
			console.error('Ошибка загрузки данных точки:', error);
			onLoadingChange?.(false);
		}
	};

	useEffect(() => {
		fetchMarkers();
	}, [apiEndpoint]);

	useEffect(() => {
		let isMounted = true;

		(async () => {
			try {
				const ymaps = await loadYMaps(import.meta.env.VITE_YANDEX_API_KEY);

				if (!ymaps || !ymaps.Map) {
					throw new Error('Yandex Maps API не загружен корректно.');
				}

				if (mapRef.current && isMounted && !mapInstance.current) {
					mapInstance.current = new ymaps.Map(mapRef.current, {
						center,
						zoom,
					});

					console.log('Карта успешно создана.');
				}

				if (mapInstance.current) {
					// Добавляем маркеры для обычных точек
					points.forEach((marker) => {
						const placemark = new ymaps.Placemark(
							[parseFloat(marker.lat), parseFloat(marker.lon)],
							{
								balloonContent: `<strong>${marker.address}</strong>`,
							},
							{
								preset: 'islands#icon',
								iconColor: convertMarkerColor(marker.problems),
							},
						);

						placemark.events.add('click', () => fetchPointDetails(marker.id, false));
						mapInstance.current?.geoObjects.add(placemark);
					});

					// Добавляем маркеры для мусора (garbage)
					garbage.forEach((marker) => {
						const placemark = new ymaps.Placemark(
							[parseFloat(marker.lat), parseFloat(marker.lon)],
							{
								balloonContent: `<strong>${marker.address}</strong>`,
							},
							{
								preset: 'islands#icon',
								iconColor: '#0000FF', // Синий цвет для мусора
							},
						);

						placemark.events.add('click', () => fetchPointDetails(marker.id, true)); // Передаем true для мусорного маркера
						mapInstance.current?.geoObjects.add(placemark);
					});

					console.log('Маркеры успешно добавлены на карту.');
				}
			} catch (error) {
				console.error('Ошибка инициализации карты:', error);
			}
		})();

		return () => {
			isMounted = false;
			if (mapInstance.current) {
				mapInstance.current.destroy();
				mapInstance.current = null;
			}
		};
	}, [center, zoom, points, garbage]);

	return <div ref={mapRef} style={{ width: '100%', height: '70vh' }} />;
};
