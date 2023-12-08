import {QrScanner} from '@yudiel/react-qr-scanner';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import { getEQByCode } from '../../services/API/mod_request'
import LoadingAlert from './../../component/alert/loadingAlert'
import ConfirmAlert from '../../component/alert/confirmAlert'

const QRScanner = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [loading, setLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alertOptions, setAlertOptions] = useState({
        title: '',
        message: ''
    })
    console.log(location.state);

    const handleScan = async (e) => {        
        var code=e.split('/')        
        if(e && !loading && !showAlert) {
            setLoading(true)
            
            const res = await getEQByCode(code[code.length-1])
            
            setLoading(false)
            if(res.status == 200) {
                if(typeof res.data === 'string' && res.data.includes('Failed')) {
                    setShowAlert(true)
                    setAlertOptions({
                        title: '',
                        message: res.data
                    })
                } else {
                    if(res.data.Table[0].equipment === null) {
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
                        // if(location.state?.redirect == -1) {
                        //     navigate('/install_request', {
                        //         state: {
                        //             equipment: res.data.Table[0].equipment,
                        //             modelName: res.data.Table[0].modelName,
                        //             description: res.data.Table[0].description,
                        //             address: {
                        //                 id: res.data.Table[0].AddressId,
                        //                 Penerima: res.data.Table[0].Penerima,
                        //                 Nama_Alamat: res.data.Table[0].Nama_Alamat,
                        //                 Alamat: res.data.Table[0].Alamat,
                        //                 Kota: res.data.Table[0].Kota,
                        //                 Latitude: res.data.Table[0].Latitude,
                        //                 Longitude: res.data.Table[0].Longitude
                        //             }
                        //         }
                                
                        //     })
                        // }
                        // if(location.state?.redirect == -3) {
                        //     navigate('/supplies_request', {
                        //         state: {
                        //             equipment: res.data.Table[0].equipment,
                        //             modelName: res.data.Table[0].modelName,
                        //             description: res.data.Table[0].description,
                        //             address: {
                        //                 id: res.data.Table[0].AddressId,
                        //                 Penerima: res.data.Table[0].Penerima,
                        //                 Nama_Alamat: res.data.Table[0].Nama_Alamat,
                        //                 Alamat: res.data.Table[0].Alamat,
                        //                 Kota: res.data.Table[0].Kota,
                        //                 Latitude: res.data.Table[0].Latitude,
                        //                 Longitude: res.data.Table[0].Longitude
                        //             }
                        //         }
                                
                        //     })
                        // }
                    }
                }
            }
        }
    }

    const handleError = (error) => {
        console.log(error)
    }

    

    return (
        <>
            <div className="responsive-bar" style={{alignItems:'baseline', height:'55px'}}>
                <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
                    <Link className="nav-link d-inline me-3" to="javascript:history.back()" >
                        <i className="fa fa-arrow-left color-arrow-left" style={{color:'#014C90'}}></i>
                    </Link>
                        <span className="title-bold" style={{borderBottom:'3px solid #014C90'}}>Scan QR Code</span>
                </h4>
            </div>
            <div className="d-flex align-items-center justify-content-center" style={{height: 'calc(100vh - 100px)'}}>
                <QrScanner
                    constraints={ {facingMode: {exact : 'environment'}, aspectRatio: {ideal: 1}}}
                    containerStyle={{position: 'relative'}}
                    videoStyle={{width: '100%', position: 'absolute', top: 0, left: 0}}
                    onError={handleError}
                    onDecode={handleScan}
                    legacyMode={ true }
                    willReadFrequently={ true }
                    // viewFinder={viewFinderComponent}
                />
            </div>
            <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
            <ConfirmAlert visible={showAlert} titleMessage={alertOptions.title} message={alertOptions.message} onClick={ () => navigate(0) } />
        </>
    )
}

const viewFinderComponent = (props) => {
    return(
        <div className='element'>
            {JSON.stringify(props)}
        </div>
    )
}

export default QRScanner