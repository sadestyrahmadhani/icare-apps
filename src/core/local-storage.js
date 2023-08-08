export const setToken = (token) => {
    localStorage.setItem('__token', token)
}

export const getToken = () => {
    return localStorage.getItem('__token') ?? null
}

