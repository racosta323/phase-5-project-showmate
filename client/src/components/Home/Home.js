import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import HomeCarousel from "./HomeCarousel"
import Trending from './Trending'


function Home(){

    const { loggedInUser } = useOutletContext()
    
   
    const [artists, setArtists] = useState()
    
    useEffect(()=>{
        fetch('/api/artists')
        .then (resp=>resp.json())
        .then(data=>setArtists(data))
    }, [])

    const avgStars = artists?.filter((artist) => {
        return artist.reviews.length > 0;}).map((artist) => {
            const totalStars = artist.reviews.reduce((total, review) => {
                return total + review.stars;
            }, 0);
            return {artist, avgStars: totalStars / artist.reviews.length};
    });

    avgStars?.sort((a, b) => {
        return b.avgStars - a.avgStars; 
    });

    const renderArtists = avgStars?.slice(0,5).map((artist)=>{
        return(
            <Trending 
                key={artist.artist.id} 
                name={artist.artist.name} 
                genre={artist.artist.genre} 
                rank={avgStars.indexOf(artist)+1} 
                image={artist.artist.profile_image} id={artist.artist.id}
            />)
    })

    return(
        <>
            <Row></Row>
            <Row className='bg-danger'>
                <Col>
                    <Row className='mt-5'></Row>
                    <Row className='mb-5'>
                        <h2 className='text-light text-center'>Welcome, {loggedInUser.first_name}!</h2>
                        <p className='text-light text-center'>Search artists to find shows by that artist, or check out trending artists below. <br/> Tell us about your experience by reviewing the show!</p>
                        <p className='text-light text-center'>Don't see your artist? Add one!</p>
                    </Row>
                    
                </Col>
            </Row>
            <Row className='p-2'>
                <Col xs={8}>
                    <Row className="my-5">
                        <Col>
                            <HomeCarousel artists={artists}/>
                        </Col>
                    </Row>
                </Col>
                <Col xs={4} className="my-5 trending-container">
                    <Row className="my-4">
                        <Col>
                            <h3 className='fw-bold'>Trending Artists</h3>
                            {renderArtists}
                        </Col>
                    </Row>
                   <Row>
                        <Col>
                            <p className='smaller p-2'>Sorted by highest rating</p>
                        </Col>
                   </Row>

                </Col>
            </Row>
        </>
    )
}

export default Home