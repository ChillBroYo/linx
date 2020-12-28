export function isSignUpRoute(navigation) {
    const routeName = navigation.state.routeName;
    return routeName.indexOf('SignUp') != -1;
}

export function isGoogleSignUpRoute(navigation) {
    const routeName = navigation.state.routeName;
    return routeName.indexOf('GoogleSignUp') != -1;
}
