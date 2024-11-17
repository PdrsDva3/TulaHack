export const formatDate = (dateString: string): string => {
	const date = new Date(dateString); // Преобразуем строку в объект Date

	// Форматируем компоненты даты
	const day = String(date.getDate()).padStart(2, '0'); // Делаем день двузначным
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяц начинается с 0, поэтому прибавляем 1
	const year = date.getFullYear(); // Год

	// Форматируем компоненты времени
	const hours = String(date.getHours()).padStart(2, '0'); // Часы
	const minutes = String(date.getMinutes()).padStart(2, '0'); // Минуты

	// Возвращаем отформатированную строку
	return `${day}.${month}.${year} ${hours}:${minutes}`;
};
