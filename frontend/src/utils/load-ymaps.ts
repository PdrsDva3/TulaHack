let isScriptLoaded = false;
let ymapsLoadPromise: Promise<typeof window.ymaps> | null = null;

export const loadYMaps = async (apiKey: string): Promise<typeof window.ymaps> => {
	if (isScriptLoaded && ymapsLoadPromise) {
		return ymapsLoadPromise;
	}

	isScriptLoaded = true;
	ymapsLoadPromise = new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
		script.async = true;
		script.onload = () => {
			if (window.ymaps) {
				// Дождемся готовности API
				window.ymaps.ready(() => resolve(window.ymaps));
			} else {
				reject(new Error('Не удалось загрузить Yandex Maps API'));
			}
		};
		script.onerror = () => reject(new Error('Ошибка загрузки Yandex Maps API'));
		document.head.appendChild(script);
	});

	return ymapsLoadPromise;
};
