export interface Categories {
  ok?: boolean;
  data: {
    id: number;
    name: string;
    image: string;
    event: number[];
  };
}
