import { useState, useEffect } from 'react'
import { useParams, useOutletContext, NavLink } from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

import ReviewList from './ReviewList'
import NoReview from './NoReview'
import CreateReview from './CreateReview'


function ArtistReviews(){

        const { show, setShow, handleClose, handleShow, loggedInUser } = useOutletContext()

        const params = useParams()
        const artistId = params.id

        const [artist, setArtist] = useState({})

    useEffect(()=>{
        fetch(`/api/artists/${artistId}`)
        .then(resp=>resp.json())
        .then(data => setArtist(data))
    }, [artistId])


    const renderList = () => {
        if (!artist.reviews || artist.reviews.length == 0){
           return <NoReview handleClose={handleClose} handleShow={handleShow} show={show}/>
        } else {
            return artist.reviews.map((review)=>{
                return <ReviewList review={review} key={artistId}/>
            })
        }
    }

    return(
        <Container>
            <Row>
                <Row className='my-4'></Row>
                <Row className='my-5'>
                    <Col>
                        <Row>
                            <img
                                src={artist?.profile_image}  
                                alt={`Image of ${artist?.name}`}
                                height={300}
                                width={400}
                            />
                        </Row>
                        <Row className='my-4'></Row>
                    </Col>
                    <Col xs={8} className='ps-5'>
                        <Row>
                            <Col >
                                <Row>
                                    <Col className='mt-2'>
                                        <h3>User Reviews</h3>
                                    </Col>
                                    
                                </Row>
                                <Row>
                                    <Col>
                                        <h1 className='text-uppercase'>
                                            <NavLink to={`/artists/${artistId}`} className='link-offset-2 link-underline link-underline-opacity-0' >
                                                {artist?.name}  
                                            </NavLink>
                                        </h1>
                                    </Col>
                                    
                                    <Col className="d-flex justify-content-end">
                                        <Button onClick={handleShow}>
                                            <i className="bi bi-pencil-square text-light fs-3" ></i>
                                        </Button>
                                        <CreateReview show={show} handleShow={handleShow} handleClose={handleClose} userId={loggedInUser.id} artist={artist}/>
                                    </Col>
                                    <hr className='mt-3'/>
                                </Row>
                            </Col>
                        </Row>
                        {renderList()}
                    </Col>
                </Row>
            </Row>
        </Container>
    )
}

export default ArtistReviews
