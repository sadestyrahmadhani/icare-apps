import { Component, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBeritaById, getDataBerita } from "../../services/API";
import LoadingAlert from "../../component/alert/loadingAlert";

function News() {
    const [dataNewsById, setDataNewsById] = useState([])
    const { id } = useParams()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        detailDataNews()
    }, [id]);

    const detailDataNews = async () => {
        setLoading(true)
        const res = await getDataBerita()
        setLoading(false)
        if (res.status === 200) {
            const getData = res.data.news.find((item) => item.id.toString() === id)

            const filteredDescription = getData.description_ina.filter((item) => item.trim() !== '')
            const cleanedDescription = filteredDescription.join('')
            getData.description_ina = cleanedDescription

            setDataNewsById(getData)
            // console.log('TEST :', getData)
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
                    {
                        dataNewsById && (
                            <div className="card-body">
                                <div className="row">
                                    <div className="mb-3 mt-1 d-lg-none d-md-none">
                                        <img src="https://icare.documentsolution.com/client/assets/assets/images/icare_logo_1.png" alt="iCare" style={{ width: '30%' }} />
                                    </div>
                                    <div className="fw-bold mb-3">
                                        <h4 className="title-icare fw-bold" style={{ fontSize: '20px' }}>{dataNewsById.title_ina}</h4>
                                        <span style={{ fontSize: '14px' }}>{dataNewsById.news_date}</span>
                                    </div>
                                    <div className="mb-3">
                                        <img src={`https://documentsolution.com/uploads/news/banners/${dataNewsById.image}`} alt={dataNewsById.image} style={{ maxWidth: 'inherit' }} />
                                    </div>
                                    <div style={{ fontSize: '16px' }}>
                                        <div dangerouslySetInnerHTML={{ __html: dataNewsById.description_ina }} />
                                    </div>
                                </div>
                            </div>

                        )
                    }
                </div>
            </div>
            <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
        </>
    )
}

export default News