import { AppProvider } from "@/src/app/providers";
import { HomePage } from "@/src/views/home-page";

export default function Home() {
  return (
    <AppProvider>
      <HomePage />
    </AppProvider>
  );
}
