import { useSelector } from "react-redux";
import { StoreType } from "../redux/store";
import { useEffect } from "react";
import { AlertStatetype, hideAlert } from "../redux/slicers/alertSlicer";
import { useDispatch } from "react-redux";
import "../css/alertStyle.css";

export default function Alert() {
  let {
    show: visibility,
    delay,
    msg,
  } = useSelector((state: StoreType) => state.alert) as AlertStatetype;
  const dispatch = useDispatch();
  useEffect(() => {
    if(!msg)return
    delay=delay||msg?.length*50
    setTimeout(() => {
      dispatch(hideAlert(null));
    }, (delay as number) + 400);
  });

  if (!visibility) return <></>;

  return (
    <div className="alert scale_animation">
      <span>{msg}</span>
    </div>
  );
}
