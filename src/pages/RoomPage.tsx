import React, { useEffect, useState } from "react";
import { joinRoom } from "../services/RoomService";
import RoomJoinForm from "../components/room/RoomJoinForm";
import RoomHeader from "../components/room/RoomHeader";
import { useTaskContext } from "../context/TaskContext";
import RoomCell from "../components/room/RoomCell";
import { Room } from "../types/Room";

const RoomPage: React.FC = () => {
  const { rooms, roomsForJoin, handleRefreshRoom } = useTaskContext();

  return (
    <div className="flex flex-col h-screen">
      <RoomHeader onRefresh={handleRefreshRoom} />
      <h2 className="text-xl font-semibold text-gray-800 m-2">
        参加していないルーム
      </h2>
      {roomsForJoin.map((room) => (
        <RoomCell key={room.id} room={room} alreadyJoined={false} />
      ))}
      <h2 className="text-xl font-semibold text-gray-800 m-2">
        参加しているルーム
      </h2>
      {rooms.map((room) => (
        <RoomCell key={room.id} room={room} alreadyJoined={true} />
      ))}
    </div>
  );
};

export default RoomPage;
