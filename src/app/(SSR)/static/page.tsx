import Image from "next/image";
import { UnsplashImage } from "../../models/unsplash-image";
import Link from "next/link";
import type { Metadata } from "next";
import { Alert } from "react-bootstrap";

export const metadata: Metadata = {
    title: "Static Fetching - Image Gallery",
};

export default async function StaticPage() {
    const response = await fetch("https://api.unsplash.com/photos/random?client_id=" + process.env.UNSPLASH_ACCESS_KEY);
    const image: UnsplashImage = await response.json();
    const width = Math.min(image.width, 500);
    const height = (width / image.width) * image.height;

    return(
        <div className="d-flex flex-column align-items-center">
            <Alert>
                This pages fetches and caches data at build time. Even thought the Unsplash API always returns a new image
                after refreshing the page until we compile the project again
            </Alert>
            <Image 
                src={image.urls.raw}
                width={width}
                height={height}
                alt={image.description}
                className="rounded shaodw mw-100 h-100"
            /> 
            by <Link href={"/users/" + image.user.username}>{image.user.username}</Link>
        </div>
    )

}