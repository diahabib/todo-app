//type ChangeTodosState = (state) => void;

const FilterOptions = ({
  filterState,
  filterStateOptions,
  changeTodosState,
}) => {
  return (
    <div className="flex gap-4 self-center basis-full lg:basis-3/6 relative top-16 lg:top- text-center">
      <button
        className={`filter-items ${
          filterState === filterStateOptions.all ? "selectedOption" : ""
        }`}
        onClick={() => {
          changeTodosState(filterStateOptions.all);
        }}
      >
        All
      </button>
      <button
        className={`filter-items ${
          filterState === filterStateOptions.active ? "selectedOption" : ""
        }`}
        onClick={() => {
          changeTodosState(filterStateOptions.active);
        }}
      >
        Active
      </button>
      <button
        className={`filter-items ${
          filterState === filterStateOptions.completed ? "selectedOption" : ""
        }`}
        onClick={() => {
          changeTodosState(filterStateOptions.completed);
        }}
      >
        Completed
      </button>
    </div>
  );
};

export default FilterOptions;
