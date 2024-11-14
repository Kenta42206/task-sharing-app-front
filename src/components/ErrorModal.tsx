import { useTaskContext } from "../context/TaskContext";

interface ErrorModalProps {
  errorMessage: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ errorMessage, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl mb-4">エラー</h2>
        <p>{errorMessage}</p>
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onClose}
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
