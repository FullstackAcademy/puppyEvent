import { useDeletePuppyMutation, useGetPuppyQuery } from "./puppySlice";
import { useGetPuppiesQuery } from "./puppySlice";

export default function PuppyDetails({ selectedPuppyId, setSelectedPuppyId }) {
  // Fetch details of the selected puppy
  const { data: player, error, isLoading } = useGetPuppyQuery(selectedPuppyId, {
    skip: !selectedPuppyId, 
  });

 
  console.log("Fetched Player Data:", player);
  const [deletePuppy, { isLoading: isDeleting }] = useDeletePuppyMutation();
  const { refetch } = useGetPuppiesQuery();

  function removePuppy() {
    setSelectedPuppyId(null);
  }

  async function handleDelete() {
    try {
      await deletePuppy(selectedPuppyId).unwrap();
      refetch();
      setSelectedPuppyId(null);
    } catch (err) {
      console.error("We didn't delete the puppy...", err);
    }
  }


  let $details;
  if (!selectedPuppyId) {
    $details = <p>Please select a puppy to see more details.</p>;
  } else if (isLoading) {
    $details = <p>Loading puppy information...</p>;
  } else if (error) {
    $details = <p>Error fetching puppy details. Please try again later.</p>;
  } else if (player) {
    $details = (
      <>
        <h3>
          {player.name} #{player.id}
        </h3>
        <p>Breed: {player.breed}</p>
        <p>Status: {player.status}</p>
        <p>Team: {player.team?.name || "Unassigned"}</p>
        <button onClick={handleDelete} disabled={isDeleting}>
          Remove from roster
        </button>
        <figure>
          <img src={player.imageUrl} alt={player.name} />
        </figure>
      </>
    );
  }

  return (
    <aside>
      <h2>Selected Puppy</h2>
      {$details}
    </aside>
  );
}