import { Resource } from "../types/resources";

const blogsResource: Resource = {
    id: {
        type: Number,
        description: 'Id of the user'
    },
    username: {
        type: String,
        description: 'Username of the user'
    },
    firstName: {
        type: String,
        description: 'First name of the user'
    },
    lastName: {
        type: String,
        description: 'Last name of the user'
    },
    email: {
        type: String,
        description: 'Email of the user'
    },
    password: {
        type: String,
        description: 'Password of the user'
    },
    createdAt: {
        type: Date,
        description: 'Time at which the user was created'
    },
    updatedAt: {
        type: Date,
        description: 'Time at which the user was updated'
    }
};

export default blogsResource;