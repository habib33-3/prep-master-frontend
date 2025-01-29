import { Edit } from "lucide-react";
import { Link } from "react-router";

import useDeleteExercise from "@/hooks/exercise/useDeleteExercise";

import DeleteConfirmationModal from "@/components/modal/DeleteConfirmationModal";

type Props = {
  id: string;
};

const Toolbox = ({ id }: Props) => {
  const { handleDeleteExercise } = useDeleteExercise(id);

  return (
    <div className="absolute right-3 top-3 flex space-x-2">
      <Link to={`/exercise/${id}`}>
        <button className="rounded-full bg-blue-100 p-2 text-blue-600 hover:bg-blue-200">
          <Edit size={16} />
        </button>
      </Link>
      <DeleteConfirmationModal handleDelete={handleDeleteExercise} />
    </div>
  );
};

export default Toolbox;
