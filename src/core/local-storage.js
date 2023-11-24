export const setUser = (param) => {
    localStorage.setItem('username', param)
}

export const setEmail = (param) => {
    localStorage.setItem('emailaddress', param)
}

export const setTelp = (param) => {
    localStorage.setItem('telp', param)
}


export const setNamaPerusahaan = (param) => {
    localStorage.setItem('namaperusahaan', param)
}

export const setId = (param) => {
    localStorage.setItem('id', param)
}
export const setOtp = (param) => {
    localStorage.setItem('otp', param)
}
export const setFirstLogin = (param) => {
    localStorage.setItem('firstlogin', param)
}

export const setUpgradeStatus = (param) => {
    localStorage.setItem('upgradestatus', param)
}

export const setUploadedCSVFile = (param) => {
    localStorage.setItem('uploadedcsvfile', param)
}

export const getUser = () => {
    return localStorage.getItem('username') ?? null
}

export const getEmail = () => {
    return localStorage.getItem('emailaddress') ?? null
}


export const getTelp = () => {
    return localStorage.getItem('telp') ?? null
}

export const getNamaPerusahaan = () => {
    return localStorage.getItem('namaperusahaan') ?? null
}
export const getId = () => {
    return localStorage.getItem('id') ?? null
}
export const getOtp = (param) => {
    return localStorage.getItem('otp') ?? null
}
export const getFirstLogin = (param) => {
    return localStorage.getItem('firstlogin') ?? null
}

export const getUpgradeStatus = () => {
    return localStorage.getItem('upgradestatus') ?? null
}

export const getUploadedCSVFile = () => {
    return localStorage.getItem('uploadedcsvfile') ?? null
}



