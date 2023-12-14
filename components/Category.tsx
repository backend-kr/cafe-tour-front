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
      style={{
        color: category.isActive ? "#fff" : (category.color as string),
        borderColor: category.color as string,
        backgroundColor: category.isActive
          ? (category.color as string)
          : "#fff",
      }}
      className="px-4 py-[2px] border text-sm rounded-full inline-block shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)]"
    >
      {category.name}
    </button>
  );
};

export default Category;
