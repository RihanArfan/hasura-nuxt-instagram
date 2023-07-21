export default function ({
  id,
  title = "Something went wrong",
  description,
}: {
  id: string;
  title?: string;
  description?: string;
}) {
  const toast = useToast();
  return toast.add({
    id,
    title,
    description,
    color: "red",
    icon: "i-heroicons-exclamation-circle",
  });
}
