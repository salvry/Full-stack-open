import { useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";

const Notification = () => {
  const text = useSelector((state) => state.notification.text);
  const variant = useSelector((state) => state.notification.variant);

  return text ? (
    <Alert variant={variant} key={variant}>
      {text}
    </Alert>
  ) : null;
};
export default Notification;
