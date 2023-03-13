import { UserData } from "../../types"

export interface InfoDetailProps {
    username: string
    type: string
    onSelectUser : (data: UserData)=> void
}