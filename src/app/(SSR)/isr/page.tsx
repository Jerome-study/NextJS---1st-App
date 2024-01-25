import Image from "next/image";
import { UnsplashImage } from "../../../models/unsplash-image";
import Link from "next/link";
import type { Metadata } from "next";
import { Alert, Spinner} from "react-bootstrap";

export const metadata: Metadata = {
    title: "Incremental Static Regeneration - Image Gallery",
};

export const revalidate = 15;

export default async function Page() {
    const response = await fetch("https://api.unsplash.com/photos/random?client_id=" + process.env.UNSPLASH_ACCESS_KEY, {
        
    });
    const image: UnsplashImage = await response.json();
    const width = Math.min(image.width, 500);
    const height = (width / image.width) * image.height;

    return(
        <div className="d-flex flex-column align-items-center">
        <Alert>
            This pages uses incremental static regeneration. A new image is fetched every 15 seconds(after refreshing the page).
        </Alert>
        <Image 
            src={image.urls?.raw}
            width={width}
            height={height}
            alt={image.description? image.description : "A beautiful image"}
            className="rounded shadow mw-100 h-100"
        /> 
        by <Link href={"/users/" + image.user.username}>{image.user.username}</Link>
    </div>
    )
}