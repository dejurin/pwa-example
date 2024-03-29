import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

import Header from "~/components/starter/header/header";
import Footer from "~/components/starter/footer/footer";

import styles from "./styles.css?inline";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    public: true,
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 10,
    sMaxAge: 15,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  useStyles$(styles);
  const serverTime = useServerTimeLoader();
  return (
    <>
      <Header />
      <h1>{serverTime.value.date}</h1>
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
