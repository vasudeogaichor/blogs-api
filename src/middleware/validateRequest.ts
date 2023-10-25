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
function parseCrieria(apiService: string, query: { [key: string]: any }, res: any) {
  const parsedQuery= new Map<string, any>();

  // get pre-defined types for criteria fields
  const criteriaFormatObjectName: string = `${apiService}Criteria`;

  const criteria: Criteria = (criterias as any)[criteriaFormatObjectName];

  for (const key in query) {
    if (key in criteria) {
      const expectedType = criteria[key].type;
      let value = query[key];
      switch (expectedType.name) {
        case 'Number':
          if (isNaN(value)) {
            res.status(400).json({ error: `Criteria type is incorrect: ${expectedType.name} | value: ${value}` });
          }
          parsedQuery.set(key, parseInt(value, 10));
          break;

        case 'String':
          let parsedValue;
          if (value !== null && (typeof value !== 'string' || value.constructor !== String)) {
            if (['number', 'boolean'].includes(typeof value) || value instanceof Date) {
              value = String(value);
              
            } else {
              res.status(400).json({ error: `Criteria type is incorrect: ${expectedType.name} | value: ${value}` });
            }
          }

          if (value && typeof value ==='string') {
            parsedValue = value.trim();
          }
          parsedQuery.set(key, parsedValue);
          break;

        default:
          res.status(400).json({ error: `Unsupported criteria type: ${expectedType.name}` });
          break;
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
    const apiService: string | undefined = extractUrlPath(req.url);
    switch (req.method) {
      case "GET":
        // TODO - add validation and parsing logic
        const criteria: Map<string, any> | any = parseCrieria(apiService!, req.query, res);
        req.query = criteria;
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
