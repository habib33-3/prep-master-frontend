import { Edit, Trash2 } from "lucide-react";

type Props = {
  id: string;
};

const Toolbox = ({ id }: Props) => {
  const handleUpdate = (exerciseId: string) => {};
  const handleDelete = (exerciseId: string) => {};

  return (
    <div className="absolute right-3 top-3 flex space-x-2">
      <button
        onClick={() => handleUpdate(id)}
        className="rounded-full bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
      >
        <Edit size={16} />
      </button>
      <button
        onClick={() => handleDelete(id)}
        className="rounded-full bg-red-100 p-2 text-red-600 hover:bg-red-200"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default Toolbox;
