export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token'); // get token from cookies

    // if token exists and url is /login redirect to homepage
    if (token.value && to?.name === 'signin') {
        return navigateTo('/');
    }

    // if token doesn't exist redirect to log in
    if (!token.value && to?.name !== 'signin') {
        abortNavigation();
        return navigateTo('/signin');
    }
})
