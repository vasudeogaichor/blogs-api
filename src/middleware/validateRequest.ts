import { Request, Response, NextFunction } from "express";

async function verifyCrieria(query: any) {
    // Verify if the query params satisfy the pre-defined types for list criteria
}

export async function validateRequest(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Add your request data validation and parsing logic here
    // Example: parsing JSON data from the request body
    try {
        // TODO - add validation and parsing logic
        console.log('req - ', req.query)
        switch (req.url) {
            case '/posts':
                await verifyCrieria(req.query)
                break;
        }
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid JSON data' });
    }
};

