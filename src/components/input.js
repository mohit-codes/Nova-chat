export const Input = ({ callback, placeholder, value, type }) => {
  return (
    <input
      required
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={callback}
      className="max-w-60 md:w-72 bg-transparent border-2 px-3 py-2 outline-none border-black rounded-md"
    />
  );
};
