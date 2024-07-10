
import {getSingleTour} from "../../../../utils/actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import TourInfo from "../../../../components/TourInfo";

async function SingleTourPage({params}) {
const tour = await getSingleTour(params.id);
console.log(tour);

if(!tour) {
redirect("/tours")
}

  return (
    <div className="mx-auto">
      <Link href="/tours" className="btn btn-secondary mb-6">Back to Tours</Link>
      <TourInfo tour={tour}></TourInfo>
    </div>
  )
}

export default SingleTourPage;
