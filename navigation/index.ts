import type { HorizontalNavItems, VerticalNavItems } from "@layouts/types";
import pagesHorizontal from "./pages-horizontal";
import pagesVertical from "./pages-vertical";

export default {
  vertical: [...pagesVertical] as VerticalNavItems,
  horizontal: [...pagesHorizontal] as HorizontalNavItems,
};
