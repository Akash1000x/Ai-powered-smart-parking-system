declare module "next-auth" {
  type User = {
    id: string;
    name: string;
    email: string;
    placeId: string;
  };
}
