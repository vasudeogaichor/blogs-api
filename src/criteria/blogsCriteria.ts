import { Criteria } from "../types/criteria";

const blogsCriteria: Criteria = {
    page: {
        type: Number,
        description: "Current page in results",
        default: 1,
    },
    limit: {
        type: Number,
        description: "Limit the no. of rows being returned",
        default: 10,
    },
    id: [
        {
            type: Number,
            description: "Id of the blog",
        },
    ],
    query: {
        type: String,
        description: "Match query for title and description",
    },
};

export default blogsCriteria;
