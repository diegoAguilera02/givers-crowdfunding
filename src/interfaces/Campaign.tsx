import { Timestamp } from "firebase/firestore"

export interface Campaign {
    id?: string
    name: string
    description: string
    initDate: Date
    endDate: Date
    isCause: boolean
    isExperience: boolean
    cumulativeAmount?: number
    requestAmount: number
    multimedia?: any[]
    status?: boolean
    donorsCount?: number
    createdAt?: Timestamp
    category: string
    foundation: string
}