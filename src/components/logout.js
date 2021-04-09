import React, { useState, useEffect } from 'react';
import {useCookies} from 'react-cookie';

export default function Logout() {
	
	const [token, setToken, removeToken] = useCookies(['token'])

	useEffect(() => {
		removeToken(['token'])
		
	});
	return window.location.href = '/'
}