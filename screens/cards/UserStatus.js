import React, { useContext } from 'react';
import ProfileScreen from '../onboarding/Profile';
import MainCardsScreen from './MainCards';
import { UserContext } from '../../contexts/UserContext';

export default function UserStatusScreen({ navigation }) {
	const { isOnboarded } = useContext(UserContext);

	if(isOnboarded) {
		return(<MainCardsScreen navigation={ navigation } />);
	}

	return(<ProfileScreen navigation={ navigation } />);
}
