import { svgIcons } from "./functions/getSvg";
import style from "./styles/loading.module.css";

const Loading = ({ color }: { color?: string }) => {
  const icon = svgIcons.loading(color);

  return <article className={style.loading}>{icon}</article>;
};

export default Loading;
