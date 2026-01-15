import { Spinner } from "@/components/ui/spinner";

export default function SpinnerLoader() {
  return (
    <div className="flex items-center gap-6">
      <Spinner className="size-6 text-purple-500" />
    </div>
  );
}
