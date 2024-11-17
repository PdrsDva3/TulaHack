/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReportPeriod } from '../models/ReportPeriod';
import type { ReportToday } from '../models/ReportToday';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReportService {
	/**
	 * Get Today
	 * @param requestBody
	 * @returns any Successful Response
	 * @throws ApiError
	 */
	public static getTodayReportTodayPost(
		requestBody: ReportToday,
	): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/report/today',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}
	/**
	 * Get Period
	 * @param requestBody
	 * @returns any Successful Response
	 * @throws ApiError
	 */
	public static getPeriodReportPeriodPost(
		requestBody: ReportPeriod,
	): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/report/period',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}
}
