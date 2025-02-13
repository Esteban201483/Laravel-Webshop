export function isAuthenticated(){
    const authenticated = window.sessionStorage.getItem("authenticated") === 'yes';

    return authenticated;
}