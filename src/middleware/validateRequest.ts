import { Request, Response, NextFunction } from "express";

function extractUrlPath(requestUrl: string) {
  const match = requestUrl.match(/^\/(\w+)/);

  if (match) {
    return match[1];
  }
}

async function parseCrieria(apiService: string, query: object) {
  // Verify if the query params satisfy the pre-defined types for list criteria
  console.log("");
}

async function getCriteriaFormat(path: string) {}

export async function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Add your request data validation and parsing logic here
  // Example: parsing JSON data from the request body
  try {
    // TODO - add validation and parsing logic
    console.log("method - ", req.method);
    console.log("req.url - ", req.url);
    const apiService: string | undefined = extractUrlPath(req.url);
    console.log("apiService - ", apiService);
    switch (req.method) {
      case "GET":
        // TODO - add validation and parsing logic
        const criteria: object | null = parseCrieria(apiService!, req.query);
        break;
      case "POST":
        break;
      case "PUT":
        break;
      case "DELETE":
        break;
    }
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid JSON data" });
  }
}
