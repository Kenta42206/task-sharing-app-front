import { faPlus, faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface RoomHeaderProps {
  onRefresh: () => void;
}

const RoomHeader: React.FC<RoomHeaderProps> = ({ onRefresh }) => {
  return (
    <div className="block w-full px-4 py-2 mx-auto text-white bg-slate-900 shadow-md rounded-md">
      <div className="container flex items-center justify-between mx-auto text-gray-100">
        <div className="mr-4 block py-1.5 text-base text-gray-200 font-semibold">
          ルーム管理
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => console.log("TODO: add new room")}
            className="flex items-center p-2 text-gray-200 hover:text-gray-100"
            aria-label="ルーム作成"
          >
            <FontAwesomeIcon icon={faPlus} className="w-5 h-5" />
          </button>
          <button
            onClick={onRefresh}
            className="flex items-center p-2 text-gray-200 hover:text-gray-100"
            aria-label="リフレッシュ"
          >
            <FontAwesomeIcon icon={faSync} className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomHeader;