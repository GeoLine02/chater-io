export default function UserPreivew() {
  return (
    <div className="flex gap-3 p-4">
      <div className="relative">
        <div className="w-14 aspect-square rounded-full bg-status-error flex items-center justify-center">
          <h1 className="text-3xl font-medium text-white">A</h1>
        </div>
        <div className="w-4 aspect-square rounded-full bg-status-online absolute bottom-0 right-0"></div>
      </div>
      <div>
        <h1 className="text-lg font-medium text-white">Alex</h1>
        <h2 className="text-sm font-medium text-text-secondary">
          Alex@example.com
        </h2>
      </div>
    </div>
  );
}
