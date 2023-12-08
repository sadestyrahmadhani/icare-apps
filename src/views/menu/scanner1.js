import {QrScanner} from '@yudiel/react-qr-scanner';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react'
import { getEQByCode } from '../../services/API/mod_request'
import LoadingAlert from './../../component/alert/loadingAlert'
import ConfirmAlert from '../../component/alert/confirmAlert'
import { Html5Qrcode, Html5QrcodeScanType } from 'html5-qrcode'

const QRScanner = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [loading, setLoading] = useState(true)
    const [showAlert, setShowAlert] = useState(false)
    const [alertOptions, setAlertOptions] = useState({
        title: '',
        message: ''
    })

    // const handleScan = async (e) => {
    //     if(e && !loading && !showAlert) {
    //         setLoading(true)
    //         const res = await getEQByCode(e.text)
            
    //         setLoading(false)
    //         if(res.status == 200) {
    //             if(typeof res.data === 'string' && res.data.includes('Failed')) {
    //                 setShowAlert(true)
    //                 setAlertOptions({
    //                     title: '',
    //                     message: res.data
    //                 })
    //             } else {
    //                 if(res.data.Table[0].equipment === null) {
    //                     navigate('/tambah_eq', {
    //                         state: {
    //                             input: {
    //                                 equipment: res.data.Table[0].EQ,
    //                                 modelName: res.data.Table[0].ModelName
    //                             },
    //                             redirec: location.state?.redirect
    //                         }
    //                     })
    //                 } else {
    //                     if(location.state?.redirect == -2) {
    //                         navigate('/breakfix_request', {
    //                             state: {
    //                                 equipment: res.data.Table[0].equipment,
    //                                 modelName: res.data.Table[0].modelName,
    //                                 description: res.data.Table[0].description,
    //                                 address: {
    //                                     id: res.data.Table[0].AddressId,
    //                                     Penerima: res.data.Table[0].Penerima,
    //                                     Nama_Alamat: res.data.Table[0].Nama_Alamat,
    //                                     Alamat: res.data.Table[0].Alamat,
    //                                     Kota: res.data.Table[0].Kota,
    //                                     Latitude: res.data.Table[0].Latitude,
    //                                     Longitude: res.data.Table[0].Longitude
    //                                 }
    //                             }
                                
    //                         })
    //                     }
    //                     if(location.state?.redirect == -1) {
    //                         navigate('/install_request', {
    //                             state: {
    //                                 equipment: res.data.Table[0].equipment,
    //                                 modelName: res.data.Table[0].modelName,
    //                                 description: res.data.Table[0].description,
    //                                 address: {
    //                                     id: res.data.Table[0].AddressId,
    //                                     Penerima: res.data.Table[0].Penerima,
    //                                     Nama_Alamat: res.data.Table[0].Nama_Alamat,
    //                                     Alamat: res.data.Table[0].Alamat,
    //                                     Kota: res.data.Table[0].Kota,
    //                                     Latitude: res.data.Table[0].Latitude,
    //                                     Longitude: res.data.Table[0].Longitude
    //                                 }
    //                             }
                                
    //                         })
    //                     }
    //                     if(location.state?.redirect == -3) {
    //                         navigate('/supplies_request', {
    //                             state: {
    //                                 equipment: res.data.Table[0].equipment,
    //                                 modelName: res.data.Table[0].modelName,
    //                                 description: res.data.Table[0].description,
    //                                 address: {
    //                                     id: res.data.Table[0].AddressId,
    //                                     Penerima: res.data.Table[0].Penerima,
    //                                     Nama_Alamat: res.data.Table[0].Nama_Alamat,
    //                                     Alamat: res.data.Table[0].Alamat,
    //                                     Kota: res.data.Table[0].Kota,
    //                                     Latitude: res.data.Table[0].Latitude,
    //                                     Longitude: res.data.Table[0].Longitude
    //                                 }
    //                             }
                                
    //                         })
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    // const handleError = (error) => {
    //     console.log(error)
    // }

    let scanner, alert = false

    useEffect(() => {
        // scanner.start(...).then(res => {
        //     setLoading(false)
        // })

        if(!scanner?.getState()) {
            scanner = new Html5Qrcode('reader')
            const config = { 
                fps: 10, 
                qrbox: { 
                    width: 250, 
                    height: 250 
                },
                aspectRatio: 1.88888,
                supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
            }
            scanner.start({ facingMode: 'environment' }, config, handleScan).then(res => {
                setLoading(false)
            })
            // setLoading(false)
        }

        // async function handleScanDummy(decodeText,decodeResult) {
        //     await scanner.stop()
        //     scanner.clear()
        // }

        async function handleScan(decodeText, decodeResult) {
            var code=decodeText.split('/')
            if(!alert) {
                setLoading(true)
                const res = await getEQByCode(code[code.length - 1])
                setLoading(false)
                if(res.status == 200) {
                    if(scanner?.isScanning) {
                        console.log(scanner.isScanning);
                        await scanner.stop()
                        scanner.clear()
                    }
                    if(typeof res.data === 'string' && res.data.includes('Failed')) {
                        alert = true
                        setShowAlert(true)
                        setAlertOptions({
                            title: '',
                            message: res.data
                        })
                    } else {
                        // scanner.pause()
                        if(res.data.Table[0].equipment === null) {
                            // alert(1)
                            // console.log(1)
                            navigate('/tambah_eq', {
                                state: {
                                    input: {
                                        equipment: res.data.Table[0].EQ,
                                        modelName: res.data.Table[0].ModelName
                                    },
                                    redirec: location.state?.redirect
                                }
                            })
                        } else {
                            if(location.state?.redirect) {
                                // await scanner.stop()
                                // scanner.clear()
                                // alert(2)
                                navigate(location.state?.redirect, {
                                    state: {
                                        equipment: res.data.Table[0].equipment,
                                        modelName: res.data.Table[0].modelName,
                                        description: res.data.Table[0].description,
                                        address: {
                                            id: res.data.Table[0].AddressId,
                                            Penerima: res.data.Table[0].Penerima,
                                            Nama_Alamat: res.data.Table[0].Nama_Alamat,
                                            Alamat: res.data.Table[0].Alamat,
                                            Kota: res.data.Table[0].Kota,
                                            Latitude: res.data.Table[0].Latitude,
                                            Longitude: res.data.Table[0].Longitude
                                        }
                                    }
                                    
                                })
                            }
                        }
                    }
                }
            }
        }
    }, [])

    return (
        <>
            <div className="responsive-bar" style={{alignItems:'baseline', height:'55px'}}>
                <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
                    <Link className="nav-link d-inline me-3" to="" onClick={ () => { navigate(location.state?.redirect ?? '/dashboard');scanner.stop() }} >
                        <i className="fa fa-arrow-left color-arrow-left" style={{color:'#014C90'}}></i>
                    </Link>
                        <span className="title-bold" style={{borderBottom:'3px solid #014C90'}}>Scan QR Code</span>
                </h4>
            </div>
            <div id="reader">
                {/* <QRReader
                    style={{
                        height: '80vw',
                        width: '80vw'
                    }}
                    onError={handleError}
                    onDecode={handleScan}
                    legacyMode={ true }
                    // facingMode="environment"
                    constraints={{facingMode: 'environment'}}
                    willReadFrequently={ true }
                /> */}
            </div>
            <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
            <ConfirmAlert visible={showAlert} titleMessage={alertOptions.title} message={alertOptions.message} onClick={ () => { navigate(0) } } />
        </>
    )
}

export default QRScanner