import { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";

export default class extends Component {
    render() {
        return(
            <>
                <Row>
                    {this.props.data.map((value, key) => (
                        <Col lg={value.lg} md={value.md} sm={value.sm} xs={value.xs} key={key}>
                            <Card className="custom-height shadow-lg mb-5" style={{borderBottom:`4px solid ${value.borderColor}`}}>
                                <Card.Body style={{padding:"5rem 3rem"}}>
                                    <div className="text-center">
                                        <img src={value.img} alt={value.title} height={value.imgHeight} style={value.style} />
                                        <h5 className="card-title fw-bold"> {value.title} </h5>
                                        <p className="card-text" style={{fontSize:"14px"}}> {value.description} </p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </>
        )
    }
}