import { useState, useEffect, useRef } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'

import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

function EditSubject({ reviewId, formik }){

    const inputRef = useRef(null)

    const [reviews, setReviews] = useState({})
    const [toggleSubj, setToggleSubj] = useState(null)
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
        setToggleSubj(true)
        setInputClass('')
        setEditMode(true);
    }

    //autofocus
    useEffect(() => {
        if (toggleSubj && inputRef.current) {
            inputRef.current.focus();
        }
    }, [toggleSubj]);
    


    return(
        <div>
            <form>
            {!toggleSubj ? 
                <>
                    <Stack direction='horizontal'>
                        <h5 className="ms-3 fw-bold">{reviews?.subject}</h5>
                        <i 
                            as="button" 
                            onClick={turnOnEdit}
                            className="ms-2 bi bi-pencil-fill pencil"
                        ></i>
                    </Stack>
                </> : 
                <>
                    <InputGroup>
                        <Form.Control
                            ref={inputRef}
                            type="subject   "
                            name='subject'
                            onChange={formik.handleChange}
                            value={formik.values.subject}
                            readOnly={!isEditMode}
                            onBlur={()=>{setEditMode(false)}}
                        />
                    </InputGroup>
                    {/* <input
                        ref={inputRef}
                        type="subject"
                        name='subject'
                        onChange={formik.handleChange}
                        value={formik.values.subject}
                        readOnly={!isEditMode}
                        className={inputClass}
                        onBlur={()=>{
                            setEditMode(false)
                            setInputClass('border border-0 bg-light')
                        }}
                    /> */}
                    <i 
                        as="button" 
                        onClick={turnOnEdit}
                        className="ms-2 bi bi-pencil-fill pencil"
                    ></i>
                </>
            } 
            </form>         
        </div>
    )
}

export default EditSubject