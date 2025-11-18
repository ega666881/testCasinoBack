import { TowerSession } from "./schemas/tower.schema";


export interface ITowerUpdateData {
    userId?: string
    level?: number
    multiplier?: number
    isFinished?: boolean
    startedAt?: Date
}