import Logo from "../../../shared/Logo";
import UserPreivew from "../../../shared/UserPreivew";

export default function ChatSidemenu() {
  return (
    <aside className="broder-r border-border-default w-full max-w-75 bg-bg-sidebar min-h-full">
      <section className="p-4 border-b border-border-default">
        <Logo />
      </section>
      <section className="border-b border-border-default">
        <UserPreivew />
      </section>
    </aside>
  );
}
