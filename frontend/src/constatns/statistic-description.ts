type DescriptionType = {
	trash: string[];
	garbage: string[];
	problem: string[];
};

export const StatisticDescription: DescriptionType = {
	trash: ['Вывезено', 'Есть проблемы', 'Не вывезено'],
	garbage: ['Ликвидировано', 'Не ликвидировано'],
	problem: ['Решено', 'Не решено'],
};
