 
interface DateProps {
  dateString: string;
}

export const Date = ({ dateString }: DateProps) => {
  
  return <time dateTime={dateString}>{dateString}</time>;
}
