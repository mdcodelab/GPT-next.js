
import {getSingleTour, generateTourImage} from "../../../../utils/actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import TourInfo from "../../../../components/TourInfo";
import Image from "next/image";

async function SingleTourPage({params}) {
const tour = await getSingleTour(params.id);
console.log(tour);

if(!tour) {
redirect("/tours")
}
const tourImage = await generateTourImage({city: tour.city, country: tour.country})
  return (
    <div className="mx-auto w-full max-w-4xl">
      <Link href="/tours" className="btn btn-secondary mb-8">Back to Tours</Link>
      {tourImage ? <div className="mx-auto mb-10" style={{ maxWidth: "300px" }}>
        <Image src={tourImage} width={300} height={300} className="rounded-xl shadow-xl w-96 
        h-96 object-cover" alt = {tour.title} priority></Image>
      </div> : null}
      <TourInfo tour={tour}></TourInfo>
    </div>
  )
}

export default SingleTourPage;
