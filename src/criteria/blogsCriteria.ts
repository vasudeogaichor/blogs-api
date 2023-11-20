import { Criteria } from "../types/criteria";

const blogsCriteria: Criteria = {
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
