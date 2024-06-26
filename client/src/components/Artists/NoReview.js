import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'

import CreateReview from "./CreateReview"

function NoReview({ handleClose, handleShow, show }){
    
    return(
        <>
            <Row className='border border-secondary-subtle rounded p-5 mt-5'>
                <Row className="p-2">
                    <Col className="d-flex justify-content-center">
                        <i className="bi bi-exclamation-triangle-fill text-warning fs-2"></i>
                        <h4 className="ms-3 mt-2 fw-bold">No Results Found</h4>
                    </Col>
                </Row> 
                <Row>
                    <Col className="d-flex justify-content-center">
                        <h5>This artist does not have reviews yet</h5>      
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <NavLink to="#" onClick={handleShow}>Write a review?</NavLink>
                        <CreateReview show={show} handleShow={handleShow} handleClose={handleClose}/>
                    </Col>
                </Row>
            </Row>
            
        </>
    )
}

export default NoReview