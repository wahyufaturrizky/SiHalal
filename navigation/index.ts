import pagesHorizontal from './pages-horizontal'
import pagesVertical from './pages-vertical'
import type { HorizontalNavItems, VerticalNavItems } from '@layouts/types'

export default {
  vertical: [...pagesVertical] as VerticalNavItems,
  horizontal: [...pagesHorizontal] as HorizontalNavItems,
}
