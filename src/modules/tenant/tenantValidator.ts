import { body, param } from "express-validator";

export const addTenantValidator = [
    body('name')
    .notEmpty().withMessage('Tenant name is required.')
    .isString().withMessage('Tenant name must be a string.')
    .isLength({ min: 3 }).withMessage('Tenant name must be at least 3 characters.')
];

export const updateTenantValidator = [
    body('name')
    .notEmpty().withMessage('Tenant name is required.')
    .isString().withMessage('Tenant name must be a string.')
    .isLength({ min: 3 }).withMessage('Tenant name must be at least 3 characters.'),
    param('id')
        .isUUID().withMessage('Invalid ID format. ID must be a valid UUID.')
];

export const getTenantByIdValidator = [
    param('id')
        .isUUID().withMessage('Invalid ID format. ID must be a valid UUID.')
];

export const deleteTenantValidator = [
    param('id')
    .isUUID().withMessage('Invalid ID format. ID must be a valid UUID.')
];