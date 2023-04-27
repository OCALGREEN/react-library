import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoadidng } from "../Utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";

export const SearchBooksPage = () => {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        // create fetch url and await its response 
        const fetchBooks = async () => {
            const baseUrl: string = "http://localhost:8080/api/books";
            const url: string = `${baseUrl}?page=0&size=5`;
            const response = await fetch(url);
            // throw an error if there is an error 
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            // transforms the data to json 
            const responseJson = await response.json();
            // get the json data out from the embedded books 
            const responseData = responseJson._embedded.books; 
            // will load up all the books 
            const loadedBooks: BookModel[] = []; 

            for (const key in responseData) {
                loadedBooks.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    img: responseData[key].img,
                });
            }
            // set all the books 
            setBooks(loadedBooks)
            // and there is no errors 
            setIsLoading(false)
        }
        fetchBooks().catch((error: any) => {
            setIsLoading(false) 
            setHttpError(error.message) 
        })
    }, []);

    // if we are loading then display this 
    if(isLoading) {
        return(
            <SpinnerLoadidng/> 
        )
    }

    // if there is an error then display this 
    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }
    
    return (
        <div>
            <div className="container">
                <div>
                    <div className="row mt-5">'
                        <div className="col-6">
                            <div className="d-flex">
                                <input className="form-control me-2" type="search"
                                    placeholder="Search" aria-labelledby="Search"/> 
                                <button className="btn btn-outline-success">
                                    Search 
                                </button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button"
                                    id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        Category
                                </button>
                                <ul className="dropdown-menu" aira-lablelledby="dropdownMenuButton1">
                                    <li>
                                        <a className="dropdown-item" href="/#">
                                            All 
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="/#">
                                            Front End
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="/#">
                                            Back End
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="/#">
                                            Data
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="/#">
                                            DevOps
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <h5>Number of results: (22)</h5>
                    </div>
                    <p>
                        1 to 5 of 22 items 
                    </p>
                    {books.map(book => (
                        <SearchBook book={book} key={book.id}/> 
                    ))}
                </div>
            </div>
        </div>
    )
}