import { Component, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDataProduct } from "../../services/API";
import LoadingAlert from "../../component/alert/loadingAlert";

function NewsProduct() {
    const [dataProductById, setDataProductById] = useState([])
    const { id } = useParams()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
            detailDataProduct()
    }, [id]);

    const detailDataProduct = async () => {
        setLoading(true)
        const res = await getDataProduct()
        setLoading(false)
        if (res.status === 200) {
            const getData = res.data.find((item) => item.id.toString() === id)
            setDataProductById(getData)
            // console.log(getData)
        }
    }

    const downloadPDF = () => {
        if(dataProductById.brochure) {
            window.open(`https://documentsolution.com/uploads/products/brochure/${dataProductById.brochure}`, '_blank')
        }
    }
    return (
        <>
            <div className="py-lg-3 py-md-3">
                <div className="responsive-bar p-15px" style={{ alignItems: 'baseline', height: '55px' }}>
                    <Link to="/dashboard" className="list-items">
                        <i className="fa fa-arrow-left me-3" style={{ fontSize: '18px', color: '#014C90' }}></i>
                    </Link>
                </div>
                <div className="responsive-news card px-md-4 px-1 shadow">
                    {
                        dataProductById && (
                            <div className="card-body">
                                <div className="row">
                                    <div className="mb-3 mt-1 d-lg-none d-md-none">
                                        <img src="https://icare.documentsolution.com/client/assets/assets/images/icare_logo_1.png" alt="" style={{ width: '30%' }} />
                                    </div>
                                    <div className="fw-bold mb-3">
                                        <h4 className="title-icare fw-bold">{dataProductById.name_ina}</h4>
                                        <span style={{ fontSize: '14px' }}>{dataProductById.created_at}</span>
                                    </div>
                                    <div className="mb-4">
                                        <img src={`https://www.documentsolution.com/uploads/products/${dataProductById.image}`} alt="" style={{ maxWidth: 'inherit' }} />
                                    </div>
                                    <div className="mb-3">
                                        <div dangerouslySetInnerHTML={{ __html: dataProductById.highlight_ina }} />
                                    </div>
                                    {
                                        dataProductById.spec ? (
                                            <div>
                                                <div className="mb-3">
                                                    <h5 className="fw-bold">Spesifikasi</h5>
                                                    <table className="table table-width border-only-bottom" style={{ maxWidth: '50%' }}>
                                                        <tbody>
                                                            {
                                                                dataProductById.spec.map((item, key) => (
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
                                                    <button onClick={downloadPDF} className="btn btn-login me-2 bottom-news" style={{ padding: '10px', width: '20%' }}><i className="fa fa-file-pdf-o fa-lg me-2"></i>Unduh PDF</button>
                                                    <Link to={dataProductById.driver} className="btn btn-login bottom-news" style={{ padding: '10px', width: '22%' }}><i className="fa fa-external-link fa-lg me-2"></i>Tautan Driver</Link>
                                                </div>
                                            </div>
                                        ) : (
                                            <p></p>
                                        )
                                    }
                                </div>
                            </div>

                        )
                    }
                </div>
                <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
            </div>
        </>
    )
}

export default NewsProduct