import { body, param } from "express-validator";

export const addRoleValidator = [
    body('tenantId')
    .notEmpty().withMessage('Tenant ID is required.')
    .isUUID().withMessage('Tenant ID must be a valid UUID.'),

    body('name')
    .notEmpty().withMessage('Role name is required.')
    .isString().withMessage('Role name must be a string.')
    .isLength({ min: 3 }).withMessage('Role name must be at least 3 characters.')

];

export const updateRoleValidator = [
    body('name')
    .notEmpty().withMessage('Role name is required.')
    .isString().withMessage('Role name must be a string.')
    .isLength({ min: 3 }).withMessage('Role name must be at least 3 characters.'),
    param('id')
        .isUUID().withMessage('Invalid ID format. ID must be a valid UUID.')
];

export const getRoleByIdValidator = [
    param('id')
        .isUUID().withMessage('Invalid ID format. ID must be a valid UUID.')
];

export const deleteRoleValidator = [
    param('id')
    .isUUID().withMessage('Invalid ID format. ID must be a valid UUID.')
];