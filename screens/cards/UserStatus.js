import React, { useContext } from 'react';
import WelcomeScreen1 from '../onboarding/Welcome1';
import MainCardsScreen from './MainCards';
import { UserContext } from '../../contexts/UserContext';

export default function UserStatusScreen({ navigation }) {
	const { isOnboarded } = useContext(UserContext);

	if(isOnboarded) {
		return(<MainCardsScreen navigation={ navigation } />);
	}

	return(<WelcomeScreen1 navigation={ navigation } />);
}
