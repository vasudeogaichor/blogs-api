import { Request, Response, NextFunction } from "express";

function extractUrlPath(requestUrl: string) {
    const match = requestUrl.match(/^\/(\w+)/);
    
    if (match) {
        return match[1];
    } else {
        return null;
    }
}

async function verifyCrieria(query: any) {
    // Verify if the query params satisfy the pre-defined types for list criteria
}

async function getCriteriaFormat(path: string) {

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
        console.log('req - ', req)
        console.log('req.url - ', req.url)
        const apiService = extractUrlPath(req.url)
        console.log('apiService - ', apiService)
        switch (req.method) {
            case 'GET':
                // TODO - add validation and parsing logic
        }
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid JSON data' });
    }
};

