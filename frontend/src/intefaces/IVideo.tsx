import IUser from "./IUser";

export default interface IVideo {
  id?: bigint;
  full_url?: string
  video_id?: string
  title?: string
  description?: string
  user_id?: number

  user?: IUser
}

