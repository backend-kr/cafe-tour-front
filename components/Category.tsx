import { IList } from "../shared/hooks/useActive";

interface ICategories {
  category: IList;
  onClick: () => void;
}

const Category = ({ category, onClick }: ICategories) => {
  return (
    <button
      id={category.id as string}
      onClick={onClick}
      className="w-full py-2 text-sm"
    >
      {category.name}
    </button>
  );
};

export default Category;
