import { Document } from 'mongoose'

export interface User extends Document {
    _id?: string
    email: string
    firstname: string
    lastname: string
}
