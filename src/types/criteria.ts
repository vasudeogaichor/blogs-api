export type Criteria = {
    [key: string]: {
      type: any; // Change 'any' to the appropriate type
      description: string;
    } | Array<{ type: any; description: string }>;
  };