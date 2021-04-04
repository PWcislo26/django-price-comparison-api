import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {useCookies} from 'react-cookie';

export default function SignUp() {
	const history = useHistory();
	const [token, setToken, removeToken] = useCookies(['token'])

	useEffect(() => {
		removeToken(['token'])
		
	});
	return window.location.href = '/'
}