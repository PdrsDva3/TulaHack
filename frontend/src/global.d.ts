import type * as YMaps from 'yandex-maps';

declare global {
	interface Window {
		ymaps: typeof YMaps;
	}
}
