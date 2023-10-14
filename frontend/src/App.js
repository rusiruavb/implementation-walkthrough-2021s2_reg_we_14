import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-notifications/lib/notifications.css";
import "./App.scss";
import { NotificationContainer } from "react-notifications";
import PageRoutes from "./Routes";

function App() {
  return (
    <div>
      <PageRoutes />
      <NotificationContainer />
    </div>
  );
}

export default App;
