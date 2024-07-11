import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AuthProvider>
  );
}
