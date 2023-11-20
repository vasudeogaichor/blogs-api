import { Resource } from "../types/resources";

const blogsResource: Resource = {
    id: {
        type: Number,
        description: 'Id of the blog'
    },
    title: {
        type: String,
        description: 'Title of the blog'
    },
    content: {
        type: String,
        description: 'Content of the blog'
    },
    createdAt: {
        type: Date,
        description: 'Time at which the blog was created'
    },
    updatedAt: {
        type: Date,
        description: 'Time at which the blog was updated'
    }
};

export default blogsResource;