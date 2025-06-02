
import { MovieChatbot } from "@/components/MovieChatbot";
import { AuthGuard } from "@/components/AuthGuard";

const Index = () => {
  return (
    <AuthGuard>
      <MovieChatbot />
    </AuthGuard>
  );
};

export default Index;
