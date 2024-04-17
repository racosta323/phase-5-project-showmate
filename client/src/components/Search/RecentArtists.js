import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from 'react-bootstrap/Button'
import Stack from "react-bootstrap/esm/Stack"

function RecentArtists({ name, genre }){
    return(
        <Row className="mt-2">
            <Col as="button" className="text-danger border rounded" style={{background: "#fcfbde"}}>
                <p className="text-start fs-5 fw-bold lh-1 pt-1">{name} <br/> 
                    <span className="smaller fw-normal text-dark">
                        {genre}
                    </span> 
                </p>
                
            </Col>
        </Row>
    )
}

export default RecentArtists