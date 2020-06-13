export function isSignUpRoute(navigation) {
    const routeName = navigation.state.routeName;
    return routeName.indexOf('SignUp') != -1;
}
