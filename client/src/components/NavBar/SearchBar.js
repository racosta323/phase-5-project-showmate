import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SearchBar(){

    const navigate = useNavigate()

    const [input, setInput] = useState("")
    const [results, setResults] = useState({})
    
    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }

    function handleSubmit(e){   
        e.preventDefault()
        navigate('/search', {state:{input:input, results:results}})
        setInput('')
    }
    const fetchData = (input) => {
        fetch(`/api/artists`)
        .then (resp => resp.json())
        .then(data => {
            
            const results = data.filter((artist)=>{
                return input && artist && artist.name && artist.name.toLowerCase().includes(input)
            })
            setResults(results)
           
        })
    }

    return(
        <div>
            <Form inline>
                <Row>
                    <Col xs={9}>
                        <Form.Control
                            type="text"
                            placeholder="Search for artists across the US"
                            className="mr-sm-2 search"
                            data-bs-theme="light"
                            onChange={(e)=>{handleChange(e.target.value)}}
                            style={{fontSize: "13px", background: "#fcfbde"}}
                        />
                    </Col>
    
                    <Col>
                        <Button 
                            variant="dark" 
                            type="click" 
                            onClick={handleSubmit}
                            onKeyDown={(e)=>{
                                if (e.key === 'Enter'){
                                    handleSubmit()
                                }
                            }}
                            style={{fontSize: "13px"}}
                        >
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default SearchBar