import { Component, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getDataBerita, getDataProduct } from "../../services/API";
import LoadingAlert from "../../component/alert/loadingAlert";

function News() {
    const [dataNewsById, setDataNewsById] = useState([])
    const [loading, setLoading] = useState(false)
    const [typeNews, setTypeNews] = useState('')

    const location = useLocation()

    useEffect(() => {
        detailDataNews()
        setTypeNews(location.state?.type)
        // console.log(location.state);
    }, []);

    const detailDataNews = async () => {
        setLoading(true)
        if (location.state?.type === "data-news") {
            const res = await getDataBerita()
            // console.log(res);
            setLoading(false)

            if (res.status === 200) {
                const getData = res.data.news.find((item) => item.id.toString() === location.state?.id.toString())

                const filteredDescription = getData.description_ina.filter((item) => item.trim() !== '')
                const cleanedDescription = filteredDescription.join('')
                getData.description_ina = cleanedDescription

                setDataNewsById(getData)
                // console.log('TEST :', getData)
            }
        } else if (location.state?.type === "data-product") {
            const res = await getDataProduct()
            // console.log(res);
            setLoading(false)

            if (res.status === 200) {
                const getData = res.data.find((item) => item.id.toString() === location.state?.id.toString())

                setDataNewsById(getData)
            }
        }
    }

    const handleButtonTab = (typeButton) => {
        if (typeButton === 'manualBook') {
            window.open(`https://documentsolution.com/uploads/products/brochure/${dataNewsById.brochure}`, '_blank')
        } else if (typeButton === 'driver') {
            window.open(dataNewsById.driver, '_blank')
        }
    }

    return (
        <>
            <div className="py-lg-3 py-md-3">
                <div className="responsive-bar p-15px" style={{ alignItems: 'baseline', height: '55px' }}>
                    <Link className="nav-link" to="/dashboard">
                        <i className="fa fa-arrow-left me-3" style={{ color: '#014C90', fontSize: '18px' }}></i>
                    </Link>
                </div>
                <div className="responsive-news card px-md-4 px-1 shadow">
                    <div className="card-body">
                        <div className="row">
                            <div className="mb-3 mt-1 d-lg-none d-md-none">
                                <img src="https://icare.documentsolution.com/client/assets/assets/images/icare_logo_1.png" alt="iCare" style={{ width: '30%' }} />
                            </div>
                            {
                                typeNews === "data-news" ? (
                                    dataNewsById && (
                                        <>
                                            <div className="fw-bold mb-3">
                                                <h4 className="title-icare fw-bold" style={{ fontSize: '20px' }}>{dataNewsById.title_ina}</h4>
                                                <span style={{ fontSize: '14px' }}>{dataNewsById.news_date}</span>
                                            </div>
                                            <div className="mb-3">
                                                {
                                                    dataNewsById.image && (
                                                        <img src={`https://documentsolution.com/uploads/news/banners/${dataNewsById.image}`} alt={dataNewsById.image} style={{ maxWidth: 'inherit' }} />
                                                    )
                                                }
                                            </div>
                                            <div style={{ fontSize: '16px' }}>
                                                <div dangerouslySetInnerHTML={{ __html: dataNewsById.description_ina }} />
                                            </div>
                                        </>
                                    )
                                ) : typeNews === "data-product" ? (
                                    dataNewsById && (
                                        <>
                                            <div className="fw-bold mb-3">
                                                <h4 className="title-icare fw-bold">{dataNewsById.name_ina}</h4>
                                                <span style={{ fontSize: '14px' }}>{dataNewsById.created_at}</span>
                                            </div>
                                            <div className="mb-4">
                                                {
                                                    dataNewsById.image && (
                                                        <img src={`https://www.documentsolution.com/uploads/products/${dataNewsById.image}`} alt="" style={{ maxWidth: 'inherit' }} />
                                                    )
                                                }
                                            </div>
                                            <div className="mb-3">
                                                <div dangerouslySetInnerHTML={{ __html: dataNewsById.highlight_ina }} />
                                            </div>
                                            {
                                                dataNewsById.spec ? (
                                                    <div>
                                                        <div className="mb-3">
                                                            <h5 className="fw-bold">Spesifikasi</h5>
                                                            <table className="table table-width border-only-bottom" style={{ maxWidth: '50%' }}>
                                                                <tbody>
                                                                    {
                                                                        dataNewsById.spec.map((item, key) => (
                                                                            <tr key={key}>
                                                                                <th scope="row">{item.filter}</th>
                                                                                <td>{item.value}</td>
                                                                            </tr>

                                                                        ))
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>

                                                        <div className="mb-5 bottom-position">
                                                            <button onClick={() => handleButtonTab("manualBook")} className="btn btn-login me-2 bottom-news" style={{ padding: '10px', width: '20%' }}><i className="fa fa-file-pdf-o fa-lg me-2"></i>Unduh PDF</button>
                                                            <button onClick={() => handleButtonTab("driver")} className="btn btn-login bottom-news" style={{ padding: '10px', width: '22%' }}><i className="fa fa-external-link fa-lg me-2"></i>Tautan Driver</button>
                                                            {/* <Link to={dataNewsById.driver} className="btn btn-login bottom-news" style={{ padding: '10px', width: '22%' }}><i className="fa fa-external-link fa-lg me-2"></i>Tautan Driver</Link> */}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p></p>
                                                )
                                            }
                                        </>

                                    )
                                ) : null
                            }
                        </div>
                    </div>
                </div >
            </div >
            <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
        </>
    )
}

export default News