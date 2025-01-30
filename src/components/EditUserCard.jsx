export default function EditUserCard({
  userData,
  setIsInEditMode,
  isInEditMode,
}) {
  const { firstName, lastName, imageUrl, about, age, gender } = userData;

  return (
    <div
      className={`card card-compact w-96 bg-base-300 shadow-xl md:block ${isInEditMode ? "hidden" : ""}`}
    >
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
        <div className="card-actions justify-end md:hidden">
          <button
            onClick={() => setIsInEditMode(true)}
            className="btn btn-primary"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
