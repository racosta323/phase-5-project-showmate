import { useState, useEffect, useRef } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import { useFormik } from 'formik'
import EditReview from './EditReview'
import EditSubject from './EditSubject'
import EditStars from './EditStars'

function EditUserReview(){
    const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)
    const inputRef = useRef(null)

    const { loggedInUser } = useOutletContext()

    const [review, setReview] = useState({})

    const params = useParams()
    const reviewId = params.reviewId
    const navigate = useNavigate()

    useEffect(()=>{
        fetch(`/reviews/${reviewId}`)
        .then(resp=>resp.json())
        .then(data => setReview(data))
    }, [reviewId])

    useEffect(() => {
        formik.setValues({
            ...formik.values,
            subject: review.subject,
            stars: review.stars,
            review: review.review
        });
    }, [review])


    const formik = useFormik({
        initialValues:{
            subject: review.subject,
            stars: review.stars,
            review: review.review
        },
        onSubmit: async (values) => {
            try{
                const reviewResponse = await fetch(`/reviews/${reviewId}`,{
                    method: 'PATCH',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify(values, null, 2)
                })
                .then(resp=>resp.json())
                .then(data=>console.log(data))
                .then(window.location.reload())
            } catch(error){

            }
        }
    })

    function handleDelete(){
        fetch(`/reviews/${reviewId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify()
        })
        
        .then(navigate(`/users/${loggedInUser.id}`))
    }

    console.log(review)

    return(
        <>
            <Row className='border border-secondary-subtle rounded mt-5'>
                <Row >
                    <Col xs={8} className='mt-3'> 
                        <EditSubject reviewId={reviewId} formik={formik}/>
                    </Col>
                    <Col> 
                        <EditStars reviewId={reviewId} formik={formik}/>
                    </Col>
                </Row>
                <Row>
                    <h5 className="ms-3 text-secondary"> 
                        <a href={`/artists/${review.artist?.id}`} className='link-offset-2 link-underline link-underline-opacity-0'>
                            Artist: {review.artist?.name}
                        </a>
                    </h5>
                    <p className="ms-3 text-secondary smaller">Date Posted: {review?.created_at}</p>
                    <EditReview reviewId={reviewId} formik={formik}/>
                    {/* <ResponsiveEllipsis
                        text="review"
                        maxLine={3}
                        ellipsis="..."
                        trimRight
                        basedOn="letters"
                        className="mb-3 ms-3 lh-sm"
                    />  */}
                </Row>
                <Row>
                    <Col>
                        {/* <h6 className="text-end text-secondary smaller">See full review (open when clicked)</h6> */}
                        {/* {userId == loggedInUser.id ? 
                            <p className="text-end text-secondary smaller"> */}
                                edit
                                {/* <a href={`/users/${loggedInUser.id}/edit/${reviews.id}`}>
                                    Edit
                                </a>  */}
                            {/* </p> :  */}
                            {/* <></>} */}
                        {/* <p className="text-end text-secondary smaller">
                            <a href="#">
                                Edit
                            </a> 
                        </p> */}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="smaller">
                            <span  className="fw-bold ms-3">
                                Show: 
                            </span> 
                            4
                        </p>
                    </Col>
                    <Col>
                        <p className="smaller">
                            <span  className="fw-bold ms-3">
                                Show Location: 
                            </span> 
                           Location
                        </p>
                        </Col>
                    <Col>
                        <p className="smaller"> 
                            <span  className="fw-bold ms-3">
                                Show Date: 
                            </span> 
                            Date
                        </p>
                    </Col>
                </Row>     
                <Row>
                    <Col></Col>
                    <Col xs={6} className='d-flex justify-content-end px-5 ms-5'>
                        <Col>
                            <Button className='ms-4' onClick={formik.handleSubmit} variant='secondary'>Submit Edits</Button>
                        </Col>
                        <Col>
                            <Button className='ms-2' onClick={handleDelete} variant='danger'>Delete Review</Button>
                        </Col>
                    </Col>
                </Row>
                
            </Row>
            <hr className='mt-5'></hr>
        </>
    )
}

export default EditUserReview
