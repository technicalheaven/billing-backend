import { body, param } from "express-validator";

export const addUserValidator = [
    body('tenantId')
    .notEmpty().withMessage('Tenant ID is required.')
    .isUUID().withMessage('Tenant ID must be a valid UUID.'),

    body('name')
    .notEmpty().withMessage('User name is required.')
    .isString().withMessage('User name must be a string.')
    .isLength({ min: 3 }).withMessage('User name must be at least 3 characters.')

];

export const updateUserValidator = [
    body('name')
    .notEmpty().withMessage('User name is required.')
    .isString().withMessage('User name must be a string.')
    .isLength({ min: 3 }).withMessage('User name must be at least 3 characters.'),
    param('id')
        .isUUID().withMessage('Invalid ID format. ID must be a valid UUID.')
];

export const getUserByIdValidator = [
    param('id')
        .isUUID().withMessage('Invalid ID format. ID must be a valid UUID.')
];

export const deleteUserValidator = [
    param('id')
    .isUUID().withMessage('Invalid ID format. ID must be a valid UUID.')
];