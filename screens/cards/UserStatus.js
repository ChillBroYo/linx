import React from 'react';
import ProfileScreen from '../onboarding/Profile';
import MainCardsScreen from './MainCards';
import { useUserContext } from '../../contexts/UserContext';

export default function UserStatusScreen({ navigation }) {
	const { state: { isOnboarded } } = useUserContext();

	if(isOnboarded) {
		return(<MainCardsScreen navigation={ navigation } />);
	}

	return(<ProfileScreen navigation={ navigation } />);
}
