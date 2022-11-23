import { format, parseISO } from "date-fns";

export default function Date({ dateString }: { dateString: string }) {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>{format(date, "yyyy年 MM月 dd日 HH:mm")}</time>
  );
}
