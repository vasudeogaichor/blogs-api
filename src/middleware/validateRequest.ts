import { Request, Response, NextFunction } from "express";
import * as criterias from "../criteria";
import { Criteria } from "../types/criteria";
import { validationResult, body, check } from 'express-validator';

const bodyValidationRules = [
  body('field1').notEmpty().isString(),
  body('field2').isInt(),
  // Add more validation rules as needed for your specific fields.
];

function extractUrlPath(requestUrl: string) {
  const match = requestUrl.match(/^\/(\w+)/);

  if (match) {
    return match[1];
  }
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
    return parsedQuery;
  }
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
        await Promise.all(bodyValidationRules.map(validationRule => validationRule.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        
        // TODO: Add parsing logic for request body
        // For example, you can access the validated fields using req.body
        const field1 = req.body.field1;
        const field2 = req.body.field2;
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
