import { Document } from 'mongoose'
import { User } from 'src/users/interfaces/user.interface'

export interface Item extends Document {
    id?: string
    name: string
    description?: string
    qty: number
    owner: User
}
