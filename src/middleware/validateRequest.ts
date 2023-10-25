import { Request, Response, NextFunction } from "express";
import * as criterias from "../criterias";
import { Criteria } from "../types/criteria";

function extractUrlPath(requestUrl: string) {
  const match = requestUrl.match(/^\/(\w+)/);

  if (match) {
    return match[1];
  }
}

// Verify if the query params satisfy the pre-defined types for list criteria
async function parseCrieria(apiService: string, query: { [key: string]: any }, res: any) {
  const parsedQuery: object = {};

  // get pre-defined types for criteria fields
  const criteriaFormatObjectName: string = `${apiService}Criteria`;
  console.log("query - ", query);

  const criteria: Criteria = (criterias as any)[criteriaFormatObjectName];
  console.log("criteria - ", criteria);

  for (const key in query) {
    console.log("key - ", key);
    if (key in criteria) {
      const expectedType = criteria[key].type;
      let value = query[key];
      console.log("type - ", expectedType)
      console.log("type.name - ", expectedType.name)
      switch (expectedType.name) {
        case 'Number':
          if (isNaN(value)) {
            res.status(400).json({ error: `Criteria type is incorrect: ${expectedType.name} | value: ${value}` });
          }
          return parseInt(value, 10);

        case 'String':
          if (value !== null && (typeof value !== 'string' || value.constructor !== String)) {
            if (['number', 'boolean'].includes(typeof value) || value instanceof Date) {
              const parsedValue = String(value);
            } else {
              res.status(400).json({ error: `Criteria type is incorrect: ${expectedType.name} | value: ${value}` });
            }
          }

          if (value && typeof value === 'string') {
            value = value.trim();
          }

          return value as string;
      }
      console.log('expectedType - ', expectedType)

      console.log('typeof value - ', typeof value)
      if (typeof value === expectedType) {
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
        const criteria: object | null = parseCrieria(apiService!, req.query, res);
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
