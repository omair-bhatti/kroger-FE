import { Fragment } from "react";
import { ChooseProject, ManageGeohash, ManageSearch } from "./features";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<ChooseProject />} />
          <Route path="/geohash" element={<ManageGeohash />} />
          <Route path="/kroger" element={<ManageSearch />} />
        </Routes>
      </Router>
      ;
    </Fragment>
  );
}

export default App;
