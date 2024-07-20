import { Timestamp } from "firebase/firestore"
import { Foundation } from "./Foundation"

export interface Campaign {
    id: string
    name: string
    description: string
    initDate: string
    endDate: string
    isCause: boolean
    isExperience: boolean
    cumulativeAmount: number
    requestAmount: number
    multimedia: MultimediaCampaign[]
    status?: boolean
    donorsCount?: number
    foundation: Foundation,
    createdAt: Timestamp
}


interface MultimediaCampaign {
    description: string
    url: string
    isCover: boolean
}