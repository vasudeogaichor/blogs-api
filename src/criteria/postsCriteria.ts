import { Criteria } from "../types/criteria";

const postsCriteria: Criteria = {
    id: [
        {
            type: Number,
            description: "Id of the post",
        },
    ],
    query: {
        type: String,
        description: "Match query for title and description",
    },
};

export default postsCriteria;
