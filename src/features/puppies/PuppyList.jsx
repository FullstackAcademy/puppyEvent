import { useGetPuppiesQuery } from "./puppySlice";

/**
 * @component
 * Shows a list of puppies in the roster.
 * Users can select a puppy to see more information about it.
 */
export default function PuppyList({ setSelectedPuppyId }) {
  const { data: players = [], error, isLoading } = useGetPuppiesQuery();

  if (!players || players.length === 0) {
    return <p>No puppies available.</p>;
  }
  
  return (
    <article>
      <h2>Roster</h2>
      <ul className="puppies">
        {isLoading && <li>Loading puppies...</li>}
        {players.map((players) => (
          <li key={players.id}>
            <h3>
              {players.name} #{players.id}
            </h3>
            <figure>
              <img src={players.imageUrl} alt={players.name} />
            </figure>
            <button onClick={() => setSelectedPuppyId(players.id)}>
              See details
            </button>  
          </li>
        ))}
      </ul>
    </article>
  );
}
