import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'

import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import { useFormik } from 'formik'

import Pencil from './Pencil'

function EditUserReview( { reviews }){
    const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)


    const formik = useFormik({
        initialValues: {
            subject: reviews.subject
        },
        onSubmit: async (values) => {
            try{
                const artistResponse = await fetch(`/reviews/${reviews.id}`,{
                    method: 'PATCH',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify(values, null, 2)
                })
                .then(resp=>resp.json())
                .then(data=>console.log(data))
            } catch(error){

            }
            // navigate(`/profile/${formik.values.id}`)
            // window.location.reload()
        }
    })


    return(
        <>
            <Row className='border border-secondary-subtle rounded mt-5'>
                <Row >
                    <Col xs={8} className='mt-3'>
                        <h5 className="ms-3 fw-bold">
                            <Pencil prop={reviews.subject} text="subject" id={reviews.id} formik={formik}/>
                        </h5>
                        
                    </Col>
                    <Col> 
                        <h6 className="text-end mt-3">
                            <span className='fw-bold'>
                                {reviews.stars}
                            </span> / {' '}
                            <span className='text-warning'>
                                5 {' '}
                            </span>
                            <i className="bi bi-star-fill text-warning" ></i>
                            {/* {' '} see review */}
                        </h6>
                        
                    </Col>
                </Row>
                <Row>
                    <h5 className="ms-3 text-secondary">
                        <a href={`/artists/${reviews.artist.id}`} className='link-offset-2 link-underline link-underline-opacity-0'>
                            Artist: {reviews.artist.name}
                        </a>
                    </h5>
                    <p className="ms-3 text-secondary smaller">Date Posted: {reviews.created_at}</p>
                    <ResponsiveEllipsis
                        text={reviews.review}
                        maxLine={3}
                        ellipsis="..."
                        trimRight
                        basedOn="letters"
                        className="mb-3 ms-3 lh-sm"
                    />
                </Row>
                <Row>
                    <Col>
                        <h6 className="text-end text-secondary smaller">See full review (open when clicked)</h6>
                        <p className="text-end text-secondary smaller">
                            <a href="#" onClick={formik.handleSubmit}>
                                Edit
                            </a> 
                        </p>
                        <p className="text-end text-secondary smaller">
                            <a href="#">
                                Delete
                            </a>
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="smaller">
                            <span  className="fw-bold ms-3">
                                Show: 
                            </span> 
                            {reviews.show} 
                        </p>
                    </Col>
                    <Col>
                        <p className="smaller">
                            <span  className="fw-bold ms-3">
                                Show Location: 
                            </span> 
                            {reviews.location}
                        </p>
                        </Col>
                    <Col>
                        <p className="smaller"> 
                            <span  className="fw-bold ms-3">
                                Show Date: 
                            </span> 
                            {reviews.show_date}
                        </p>
                    </Col>
                </Row>        
                
            </Row>
            <hr className='mt-5'></hr>
        </>
    )
}

export default EditUserReview
