export type Course = {
  title: string;
  price: number;
  image: string;
  id: number;
  description?: string;
  quantity?: number | undefined;
};

export type ButtonProps = {
  type: "add" | "remove" | "checkout";
  title: string;
  onClick?: () => void;
  disable: boolean;
};
