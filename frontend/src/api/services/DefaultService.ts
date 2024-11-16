/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PointData } from '../models/PointData';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Get All Points H
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getAllPointsHPointsAllGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/points/all',
        });
    }
    /**
     * Get Point Info
     * @param pointId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getPointInfoPointsPointIdGet(
        pointId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/points/{point_id}',
            path: {
                'point_id': pointId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Point
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createPointPointPost(
        requestBody: PointData,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/point',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
