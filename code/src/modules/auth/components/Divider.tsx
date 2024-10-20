export default function Divider() {
  return (
    <div className="flex items-center my-3">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="flex-shrink mx-4 text-gray-500">or</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
}
