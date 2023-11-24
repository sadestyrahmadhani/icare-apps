import QRReader from 'react-qr-scanner'
import { Link, useNavigate } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import { getEQByCode } from '../../services/API/mod_request'
import LoadingAlert from './../../component/alert/loadingAlert'
import ConfirmAlert from '../../component/alert/confirmAlert'

const QRScanner = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alertOptions, setAlertOptions] = useState({
        title: '',
        message: ''
    })

    const handleScan = async (e) => {
        if(e && !loading && !showAlert) {
            setLoading(true)
            const res = await getEQByCode(e.text)

            setLoading(false)
            if(res.status == 200) {
                if(res.data.includes('Failed')) {
                    setShowAlert(true)
                    setAlertOptions({
                        title: '',
                        message: res.data
                    })
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
            <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
                <QRReader
                    style={{
                        height: '80vw',
                        width: '80vw'
                    }}
                    onError={handleError}
                    onScan={handleScan}
                    legacyMode={ true }
                    willReadFrequently={ true }
                />
            </div>
            <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
            <ConfirmAlert visible={showAlert} titleMessage={alertOptions.title} message={alertOptions.message} onClick={ () => navigate(0) } />
        </>
    )
}

export default QRScanner