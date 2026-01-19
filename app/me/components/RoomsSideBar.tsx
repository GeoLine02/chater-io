import Logo from "@/app/shared/components/Logo";
import UserPreivew from "@/app/shared/components/UserPreivew";
import RoomsList from "./RoomsList";
import CreateRoomBtn from "./CreateRoomBtn";

export default async function RoomsSideBar() {
  return (
    <aside className="border-r border-border-default w-full max-w-75 bg-bg-sidebar h-full">
      <section className="p-4 border-b border-border-default">
        <Logo />
      </section>
      <section className="border-b border-border-default">
        <UserPreivew />
      </section>
      <section className="border-b border-border-default">
        <RoomsList />
      </section>
      <section>
        <CreateRoomBtn />
      </section>
    </aside>
  );
}
