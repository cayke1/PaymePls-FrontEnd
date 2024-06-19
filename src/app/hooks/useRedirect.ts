export const useRedirect = () => ({
  to: (path: string) => {
    if (typeof window !== "undefined") {
      window.location.replace(path);
    }
  },
});
