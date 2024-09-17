interface QuickActionButtonProps {
  action: string;
}

export default function QuickActionButton({ action }: QuickActionButtonProps) {
  return (
    <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-[20px]">
      {action}
    </button>
  );
}
