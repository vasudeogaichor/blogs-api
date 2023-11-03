import { Request, Response, NextFunction } from "express";
import * as criterias from "../criteria";
import * as resources from "../resources";
import { Criteria } from "../types/criteria";
import { Resource } from "../types/resources";

function extractUrlPath(requestUrl: string) {
  const match = requestUrl.match(/^\/(\w+)/);

  if (match) {
    return match[1];
  }
}

function parseResource(apiService: string, query: { [key: string]: any }, res: any) {
  const parsedResource: { [key: string]: any } = {};

  const resourceFormatObjectName: string = `${apiService}Resource`;

  const resource: Resource = (resources as any)[resourceFormatObjectName];
  for (const key in query) {
    if (key in resource) {
      const expectedType = resource[key].type;
      let value = query[key];
      
      switch (expectedType.name) {
        case 'Number':
          if (isNaN(value)) {
            res.status(400).json({ error: `Resource type is incorrect: ${expectedType.name} | value: ${value}` });
          }
          parsedResource[key] = parseInt(value, 10);
          break;

        case 'String':
          let parsedValue;
          if (value !== null && (typeof value !== 'string' || value.constructor !== String)) {
            if (['number', 'boolean'].includes(typeof value) || value instanceof Date) {
              value = String(value);

            } else {
              res.status(400).json({ error: `Resource type is incorrect: ${expectedType.name} | value: ${value}` });
            }
          }

          if (value && typeof value === 'string') {
            parsedValue = value.trim();
          }
          parsedResource[key] = parsedValue;
          break;

        case 'Boolean':
          return value

        case 'Date':
          return value

        default:
          res.status(400).json({ error: `Unsupported Resource type: ${expectedType.name}` });
          break;
      }
    } else {
      res.status(400).json({ error: `Invalid resource - ${key}` });
    }
  }
  return parsedResource;
}

// Verify if the query params satisfy the pre-defined types for list criteria
function parseCrieria(apiService: string, query: { [key: string]: any }, res: any) {
  const parsedQuery: { [key: string]: any } = {};

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
          parsedQuery[key] = parseInt(value, 10);
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

          if (value && typeof value === 'string') {
            parsedValue = value.trim();
          }
          parsedQuery[key] = parsedValue;
          break;

        case 'Boolean':
          return value

        case 'Date':
          return value

        default:
          res.status(400).json({ error: `Unsupported criteria type: ${expectedType.name}` });
          break;
      }
    } else {
      res.status(400).json({ error: `Invalid criteria - ${key}` });
    }
  }
  return parsedQuery;
}

export async function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {

  try {

    const apiService: string | undefined = extractUrlPath(req.url);

    switch (req.method) {
      case "GET":
        const criteria: { [key: string]: any } = parseCrieria(apiService!, req.query, res);
        req.query = criteria;
        break;

      case "POST":
        // Add body validation
        const parsedResource: { [key: string]: any } = parseResource(apiService!, req.body, res);
        req.body = parsedResource;
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
