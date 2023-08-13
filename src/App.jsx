import { useEffect } from "react";
import "./App.css";
import { createClient } from "@supabase/supabase-js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import LogPage from "./pages/Log";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY,
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          Component={() => <HomePage supabase={supabase} />}
        />
        <Route
          exact
          path="/log"
          Component={() => <LogPage supabase={supabase} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
