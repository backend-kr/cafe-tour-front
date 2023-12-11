interface ICategory {
  category: {
    id: string;
    name: string;
    color: string;
    active: boolean;
  };
}

const Category = ({ category }: ICategory) => {
  return (
    <button
      id={category.id}
      style={{
        color: category.color,
        borderColor: category.color,
        backgroundColor: category.active ? category.color : "#fff",
      }}
      className="px-4 py-[2px] border text-sm rounded-full inline-block shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)]"
    >
      {category.name}
    </button>
  );
};

export default Category;
