import redirects from "@/assets/json/redirect.json";

export default function ({ route, redirect, error }) {
  const redirectItem = redirects.find((r) => r.url === route.path);

  if (redirectItem) {
    return redirect(301, redirectItem.redirectUrl);
  }
}
