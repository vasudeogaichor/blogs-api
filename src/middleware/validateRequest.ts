import { Request, Response, NextFunction } from "express";
import * as criterias from "../criteria";
import * as resources from "../resources";
import * as types from "../types"

function extractUrlPath(requestUrl: string) {
  const match = requestUrl.match(/^\/(\w+)/);

  if (match) {
    return match[1];
  }
}

function parseField(key: string, query: { [key: string]: any }, expectedType: types.ExpectedType, res: any) {
  let value = query[key];

  switch (expectedType.name) {
    case 'Number':
      if (isNaN(value)) {
        res.status(400).json({ error: `Resource type is incorrect: ${expectedType.name} | value: ${value}` });
      }
      return parseInt(value, 10);

    case 'String':
      let parsedValue: string | null = null;
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
      return parsedValue;

    case 'Boolean':
    case 'Date':
      return value;

    default:
      res.status(400).json({ error: `Unsupported Resource type: ${expectedType.name}` });
      return null;
  }
}

function parseResource(apiService: string, query: { [key: string]: any }, res: any) {
  const parsedResource: { [key: string]: any } = {};

  const resourceFormatObjectName: string = `${apiService}Resource`;
  const resource: types.Resource = (resources as any)[resourceFormatObjectName];

  for (const key in query) {
    if (key in resource) {
      const expectedType = resource[key].type;
      const parsedValue = parseField(key, query, expectedType, res);
      if (parsedValue !== null) {
        parsedResource[key] = parsedValue;
      }
    } else {
      res.status(400).json({ error: `Invalid resource - ${key}` });
    }
  }
  return parsedResource;
}

function parseCrieria(apiService: string, query: { [key: string]: any }, res: any) {
  const parsedQuery: { [key: string]: any } = {};

  const criteriaFormatObjectName: string = `${apiService}Criteria`;
  const criteria: types.Criteria = (criterias as any)[criteriaFormatObjectName];

  for (const key in query) {
    if (key in criteria) {
      const expectedType = criteria[key].type;
      const parsedValue = parseField(key, query, expectedType, res);
      if (parsedValue !== null) {
        parsedQuery[key] = parsedValue;
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
