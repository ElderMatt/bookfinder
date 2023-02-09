import React, { useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

let index = 0;
let previousSearch = "";

function BookSearch() {
    const search = "//localhost:9000/books?name=";
    const [book, setBook] = useState("");
    const [result, setResult] = useState([]);
    const [error, setError] = useState("");

    function handleChange(event) {
        const book = event.target.value;
        setBook(book);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (book !== previousSearch) {
            previousSearch = book;
            index = 0;
        }
        axios.get(search + book + "&startIndex=" + index)
            .then(data => {
                data.data !== undefined ? setResult(data.data) : setResult([]);
                data.data !== undefined ? setError("") : setError("Data is not available!");
            })
            .catch(error => { setError("Data is not available!"); setResult([]); });
    }

    function PreviousIndex(event) {
        if ((index - 12) >= 0) {
            index = index - 12;
            handleSubmit(event)
        }
    }

    function NextIndex(event) {
        if ((index + 12) < result.totalItems) {
            index = index + 12;
            handleSubmit(event)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Container style={{paddingBottom:10}}>
                <Row>
                    <Col style={{paddingTop:10}}>
                        <input onChange={handleChange} className="AutoFocus form-control" placeholder="Type a book title" type="text" />
                    </Col>
                </Row>
                <Row>
                    <Col style={{paddingTop:10}}>
                        <input type="submit" value="Search" className="btn btn-primary search-btn" />
                    </Col>
                </Row>
                <Row className="errorOccurred">
                    <h5>{error}</h5>
                </Row>
                <Row style={{paddingTop:10}}>
                    {result.items?.map((book, index) => (
                        <Col style={{paddingTop:10}} sm={2} key={index}>
                            <Card style={{height:600, paddingTop:10}}> 
                                <Card.Body key={book}>  
                                    <Card.Img variant="top" src={book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.thumbnail: ''} />
                                    <h5 className="card-title">Title: {book.volumeInfo.title}</h5>
                                    <h5 className="author">{book.volumeInfo.authors?.length < 2 ? `Author: ${book.volumeInfo.authors[0]}` : `Authors: ${book.volumeInfo.authors?.map(author => (` ${author}`))}`}</h5>
                                    <h5 className="card-language">Language: {book.volumeInfo.language}</h5>
                                    <h5 className="card-buy-link">{book.saleInfo.buyLink !== undefined ? <a href={book.saleInfo.buyLink} target="_blank" rel="noopener noreferrer">Buy</a> : "Not for sale."}</h5>
                                </Card.Body>  
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Row>
                    {result.length !== 0 ? <Col style={{paddingTop:10}} >
                        <input type="button" value="Previous" className="btn btn-primary previous-btn" onClick={PreviousIndex} />
                    </Col> : null} 
                    {result.length !== 0 ?<Col style={{paddingTop:10}}>
                        <input type="button" value="Next" className="btn btn-primary next-btn" onClick={NextIndex} />
                    </Col> : null} 
                </Row>
            </Container>
        </form>
    )
}

export default BookSearch