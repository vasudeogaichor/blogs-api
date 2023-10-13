import { Request, Response, NextFunction } from "express";

export async function validateRequest(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Add your request data validation and parsing logic here
    // Example: parsing JSON data from the request body
    try {
        console.log('req - ', req);
        // TODO - add validation and parsing logic
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid JSON data' });
    }
};