import { useState } from "react";
import { useAddPuppyMutation } from "./puppySlice";
import { useGetPuppiesQuery } from "./puppySlice";

/**
 * @component
 * Users can add puppies to the roster by submitting this form.
 */
export default function PuppyForm() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");

  // TODO: Use the `addPuppy` mutation to add a puppy when the form is submitted

  // Placeholder image w/ random photos of dogs
  const imageUrl = "https://loremflickr.com/200/300/dog";
  const { refetch } = useGetPuppiesQuery();
  const [addPuppy, { isLoading, error }] = useAddPuppyMutation();

  const postPlayer = async (event) => {
    event.preventDefault();
    const newPlayer = { name, breed, imageUrl };
    try {
      await addPuppy(newPlayer).unwrap();
      refetch();
      setName("");
      setBreed("");
    } catch (err) {
      console.error("Puppy wasnt added...", err);
    }
  };

  return (
    <>
      <h2>Add a Puppy</h2>
      <div className="formy">
      <form onSubmit={postPlayer}>
        <label>
          Name
          <input
            name="puppyName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Breed
          <input
            name="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </label>
        <button>Add to Roster</button>
        {isLoading && <output>Uploading puppy information...</output>}
        {error && <output>{error.message}</output>}
      </form>
      </div>
    </>
  );
}
