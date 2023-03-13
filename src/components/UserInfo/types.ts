import { UserData } from "../../types";
import { InfoDetailProps } from "../UserInfoDetail/types";

export interface UserInfoProps {
    userData : UserData
    onSelectDetail: (data: string)=> void
}