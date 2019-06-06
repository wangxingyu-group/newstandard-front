import defaultSettings from '@/settings'

const title = defaultSettings.title || '中科软智能联络中心'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
