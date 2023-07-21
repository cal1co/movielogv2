export type User = {
  username: string;
  email: string;
  password: string;
}

export type UserLogin = {
  usernameOrEmail: string;
  password: string
}

export type UserData = {
  id: number,
  username: string
  display_name: string
  profile_image:string
  follow_data:
    {
      follower_count: number,
      following_count: number
    }
}