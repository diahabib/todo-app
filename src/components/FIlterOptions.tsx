const FilterOptions = ({
  filterState,
  changeTodosState,
}: {
  filterState: string;
  changeTodosState: (state: string) => void;
}) => {
  return (
    <div className="flex gap-4 self-center basis-full lg:basis-3/6 relative top-16 lg:top- text-center">
      <button
        className={`filter-items ${
          filterState === "all" ? "selectedOption" : ""
        }`}
        onClick={() => {
          changeTodosState("all");
        }}
      >
        All
      </button>
      <button
        className={`filter-items ${
          filterState === "active" ? "selectedOption" : ""
        }`}
        onClick={() => {
          changeTodosState("active");
        }}
      >
        Active
      </button>
      <button
        className={`filter-items ${
          filterState === "completed" ? "selectedOption" : ""
        }`}
        onClick={() => {
          changeTodosState("completed");
        }}
      >
        Completed
      </button>
    </div>
  );
};

export default FilterOptions;
