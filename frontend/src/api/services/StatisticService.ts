/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StatisticData } from '../models/StatisticData';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StatisticService {
	/**
	 * Get Statistic
	 * @param requestBody
	 * @returns any Successful Response
	 * @throws ApiError
	 */
	public static getStatisticStatisticContainerPost(
		requestBody: StatisticData,
	): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/statistic/container',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}
	/**
	 * Get Statistic
	 * @param requestBody
	 * @returns any Successful Response
	 * @throws ApiError
	 */
	public static getStatisticStatisticSolvePost(
		requestBody: StatisticData,
	): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/statistic/solve',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}
	/**
	 * Get Statistic
	 * @returns any Successful Response
	 * @throws ApiError
	 */
	public static getStatisticStatisticTrashPost(): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/statistic/trash',
		});
	}
}
