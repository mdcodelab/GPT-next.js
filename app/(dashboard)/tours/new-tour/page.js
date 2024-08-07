import NewTour from "../../../../components/NewTour";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

function NewTourPage() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewTour></NewTour>
    </HydrationBoundary>
  );
}

export default NewTourPage;
