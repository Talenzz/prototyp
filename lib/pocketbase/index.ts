import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.POCKETBASE_URL);

if (typeof document !== "undefined") {
  pb.authStore.loadFromCookie(document.cookie);

  pb.authStore.onChange(() => {
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
  });
}

export { pb };