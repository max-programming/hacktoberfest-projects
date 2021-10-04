export default function Search() {
  return (
    <form className="w-2/4 m-2 form-control">
      <div className="relative">
        <input
          placeholder="Search"
          className="w-full pr-16 input input-primary input-bordered border-primary"
          type="text"
        />
        <button className="absolute top-0 right-0 rounded-l-none btn btn-primary bg-primary border-primary hover:bg-hero-button-hover">
          go
        </button>
      </div>
    </form>
  );
}
