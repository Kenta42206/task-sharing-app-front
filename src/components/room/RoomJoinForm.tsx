import React from "react";
import { useAuth } from "../../context/AuthContext";
import { joinRoom } from "../../services/RoomService";
import { useTaskContext } from "../../context/TaskContext";

interface JoinRoomFormProps {
  onJoinRoom: (id: number) => void;
}

const RoomJoinForm: React.FC = () => {
  const { currentUser } = useAuth();
  const { setNewError } = useTaskContext();
  const handleJoinRoom = async () => {
    try {
      if (currentUser) {
        await joinRoom(currentUser.id, 1);
      }
    } catch (err) {
      setNewError("roomへの参加に失敗しました。");
    }
  };
  return (
    <>
      <button onClick={handleJoinRoom}>join</button>
    </>
  );
};

export default RoomJoinForm;
