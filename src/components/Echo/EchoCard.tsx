interface EchoCardProps {
  echo: EchoObject;
}

export function EchoCard({ echo }: EchoCardProps) {
  return (
    <div className="w-[380px] h-20 bg-[#727272] modal-container p-2 rounded-sm">
      <h1 className="text-xl font-semibold text-primary">{echo.title}</h1>
    </div>
  );
}
