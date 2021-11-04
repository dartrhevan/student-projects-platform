import React, {useEffect, useState} from 'react';
import UserProfileComponent from "../components/elements/UserProfileComponent";
import {getCurrentUserProfile} from "../api/auth";
import UserProfile from "../model/UserProfile";

export default function UserProfilePage() {
    const [user, setUser] = useState(undefined as UserProfile | undefined);
    useEffect(() => {getCurrentUserProfile().then(r => setUser(r.data)).catch(console.log);}, []);
    return (<UserProfileComponent title='Ваш профиль' user={user} />);
}
