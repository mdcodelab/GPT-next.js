
import Link from "next/link";
function ToursCard({tour}) {
    const {id, city, country}=tour;

  return (
    <Link href={`/tours/${id}`} className="card card-compact rounded-xl bg-base-100">
        <div className="card-body items-center text-center">
        <h2 className="card-title text-center">{city}, {country}</h2>
        </div>
    </Link>
  )
}

export default ToursCard;
