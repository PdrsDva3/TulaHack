/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * Get User H
     * @param userId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getUserHUserUserIdGet(
        userId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/{user_id}',
            path: {
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create User H
     * @param email
     * @param password
     * @param name
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createUserHUserRegistrationPost(
        email: string,
        password: string,
        name: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/registration',
            query: {
                'email': email,
                'password': password,
                'name': name,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Login User H
     * @param email
     * @param password
     * @returns any Successful Response
     * @throws ApiError
     */
    public static loginUserHUserLoginPost(
        email: string,
        password: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/login',
            query: {
                'email': email,
                'password': password,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
