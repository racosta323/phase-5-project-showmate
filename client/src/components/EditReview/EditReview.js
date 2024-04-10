import { useState, useEffect, useRef } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'

import { useFormik } from 'formik'
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'

function EditReview({ reviewId, formik }){
    const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

    const inputRef = useRef(null)

    const [reviews, setReviews] = useState({})
    const [toggleReview, setToggleReview] = useState(null)
    const [isEditMode, setEditMode] = useState(false)   
    const [inputClass, setInputClass] = useState('border border-0 bg-light')


    useEffect(()=>{
        fetch(`/reviews/${reviewId}`)
        .then(resp=>resp.json())
        .then(data => setReviews(data))
    }, [reviewId])

    // useEffect(() => {
    //     formik.setValues({
    //         ...formik.values,
    //         subject: reviews.subject
    //     });
    // }, [reviews])


    function turnOnEdit(){
        setToggleReview(true)
        setInputClass('')
        setEditMode(true);
    }

    //autofocus
    useEffect(() => {
        if (toggleReview && inputRef.current) {
            inputRef?.current.focus();
        }
    }, [toggleReview]);
    
    
    // console.log(inputRef)

    return(
        <Row>
            <Col xs={12}>
                <form>
                {!toggleReview ? 
                    <>
                        <Stack direction='horizontal'>
                            <h5 className="ms-3 fw-bold">{reviews?.review}</h5>
                            <i 
                                as="button" 
                                onClick={turnOnEdit}
                                className="ms-2 bi bi-pencil-fill pencil"
                            ></i>
                        </Stack>
                    </> : 
                    <>
                        <input
                            ref={inputRef}
                            type="review"
                            name='review'
                            onChange={formik.handleChange}
                            value={formik.values.review}
                            readOnly={!isEditMode}
                            className={inputClass}
                            onBlur={()=>{
                                setEditMode(false)
                                setInputClass('border border-0 bg-light')
                            }}
                        />
                        <i 
                            as="button" 
                            onClick={turnOnEdit}
                            className="ms-2 bi bi-pencil-fill pencil"
                        ></i>
                    </>
                } 
                </form>         
            </Col>
        </Row>
    )
}

export default EditReview