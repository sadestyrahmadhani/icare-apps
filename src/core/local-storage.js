export const setToken = (token) => {
    localStorage.item('__token', token)
}

export const getToken = () => {
    return localStorage.getItem('__token') ?? null
}