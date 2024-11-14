import { useTaskContext } from "../../context/TaskContext";
import { Room } from "../../types/Room";

interface RoomCellProps {
  room: Room;
  alreadyJoined: boolean;
}

const RoomCell: React.FC<RoomCellProps> = ({ room, alreadyJoined }) => {
  const { handleJoinRoom } = useTaskContext();
  const joinRoom = () => {
    handleJoinRoom(room.id);
  };
  console.log(alreadyJoined);
  return (
    <div className="border rounded-lg m-2 p-4 flex justify-between items-center shadow-sm">
      <div className="flex space-x-4">
        <p className="text-sm font-medium text-gray-700">{room.id}</p>
        <p className="text-sm font-medium text-gray-700">{room.name}</p>
      </div>
      {!alreadyJoined ? (
        <button
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
          onClick={joinRoom}
        >
          参加する
        </button>
      ) : (
        <button
          className="bg-slate-400 text-white py-2 px-4 rounded cursor-not-allowed"
          onClick={joinRoom}
          disabled
        >
          参加済み
        </button>
      )}
    </div>
  );
};

export default RoomCell;
