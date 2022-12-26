import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Admin from "./components/Admin";
import Editor from "./components/Editor";
import Home from "./components/Home";
import LinkPage from "./components/LinkPage";
import Lounge from "./components/Lounge";
import Register from "./components/Register";
import Login from "./components/Login";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";

import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="editor" element={<Editor />} />
          <Route path="admin" element={<Admin />} />
          <Route path="lounge" element={<Lounge />} />
        </Route>
        {/* Protected Routes with Roles */}
        {/* <Route element={<RequireAuth allowedRoles={[126]} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[125]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[124]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[123]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route> */}

        {/* Catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
