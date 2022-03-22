import fetcher from "./fetcher";

export const auth = (
  mode: "sigin" | " signup",
  body: { email: string; password: string }
) => {
  return fetcher(`/${mode}`, body);
};
