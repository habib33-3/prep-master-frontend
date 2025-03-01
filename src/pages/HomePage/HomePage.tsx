import SearchBar from "@/shared/SearchBar/SearchBar";

import CreateExerciseModal from "@/components/modal/CreateExerciseModal";

import ExerciseCards from "./ExerciseCards/ExerciseCards";

const Home = () => (
  <div className="my-10 text-center text-3xl">
    <SearchBar />
    <CreateExerciseModal />
    <ExerciseCards />
  </div>
);

export default Home;
