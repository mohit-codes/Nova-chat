export const CreateMenu = ({ setShowStartMessage }) => {
  return (
    <div className="flex mb-3 px-3 justify-between">
      <button
        onClick={() => setShowStartMessage(true)}
        className="rounded-full px-2 py-1 shadow-md"
      >
        <i className="fa fa-comment mr-2"></i>New Message
      </button>
      <button className="rounded-full  px-2 py-1 shadow-md">
        <i className="fa fa-users mr-2"></i>New Group
      </button>
    </div>
  );
};
