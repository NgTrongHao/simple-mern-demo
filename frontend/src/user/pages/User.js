import React from "react";
import { UserList } from "../components/UserList";

const User = () => {
  const USERS = [
    {
      id: "u1",
      name: "John Doe",
      image: "https://mia.vn/media/uploads/blog-du-lich/cua-dong-ben-thanh-1693128198.jpg",
      places: 3,
    },
  ];

  return (
    <>
      <UserList items={USERS} />
    </>
  );
};

export default User;
