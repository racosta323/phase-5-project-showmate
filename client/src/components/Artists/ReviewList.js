import { NavLink } from 'react-router-dom'

import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'
import Stack from "react-bootstrap/Stack"

function ReviewList({ review }){

    return(
        <>
            <Row className='border border-secondary-subtle rounded my-3'>
                <Row >
                    <Col xs={8}> 
                        <Stack direction="horizontal">
                            <i className="bi bi-person-circle mx-3 text-primary"></i>
                            <p className="mt-3 text-primary">
                                <NavLink to={`/users/${review.user.id}`} className="link-offset-2 link-underline link-underline-opacity-0">
                                    {review.user.username}
                                </NavLink>
                            </p>
                        </Stack>
                        <h5 className="ms-3 fw-bold">{review.subject}</h5>
                    </Col>
                    <Col> 
                        <h6 className="text-end mt-3">
                            <span className='fw-bold'>
                                {review.stars}
                            </span> / {' '}
                            <span className='text-warning'>
                                5 {' '}
                            </span>
                            <i className="bi bi-star-fill text-warning" ></i>
                        </h6>
                        
                    </Col>
                </Row>
                <Row>
                    <p className="ms-3 text-dark">{review.review}</p>
                </Row>
                <Row>
                    <p className="ms-3 text-secondary smaller">Date Posted: {review.created_at}</p>
                </Row>
                <Row>
                    <Col>
                        <p className="smaller">
                            <span  className="fw-bold ms-3">Show: </span> 
                            {review.show} <br />
                            <span  className="fw-bold ms-3">Show Location: </span> 
                            {review.location} <br />
                            <span  className="fw-bold ms-3">Show Date: </span> 
                            {review.show_date}
                        </p>
                    </Col>
                    
                </Row>        
            </Row>
            
        </>
    )
}

export default ReviewList