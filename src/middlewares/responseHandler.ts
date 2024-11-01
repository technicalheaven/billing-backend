import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

interface ApiResponse {
  isSuccess: boolean;
  data?: any;
  message?: string;
  error?: any;
}

declare global {
  namespace Express {
    interface Response {
      success: (data: any, statusCode?: number, message?: string) => void;
      error: (error: any, statusCode?: number, message?: string) => void;
    }
  }
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}


export const responseHandler = (req: Request, res: Response, next: NextFunction) => {
  res.success = (data: any, statusCode: number = 200, message: string = 'Success') => {
    const response: ApiResponse = {
      isSuccess: true,
      data,
      message
    };
    res.status(statusCode).json(response);
  };

  res.error = (error: Error) => {

    // Default response properties
    let statusCode = 500;
    let message = 'Internal Server Errorr';

    // Handle Prisma-specific errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      statusCode = 400;
      message = `Database error: ${error.message}`;
    } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      statusCode = 500;
      message = 'An unknown database error occurred';
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      statusCode = 400;
      message = `Validation error: ${error.message}`;
    }

    // Handle custom AppError
    else if (error instanceof AppError) {
      statusCode = error.statusCode || 400;
      message = error.message || 'Application Error';
    }
    // Log stack trace if in development mode
    // if (process.env.NODE_ENV === 'development') {
    //   console.error('Error Stack:', error.stack);
    // }


    const response: ApiResponse = {
      isSuccess: false,
      error,
      message
    };
    res.status(statusCode).json(response);
  };

  next();
};
