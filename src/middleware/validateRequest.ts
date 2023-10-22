import { Request, Response, NextFunction } from "express";
import * as criterias from "../criterias";

function extractUrlPath(requestUrl: string) {
  const match = requestUrl.match(/^\/(\w+)/);

  if (match) {
    return match[1];
  }
}

// Verify if the query params satisfy the pre-defined types for list criteria
async function parseCrieria(apiService: string, query: object) {
  const parsedQuery: object = {};

  // get pre-defined types for criteria fields
  const criteriaFormatObjectName: string = `${apiService}Criteria`;
  console.log("query - ", query);

  const criteria: object = (criterias as any)[criteriaFormatObjectName];
  console.log("criteria - ", criteria);

  for (const key in query) {
    console.log("key - ", key);
    if (key in criteria) {
      const expectedType = criteria[key].type;
      const value = data[key];
      if (value instanceof expectedType) {
        console.log(`Key "${key}" has the expected type.`);
      } else {
        console.log(`Key "${key}" does not have the expected type.`);
        return false; // Or you can store failed keys in an array or perform other error handling.
      }
    } else {
      res.status(400).json({ error: `Invalid criteria - ${key}` });
    }
    return parsedQuery;
  }
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
    console.log("method - ", req.method);
    console.log("req.url - ", req.url);
    const apiService: string | undefined = extractUrlPath(req.url);
    console.log("apiService - ", apiService);
    switch (req.method) {
      case "GET":
        // TODO - add validation and parsing logic
        const criteria: object | null = parseCrieria(apiService!, req.query);
        console.log("criteria - ", criteria);
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
