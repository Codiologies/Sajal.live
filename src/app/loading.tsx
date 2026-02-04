export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="relative w-16 h-16">
        <div className="w-16 h-16 border-4 border-white/10 border-t-white rounded-full animate-spin" />
      </div>
    </div>
  );
}
