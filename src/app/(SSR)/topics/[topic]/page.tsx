import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import styles from "./page.module.css"
import { Alert } from "react-bootstrap";
import { Metadata } from "next";
interface PageProps {
    params: {
        topic: string
    }
    // searchParams: {
    //     [key: string] : string | string[] | undefined
    // }
}

// Kung ano lang ang nakalagay sa generateStaticParams ang puwedeng ma-access ng client, set to false
// export const dynamicParams = false; 


// Make the title dynamic depends in the
export function generateMetadata({ params: { topic }} : PageProps): Metadata {
    return {
        title: topic + " - Image Gallery"
    }
}


export async function generateStaticParams() {
    return ["fitness", "coding", "health"].map(topic => ({topic}))
}

export default async function Page( {params: {topic}}:  PageProps) {
    const response = await fetch(`https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
    const images: UnsplashImage[] = await response.json()
    return(
        <div>
            <Alert>
        This page uses  <strong>generateStaticParams</strong> to render and cache static pages at build time, even though the url
        has a dynamic paramater. Pages that are not included in generateStatticParams will be fetched and rendered on access and then
        cached for the subsequent request (This can be disabled)
            </Alert>
            <div className="text-center">
                {
                    images.map(image => {
                        return(
                            <Image 
                                src={image.urls.raw}
                                width={250}
                                height={250}
                                alt={image.description? image.description : "beautiful image"}
                                key={image.urls.raw}
                                className={styles.image}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}