export const CreateMenu = ({ setShowStartMessage, setShowCreateGroupForm }) => {
  return (
    <div className="flex mb-3 px-3 mt-3 justify-evenly md:justify-between">
      <button
        onClick={() => setShowStartMessage(true)}
        className="bg-white rounded-full px-3 py-1 shadow-md"
      >
        <i className="fa fa-comment mr-2"></i>New Chat
      </button>
      <button
        onClick={() => setShowCreateGroupForm(true)}
        className="bg-white rounded-full  px-3 py-1 shadow-md"
      >
        <i className="fa fa-users mr-2"></i>New Group
      </button>
    </div>
  );
};
