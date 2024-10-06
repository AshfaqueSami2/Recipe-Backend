import { AuthProvider } from "@/src/utils/AuthContext";
import Navbar from "../components/Ui/navbar";
import { Toaster } from "react-hot-toast";
import "@/src/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Toaster />
          
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
