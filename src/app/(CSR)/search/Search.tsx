"use client"

import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import { FormEvent, useState } from "react"
import { Form, Button, Spinner, Alert } from "react-bootstrap"
import styles from './page.module.css'


export default function SearchPage() {
    const [searchResult, setSearchResult] = useState<UnsplashImage[] | null>(null)
    const [searchResultLoading, setSearchResultLoading] = useState(false);
    const [searchResultError, setSearchResultError] = useState(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const query = formData.get("query")?.toString().trim();

        if (query) {
            try {
                setSearchResult(null);
                setSearchResultError(false);
                setSearchResultLoading(true);
                const response = await fetch("/api/search?query=" + query);
                const images: UnsplashImage[] = await response.json();
                setSearchResult(images);
            } catch(error) {
                console.log(error);
                setSearchResultError(true);
            } finally {
                setSearchResultLoading(false);
            }
            
        }
        
    }
    return(
        <div>
            <Alert>
                This page fetches data <strong>client side</strong> in order to not leak API credentials, the request is sent to a NextJs 
                <strong>route handler</strong> that runs on the server. This route handler then fetches the data from the Unsplash API and
                returns it to the client
            </Alert>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="search-input">
                    <Form.Label>Search Query</Form.Label>
                    <Form.Control name="query" placeholder="e.g cats, dogs, bird and etc" />
                </Form.Group>
                <Button type="submit" className ="mb-3" disabled={searchResultLoading}> Search</Button>
            </Form>
            <div className="d-flex flex-column align-items-center">
                {searchResultLoading && <Spinner animation="border" />}
                {searchResultError && <p>Something went Wrong</p>}
                {searchResult?.length === 0 && <p>Nothing found, Try another!</p>}
                
            </div>
            { searchResult && 
                <div className="text-center">
                    {
                        searchResult.map(image => {
                            return(
                                <Image 
                                src={image.urls.raw}
                                width={250}
                                height={250}
                                alt={image.description || "Beautiful Image"}
                                className={styles.image}
                                key={image.urls.raw}
                            />
                            )
                        })
                    }
                </div>
            }
            

        </div>
    )
}