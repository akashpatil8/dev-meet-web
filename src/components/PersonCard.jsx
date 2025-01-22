export default function PersonCard({ personData }) {
  const { firstName, lastName, imageUrl, about, age, gender } = personData;

  return (
    <div className="card card-compact w-96 bg-base-300 shadow-xl">
      <figure className="h-96">
        <img src={imageUrl} alt="Shoes" className="bg-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        {age && gender && (
          <p>
            {age}, {gender}
          </p>
        )}
        <div className="card-actions justify-end">
          <button className="btn btn-outline">Ignore</button>
          <button className="btn btn-primary">Interested</button>
        </div>
      </div>
    </div>
  );
}
