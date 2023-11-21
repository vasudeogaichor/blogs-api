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

function parseField(key: string, query: { [key: string]: any }, expectedType: types.ExpectedType, res: any, currentlyParsing: string) {
  let value = query[key];

  if (value !== undefined) {
    switch (expectedType.name) {
      case 'Number':
        if (isNaN(value)) {
          res.status(400).json({ error: `${currentlyParsing} type is incorrect: ${expectedType.name} | value: ${value}` });
        }
        return parseInt(value, 10);

      case 'String':
        let parsedValue: string | null = null;
        if (value !== null && (typeof value !== 'string' || value.constructor !== String)) {
          if (['number', 'boolean'].includes(typeof value) || value instanceof Date) {
            value = String(value);
          } else {
            res.status(400).json({ error: `${currentlyParsing} type is incorrect: ${expectedType.name} | value: ${value}` });
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
        res.status(400).json({ error: `Unsupported ${currentlyParsing} type: ${expectedType.name}` });
        return null;
    }
  }
}

function parseResource(apiService: string, query: { [key: string]: any }, res: any) {
  const parsedResource: { [key: string]: any } = {};

  const resourceFormatObjectName: string = `${apiService}Resource`;
  const resource: types.Resource = (resources as any)[resourceFormatObjectName];

  for (const key in query) {
    if (key in resource) {
      const expectedType = resource[key].type;
      const parsedValue = parseField(key, query, expectedType, res, 'Resource');
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

  for (const criterion in criteria) {
    const declaration = criteria[criterion];
    let parsedValues: any[] | null = null;

    if (Array.isArray(declaration)) {
      const expectedType = declaration[0].type;

      parsedValues = query[criterion]?.split(",").map((ele: String) => {
        const obj = { [criterion]: ele };
        return parseField(criterion, obj, expectedType, res, "Criteria");
      });

      if (!parsedValues?.length && declaration[0].hasOwnProperty('default')) {
        const defaultValues = declaration[0].default
        parsedValues = defaultValues.map((ele: String) => parseField(criterion, { [criterion]: ele }, expectedType, res, "Criteria"));
      }

    } else {
      const expectedType = declaration.type;
      parsedValues = parseField(criterion, query, expectedType, res, 'Criteria');

      if (!parsedValues && declaration.hasOwnProperty('default')) {
        const defaultValues = declaration.default
        parsedValues = parseField(criterion, { [criterion]: defaultValues }, expectedType, res, 'Criteria');
      }

    }
    if (parsedValues !== null) {
      parsedQuery[criterion] = parsedValues;
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
        const parsedResourcePOST: { [key: string]: any } = parseResource(apiService!, req.body, res);
        req.body = parsedResourcePOST;
        break;

      case "PUT":
        const parsedResourcePUT: { [key: string]: any } = parseResource(apiService!, req.body, res);
        req.body = parsedResourcePUT;
        break;

      case "DELETE":
        break;
    }
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid JSON data" });
  }
}
