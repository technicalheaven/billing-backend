import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { AppError } from './responseHandler';

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.error(new AppError("Validation Failed.", 400, errors.array()));
        return;
    }
    next();
};

export default validateRequest;
