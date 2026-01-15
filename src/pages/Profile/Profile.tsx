import { useUserInfoQuery } from '@/redux/features/auth/auth.api';
import React from 'react'

const Profile = () => {
    const { data: user } = useUserInfoQuery(undefined);
    const userData = user?.data?.data;
    console.log("profile page userdata ------>", userData);
  return (
    <div>Profile</div>
  )
}

export default Profile