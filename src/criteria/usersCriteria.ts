import { Criteria } from "../types/criteria";

const usersCriteria: Criteria = {
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
            description: "Id of the user",
        },
    ],
    query: {
        type: String,
        description: "Match query for username, firstname and lastname",
    },
};

export default usersCriteria;
