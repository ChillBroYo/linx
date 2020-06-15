# Linx

Set up environment file:
------------------------

[Reference](https://alxmrtnz.com/thoughts/2019/03/12/environment-variables-and-workflow-in-expo.html)

* create environment.js in project root and copy the following:

```
const ENV = {
	dev: {
		apiUrl: 'http://<YOUR IP>:8080',
	},
	prod: {
		apiUrl: '<PRODUCTION ENDPOINT>',
	},
};

export function getEnvVars() {
	return __DEV__ ? ENV.dev : ENV.prod;
}
```

* replace dev url with your IP
* replace prod with production endpoint

* to use environment variables:

```
// in file where environment is required

import { getEnvVars } from '<path to root>/environment';
// do one of the following

// entire env
const env = getEnvVars();

// destructure env
const { apiUrl } = getEnvVars();

// with rename (example in SignIn screen)
const { apiUrl: API_ENDPOINT } = getEnvVars();
```


Using UserContext:
------------------

* UserContext file: `./contexts/UserContext.js`

* functional components with `useContext` hook (useful if context variables are needed outside of `render`

```
import React, { useContext } from 'react';
import { UserContext } from '<path to user context>/UserContext';

function Component(props) {
	// entire context object
	const userContext = useContext(UserContext);
	// preferred
	const { username } = useContext(UserContext);
	// rename context variables if necessary
	const { username: contextUsername } = useContext(UserContext);

	render() {
		<Text>{userContext.username}</Text>
		<Text>{username}</Text>
		<Text>{contextUsername}</Text>
	}
}
```

* functional components inside `render`

```
import React, { useContext } from 'react';
import { UserContextProvider } from '<path to user context>/UserContext';

function Component(props) {
	render() {
		<View>
			<UserContextProvider>
				// context can be destructured or renamed as seen above
				{ context => (
					<Text>{context.username}</Text>
				) }
			</UserContextProvider>
		<View>
	}
}
```

* class based component

```
import React from 'react';
import { UserContext } from '<path to user context>/UserContext';

class Component extends React.Component {
	static contextType = UserContext;

	render () {
		return (
			<Text>{this.context.username}</Text>
		);
	}
}
```
