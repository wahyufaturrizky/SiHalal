// export default defineNuxtPlugin(() => {
//   if (process.env.NODE_ENV === 'production') {
//     (function (c, l, a, r, i, t, y) {
//       c[a] = c[a] || function () {
//         (c[a].q = c[a].q || []).push(arguments)
//       }
//       t = l.createElement(r)
//       t.async = 1
//       t.src = `https://www.clarity.ms/tag/${i}`
//       y = l.getElementsByTagName(r)[0]
//       y.parentNode.insertBefore(t, y)
//     })(window, document, 'clarity', 'script', 'r9lyuwrp93') // replace with your Clarity ID
//   }
// })

import { useMyAuthUserStore } from "~/stores/authUser";

export default defineNuxtPlugin(async () => {
  if (process.env.NODE_ENV === "production") {
    const authUserStore = useMyAuthUserStore();
    await authUserStore.getSession();

    const currentUserId = authUserStore.userId || "0";
    const currentUserIdWithoutDash = currentUserId.replace(/-/g, "");

    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = `https://www.clarity.ms/tag/${i}`;
      t.onload = () => {
        if (typeof window.clarity === "function") {
          window.clarity("set", "userId", currentUserIdWithoutDash.toString());
        } else {
          console.warn("Clarity not loaded yet");
        }
      };
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", "r9lyuwrp93");
  }
});
