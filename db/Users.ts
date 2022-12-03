import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://127.0.0.1:27017');

declare global {
    namespace Express {
        interface User extends UserType { }
    }
}

interface User {
    username: string,
    hash: string,
    salt: string,
    admin: boolean
}

export interface UserType extends User {
    _id: string
}

const User = {
    findOne: async (query:Partial<UserType>) => {
        await client.connect();
        const result = await client.db('test').collection<UserType>('users').findOne(query);
        return result;
    },
    create: async (newUser:User) => {
        await client.connect();
        const result = await client.db('test').collection<User>('users').insertOne(newUser);
        return result;
    }
}

export default User;
