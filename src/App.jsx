import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Login from "./components/Login";
import QuizPage from "./pages/Quiz";   
import Admin from "./components/Admin";
import About from "./components/About";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";
import { QuizDataProvider } from "./context/QuizDataContext";

function App() {
  return (
    <AuthProvider>
      <QuizDataProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            {/* Home Page with all sections */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <About />
                  <Reviews />
                  <Footer />
                </>
              }
            />

            <Route path="/login" element={<Login />} />

            <Route
              path="/quiz/:category"
              element={
                <ProtectedRoute>
                  <QuizPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </QuizDataProvider>
    </AuthProvider>
  );
}

export default App;