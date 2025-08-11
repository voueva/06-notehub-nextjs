import { getSingleNote } from "@/app/lib/api";
import { QueryClient } from "@tanstack/react-query";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetails({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(id),
  });
  
  return <h2>NoteDetails: { id }</h2>;
}
