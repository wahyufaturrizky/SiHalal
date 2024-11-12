import type { RouterConfig } from "@nuxt/schema";
import type { RouteRecordRaw } from "vue-router";

// const emailRouteComponent = () => import('@/pages/apps/email/index.vue')

// 👉 Redirects
const redirects: RouteRecordRaw[] = [
  // ℹ️ We are redirecting to different pages based on role.
  // NOTE: Role is just for UI purposes. ACL is based on abilities.
  {
    path: "/",
    name: "index",
    meta: {
      middleware: (to) => {
        const { data: sessionData, status } = useAuth();
        console.log("ini status ", status.value);

        // const userRole = sessionData.value?.roles

        if (status.value == "authenticated") return { name: "index" };

        return { name: "login", query: to.query };
      },
    },
    component: h("div"),
  },
];

const routes: RouteRecordRaw[] = [
  // Email filter
  // {
  //   path: '/apps/email/filter/:filter',
  //   name: 'apps-email-filter',
  //   component: emailRouteComponent,
  //   meta: {
  //     navActiveLink: 'apps-email',
  //     layoutWrapperClasses: 'layout-content-height-fixed',
  //   },
  // },
  // Email label
  // {
  //   path: '/apps/email/label/:label',
  //   name: 'apps-email-label',
  //   component: emailRouteComponent,
  //   meta: {
  //     // contentClass: 'email-application',
  //     navActiveLink: 'apps-email',
  //     layoutWrapperClasses: 'layout-content-height-fixed',
  //   },
  // },
  // {
  //   path: '/dashboards/logistics',
  //   name: 'dashboards-logistics',
  //   component: () => import('@/pages/apps/logistics/dashboard.vue'),
  // },
  // {
  //   path: '/dashboards/academy',
  //   name: 'dashboards-academy',
  //   component: () => import('@/pages/apps/academy/dashboard.vue'),
  // },
  // {
  //   path: '/apps/ecommerce/dashboard',
  //   name: 'apps-ecommerce-dashboard',
  //   component: () => import('@/pages/dashboards/ecommerce.vue'),
  // },
];

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  routes: (scannedRoutes) => [...redirects, ...routes, ...scannedRoutes],
  scrollBehaviorType: "smooth",
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: "smooth", top: 60 };

    return { top: 0 };
  },
};
