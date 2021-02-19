export function isSignUpRoute(navigation) {
    const routeName = navigation.state.routeName;
    return routeName.indexOf('SignUp') != -1;
}

export function isAlternateSignUpRoute(navigation) {
    const routeName = navigation.state.routeName;
    return routeName.indexOf('AlternateAccount') != -1;
}
