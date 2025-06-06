export interface navLinkDataIF {
  label: string
  href: string
}

const navLinks: navLinkDataIF[] = [
  {
    label: 'BIOGRAPHY',
    href: '/biography'
  },
  {
    label: 'CALENDAR',
    href: '/calendar'
  },
  {
    label: 'MEDIA',
    href: '/media'
  },
  {
    label: 'BLOG',
    href: '/blog'
  },
  {
    label: 'SHOP',
    href: '/shop'
  },
  // {
  //   label: 'PRESS KIT',
  //   href: '/presskit'
  // },
  {
    label: 'CONTACT',
    href: '/contact'
  },
]

export default navLinks