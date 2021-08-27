export const ChatCardWrapper = ({ children, callback }) => {
  return (
    <div
      className="py-4 px-5 h-14 border-t-2 border-b-2 border-gray-200 cursor-pointer"
      onClick={callback}
    >
      {children}
    </div>
  );
};
