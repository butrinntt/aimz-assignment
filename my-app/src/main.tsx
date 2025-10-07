import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider, ThemeToggle } from "./components";
import { CreateUser, EditUser, UserCharts, UserList } from "./pages";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/create-user" element={<CreateUser />} />
              <Route path="/edit-user/:id" element={<EditUser />} />
              <Route path="/user-charts" element={<UserCharts />} />
            </Routes>
          </BrowserRouter>
          <ThemeToggle />
        </div>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
