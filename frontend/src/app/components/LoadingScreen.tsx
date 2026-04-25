export function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md text-center space-y-6">
        <h2 className="text-2xl tracking-tight">Analyzing your situation…</h2>
        <p className="text-muted-foreground text-lg">
          Finding what is relevant for you
        </p>

        <div className="flex justify-center items-center space-x-2 pt-4">
          <div className="w-3 h-3 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-3 h-3 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-3 h-3 bg-accent rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}
