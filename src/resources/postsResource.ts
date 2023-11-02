import { Resource } from "../types/resource";

const postsResource: Resource = {
    id: {
        type: Number,
        description: 'Id of the post'
    },
    title: {
        type: String,
        description: 'Title of the post'
    },
    content: {
        type: String,
        description: 'Content of the post'
    },
    createdAt: {
        type: Date,
        description: 'Time at which the post was created'
    },
    updatedAt: {
        type: Date,
        description: 'Time at which the post was updated'
    }
};

export default postsResource;