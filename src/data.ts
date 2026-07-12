import { CarouselTemplate, TextPreset, StickerPreset, CarouselSlide } from './types';

export const TEXT_PRESETS: TextPreset[] = [
  {
    id: 'tp-1',
    name: 'Modern Bold',
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: '-0.02em',
    fontFamily: 'Inter',
  },
  {
    id: 'tp-2',
    name: 'Technical Mono',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: '0.05em',
    fontFamily: 'Geist Mono',
  },
  {
    id: 'tp-3',
    name: 'Elegant Serif',
    fontSize: 36,
    fontWeight: '600',
    letterSpacing: '0em',
    fontFamily: 'Playfair Display',
  },
  {
    id: 'tp-4',
    name: 'Display Huge',
    fontSize: 64,
    fontWeight: '800',
    letterSpacing: '-0.04em',
    fontFamily: 'Inter',
  },
  {
    id: 'tp-5',
    name: 'Avant-Garde Expressive',
    fontSize: 44,
    fontWeight: '800',
    letterSpacing: '-0.03em',
    fontFamily: 'Syne',
  },
  {
    id: 'tp-6',
    name: 'Cyber Brutalist',
    fontSize: 42,
    fontWeight: '700',
    letterSpacing: '-0.01em',
    fontFamily: 'Space Grotesk',
  },
  {
    id: 'tp-7',
    name: 'Minimalist Clean',
    fontSize: 32,
    fontWeight: '500',
    letterSpacing: '-0.01em',
    fontFamily: 'Outfit',
  },
  {
    id: 'tp-8',
    name: 'Rich Developer Mono',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: '0.02em',
    fontFamily: 'JetBrains Mono',
  }
];

export const STICKER_PRESETS: StickerPreset[] = [
  {
    id: 'st-1',
    name: 'Neon Heart',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxNGkJJUOuxD3Iz6oZxj_iRINsoO_s3BpG6BxHJs1nZAv_XFI37SyPUxeSFDorlTD-xQrbqepel_QDoKaRfdN1PZARVnc6ZRYM-ClYQl1PIf_xv3O7tEfT_YG304JtaafEPcDpWein8DYTLub9PgOvWKyW5aJmqCJPuABLF56ZAOrOjNpqgy0NDiq1lDHoc-d8WIrEzxF5PJ5eTdRzis4EUIZtXViZgf0berBw63uS7zlWFauO2kZNqQ'
  },
  {
    id: 'st-2',
    name: 'Vector Shapes',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_joBWYua4FBRxG6GEptyHsmgMu_TyXCqCrEsdtGV9silapdqNsnZyYkSnTsUMbk2-nBOeHPN-l5l0mhVWdgcHnnaly7-YOOLmC86jOwMVAAWZuL0ThoTbUGXuFrLhzM_yashSzDBQzmYWndgqPaRRZT2U9mwOkI1Oh2s-pifrcSEa_9cUAhzGJ5tkBCMka7rNqr2k_AHr3yWOh6UoFHUFHIeKYcCFyNQZmV-HTNr_kjhOggiiH4gn6w'
  },
  {
    id: 'st-3',
    name: 'Verified Badge',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg'
  },
  {
    id: 'st-4',
    name: 'Editorial Quote',
    image: 'https://raw.githubusercontent.com/google/material-design-icons/master/png/editor/format_quote/materialicons/48dp/2x/baseline_format_quote_white_48dp.png'
  },
  {
    id: 'st-5',
    name: 'Idea Bulb',
    image: 'https://raw.githubusercontent.com/google/material-design-icons/master/png/action/lightbulb/materialicons/48dp/2x/baseline_lightbulb_white_48dp.png'
  },
  {
    id: 'st-6',
    name: 'Engagement Star',
    image: 'https://raw.githubusercontent.com/google/material-design-icons/master/png/toggle/star/materialicons/48dp/2x/baseline_star_white_48dp.png'
  },
  {
    id: 'st-7',
    name: 'Warning/Alert',
    image: 'https://raw.githubusercontent.com/google/material-design-icons/master/png/alert/warning/materialicons/48dp/2x/baseline_warning_white_48dp.png'
  },
  {
    id: 'st-8',
    name: 'Flash Power',
    image: 'https://raw.githubusercontent.com/google/material-design-icons/master/png/image/flash_on/materialicons/48dp/2x/baseline_flash_on_white_48dp.png'
  },
  {
    id: 'st-9',
    name: 'Pointer Hand',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Hand-cursor.svg'
  },
  {
    id: 'st-10',
    name: 'Share Arrow',
    image: 'https://raw.githubusercontent.com/google/material-design-icons/master/png/social/share/materialicons/48dp/2x/baseline_share_white_48dp.png'
  }
];

export const TEMPLATES: CarouselTemplate[] = [
  {
    id: 'temp-1',
    name: 'City Vibes',
    slidesCount: 12,
    views: '14.2k',
    isPro: true,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAl432cCgeYH3ee7ZGoqFdYrFlBtSgzQY1pY0lXcdnEl0RGHgpj45UbyqAhn6tTb3r8Ud_8C9zaYPSYIrnJUKQ9nPe0ppHRUliidUx2BUtE2YK3yxxbvKGbzBT7nwLUQCFgLcaxV2kQo-YnB4D_6OVnLKVxys-XodKnzF54cHoKqAYwkdoLqUiDqOrX-EQvO1XOhW2OHvgEwEjdqX11dg3dt3qHtn7H3PG5jo9owb26bCqmqEt0T7eEQQ',
    aesthetic: 'Aesthetic',
    slides: [
      {
        id: 's-1-1',
        slideNumber: '01',
        title: 'City Vibes',
        subtitle: 'Unlocking the power of moody visual storytelling.',
        bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAl432cCgeYH3ee7ZGoqFdYrFlBtSgzQY1pY0lXcdnEl0RGHgpj45UbyqAhn6tTb3r8Ud_8C9zaYPSYIrnJUKQ9nPe0ppHRUliidUx2BUtE2YK3yxxbvKGbzBT7nwLUQCFgLcaxV2kQo-YnB4D_6OVnLKVxys-XodKnzF54cHoKqAYwkdoLqUiDqOrX-EQvO1XOhW2OHvgEwEjdqX11dg3dt3qHtn7H3PG5jo9owb26bCqmqEt0T7eEQQ',
        bgColor: '#000000',
        bgOpacity: 0.6,
        bgRemoved: false,
        elements: [
          {
            id: 'e-1-1-1',
            type: 'text',
            content: 'NEON TOKYO',
            x: 15,
            y: 15,
            fontSize: 14,
            color: '#ffdca1',
            fontWeight: '600',
            opacity: 1
          }
        ]
      },
      {
        id: 's-1-2',
        slideNumber: '02',
        title: 'High Contrast',
        subtitle: 'Using dark backgrounds to emphasize primary subjects.',
        bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxcTGiRcfpQvg88S9ZytNlWYzYG7oPzmMp4t-ECU0V9wT0FB2vRnRE1sasUR80ywYZoRt4a7vBhPMeROmWXbD8P6ppRnXvk-qcelZTK1w8wPJgyhzrBbi3jKjZ1eETMO8MsWqyYr3Ra5Iao3JKZQoGoFyX2u0IwW0kAlCie6GFzAJuvnzJAG8wyM-Y4PUH2iAg1vpkK1HdmNGZaEC1B38eTy-GF0WvsNjbPJNdw8c8cZlfgAJnXGaEEg',
        bgColor: '#121212',
        bgOpacity: 0.5,
        bgRemoved: false,
        elements: []
      }
    ]
  },
  {
    id: 'temp-2',
    name: 'Solitude Vibe',
    slidesCount: 8,
    views: '8.5k',
    isPro: false,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2FoHtadJR-DnFHCpdq_odBySjCQF45Ony7dy1I5que52k7-gYXC3IFJEqldWWvKpXLXB3nloD7tgVHaLs6COp5fpIbdbmHSrQNXwy4W50rAOkWg_TALTKbiiQTskixm6Pmgo9JSQHsJXRAUZzI_4AnicQtGYkOUtAGfSzewsUvbGOBiSeFObW64hzNeJKoVyR8HXsZAmB3NSvctHYP_efTwwix-9MAajANt_qUbBE7vS7TxGUgnU7zw',
    aesthetic: 'Minimal',
    slides: [
      {
        id: 's-2-1',
        slideNumber: '01',
        title: 'Solitude Vibe',
        subtitle: 'Finding visual peace in architectural alignment.',
        bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2FoHtadJR-DnFHCpdq_odBySjCQF45Ony7dy1I5que52k7-gYXC3IFJEqldWWvKpXLXB3nloD7tgVHaLs6COp5fpIbdbmHSrQNXwy4W50rAOkWg_TALTKbiiQTskixm6Pmgo9JSQHsJXRAUZzI_4AnicQtGYkOUtAGfSzewsUvbGOBiSeFObW64hzNeJKoVyR8HXsZAmB3NSvctHYP_efTwwix-9MAajANt_qUbBE7vS7TxGUgnU7zw',
        bgColor: '#0A0A0A',
        bgOpacity: 0.7,
        bgRemoved: false,
        elements: []
      }
    ]
  },
  {
    id: 'temp-3',
    name: 'Desert Road',
    slidesCount: 10,
    views: '12.1k',
    isPro: false,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYWELSBhxaK3fNz-q8XMvcwHHpFXLzWF4aOWytZeY9qOvIskmQEqAFtpjUU3lHyEtj0_HlVNt2qsNxfUt7k_Y46tGYvQo0qNTSFm7g0Rut3yWAMP4OLapHCCJWvgzKR8xbkqQUH91TIdAi4XDKTqVKOR5BN0fmJQ9ER9IKgpjq3DmGbLtbd8-ka2nt4Q2EAaa41gfN61zI040F42-2rVSW_9TXUhfqkTDoP3mqcEQXeyma_H07HUToTA',
    aesthetic: 'Gradient',
    slides: [
      {
        id: 's-3-1',
        slideNumber: '01',
        title: 'Desert Road',
        subtitle: 'The journey to editorial excellence.',
        bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYWELSBhxaK3fNz-q8XMvcwHHpFXLzWF4aOWytZeY9qOvIskmQEqAFtpjUU3lHyEtj0_HlVNt2qsNxfUt7k_Y46tGYvQo0qNTSFm7g0Rut3yWAMP4OLapHCCJWvgzKR8xbkqQUH91TIdAi4XDKTqVKOR5BN0fmJQ9ER9IKgpjq3DmGbLtbd8-ka2nt4Q2EAaa41gfN61zI040F42-2rVSW_9TXUhfqkTDoP3mqcEQXeyma_H07HUToTA',
        bgColor: '#131313',
        bgOpacity: 0.6,
        bgRemoved: false,
        elements: []
      }
    ]
  },
  {
    id: 'temp-4',
    name: 'Typography Pro',
    slidesCount: 6,
    views: '5.2k',
    isPro: false,
    coverImage: 'https://images.unsplash.com/photo-1548345680-f5475ea5df84?q=80&w=600&auto=format&fit=crop', // fallback typography
    aesthetic: 'Bold',
    slides: [
      {
        id: 's-4-1',
        slideNumber: '01',
        title: 'BOLD',
        subtitle: 'MINIMALIST TYPOGRAPHY',
        bgImage: '',
        bgColor: '#1c1b1b',
        bgOpacity: 1,
        bgRemoved: false,
        elements: []
      }
    ]
  },
  {
    id: 'temp-5',
    name: 'Liquid Glass',
    slidesCount: 15,
    views: '22.4k',
    isPro: true,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuaW4UcWsw_d6Oo9QpkHq36U12GiWMKdxJtTlYz6oo6I-j6xo6VxxGIFvxvMowcVSMtPoQHl72uv9aXAlrPnvochQrgQInu1UmYMdg4SUGWB88wMl_b-TsYVhw7mwzPHjIk9_aY4745tCCYbwhjRpmHtiuQ9IafxNfbXEFuvhPrMbRQSZMjMUwXfnPJwXV8Swgju-rsdfXpQ1ATCLO4b_pLql2MwqXrQjlrcTYoiFeAybQQ8W095-coQ',
    aesthetic: 'Gradient',
    slides: [
      {
        id: 's-5-1',
        slideNumber: '01',
        title: 'Liquid Glass',
        subtitle: 'Dynamic structures for contemporary designs.',
        bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuaW4UcWsw_d6Oo9QpkHq36U12GiWMKdxJtTlYz6oo6I-j6xo6VxxGIFvxvMowcVSMtPoQHl72uv9aXAlrPnvochQrgQInu1UmYMdg4SUGWB88wMl_b-TsYVhw7mwzPHjIk9_aY4745tCCYbwhjRpmHtiuQ9IafxNfbXEFuvhPrMbRQSZMjMUwXfnPJwXV8Swgju-rsdfXpQ1ATCLO4b_pLql2MwqXrQjlrcTYoiFeAybQQ8W095-coQ',
        bgColor: '#0e0e0e',
        bgOpacity: 0.5,
        bgRemoved: false,
        elements: []
      }
    ]
  },
  {
    id: 'temp-6',
    name: 'Alpine Luxe',
    slidesCount: 10,
    views: '9.8k',
    isPro: true,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhnvnabc4hDh64u2WM_EHjBsO7A1i2cd_ctGdr6X3yhQYhCj82AvX_ljeKp7fdZ88g0XYsWzeDdtnalLTQ7-46M-k0R-Jef3EbSzGlDtg7gULHNfEhW4ZTOzj5fPKYLlt6-c-y_uZU5jQiguEGiERZyvoEVyZooeA4XGucEOukxPgky_jwHCUixZz32wSHkKjLwHzRiUXvS2onC2hm3iQOkJpsVOD_1rlAoKIjUJu-Vzqx-61lQ7vOLw',
    aesthetic: 'Corporate',
    slides: [
      {
        id: 's-6-1',
        slideNumber: '01',
        title: 'Alpine Luxe',
        subtitle: 'High-altitude luxury brand layout presets.',
        bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhnvnabc4hDh64u2WM_EHjBsO7A1i2cd_ctGdr6X3yhQYhCj82AvX_ljeKp7fdZ88g0XYsWzeDdtnalLTQ7-46M-k0R-Jef3EbSzGlDtg7gULHNfEhW4ZTOzj5fPKYLlt6-c-y_uZU5jQiguEGiERZyvoEVyZooeA4XGucEOukxPgky_jwHCUixZz32wSHkKjLwHzRiUXvS2onC2hm3iQOkJpsVOD_1rlAoKIjUJu-Vzqx-61lQ7vOLw',
        bgColor: '#131313',
        bgOpacity: 0.6,
        bgRemoved: false,
        elements: []
      }
    ]
  }
];

// Seed carousel (loaded when opening editor for the first time or creating new)
export const DEFAULT_CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 'slide-1',
    slideNumber: '01',
    title: 'Master the\nDark Mode',
    subtitle: 'Professional strategies for high-end digital craftsmanship.',
    bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxcTGiRcfpQvg88S9ZytNlWYzYG7oPzmMp4t-ECU0V9wT0FB2vRnRE1sasUR80ywYZoRt4a7vBhPMeROmWXbD8P6ppRnXvk-qcelZTK1w8wPJgyhzrBbi3jKjZ1eETMO8MsWqyYr3Ra5Iao3JKZQoGoFyX2u0IwW0kAlCie6GFzAJuvnzJAG8wyM-Y4PUH2iAg1vpkK1HdmNGZaEC1B38eTy-GF0WvsNjbPJNdw8c8cZlfgAJnXGaEEg',
    bgColor: '#000000',
    bgOpacity: 0.6,
    bgRemoved: false,
    bgRemovedImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB7cv0sTv6EB6SVjKMqXhrLr1yfu2dAO5LcYDZbGXaSBqsICFvc1C7A3YqKz7If5fGzSDrE0eR7BR7Vou9Im2871kuN-emZfNzM-9roDmqK3RCfKGvPY0OYcPWLiPjBf87fTdZOr7NraPMSWhgwkfRBnx6eOhut1E4PZ4j7oAunLtgn3vpDJhiiPwhbc-0YWUpDCSn6_iEo49l4MDgxcX1-iXUipWirIvQbIGQ3iYommecgso-dpPzAA',
    elements: []
  },
  {
    id: 'slide-2',
    slideNumber: '02',
    title: 'Precision is\nthe Key',
    subtitle: 'Every pixel counts when you\'re building for authority.',
    bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnMsJ-E7mkr9LEc6Fce6LfYPhRJoQS41teVjamI23zzINXzlem-_aJVJnvOML1yxpwkaZEWW6rTPlBDloKPJDOjE0ElY6rUy9GdqjYllMVNUPnG4ooi-BDqk0NOOw9r-AdIZ11YB9wXgjJOHTgDz326YZjMg_lmbMnSAII_oi08LLOPUoUThHEYvtQKXHTOz84fcl2MQM6dBxb8xzNXXMtbH2uC3L-jWX8tNzjXAL81gxjXiJoh_jKTg',
    bgColor: '#000000',
    bgOpacity: 0.4,
    bgRemoved: false,
    elements: []
  },
  {
    id: 'slide-3',
    slideNumber: '03',
    title: 'One-Click\nExport',
    subtitle: 'Optimized for all social platforms. Perfectly sliced, ready to dominate.',
    bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuaW4UcWsw_d6Oo9QpkHq36U12GiWMKdxJtTlYz6oo6I-j6xo6VxxGIFvxvMowcVSMtPoQHl72uv9aXAlrPnvochQrgQInu1UmYMdg4SUGWB88wMl_b-TsYVhw7mwzPHjIk9_aY4745tCCYbwhjRpmHtiuQ9IafxNfbXEFuvhPrMbRQSZMjMUwXfnPJwXV8Swgju-rsdfXpQ1ATCLO4b_pLql2MwqXrQjlrcTYoiFeAybQQ8W095-coQ',
    bgColor: '#000000',
    bgOpacity: 0.5,
    bgRemoved: false,
    elements: []
  }
];

export const DEMO_PREVIEW_SLIDES = [
  {
    id: 'ps-1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHalm3ubWqZ9zESufLSizjFLmc23kC6UhZQUdsmHYDsDxyG5ASUjGnz0ocAMA0f0VH60BTBXG5h3uKKknEqZg3z-XAl2p57qeBvxCSwqyYlQ6JcMlCSgOCCtOEnY5O5tOHCpRXJdUtaZ5V2g47hbmcQh4BLEJmBL_djwGvsbZjzjO-n6F2EWMhxEwQUDFBqTFhgogZ8-NeUHxRIGKHDzRhkjzvPsplOmsq8-RNLNbfzdBj2RnmESFjVA',
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYqtyCSNjRGciAc9Ek6nZb_ZCp4-t9BsoXUrrOYzCFz71ffn0_A-s8nuV1Q1WY9gIIkKTtofOkTqGWu02VzKJX5oG0dW4R1yqUKT0Mo112K6vfz06jPdk9I12yCcMhnSPhIJ79Jz5xN5y51KyiLp5BInEnEKA1XqtmtEKMFILPnSkrcxhJubl3CTj_dpsmTiIm5ETcNBGRK4zqt8AD-C0Vc5GQfP0_rKeKJPRxL8mtAVKo-H5zN7DyPA',
    title: 'THE FUTURE OF CAROUSELS'
  },
  {
    id: 'ps-2',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5Tgv5_J4YroyOrbKBD_YzvM0AS9CBEKi96v29ji0VdtG72qSACTkY1EvQfoJloUibfKUhY7oQz_kSi_Aqg105ajh9z1vg20WR3RvPbgOXOuOFJSRIXQM1YbROLTSIqK-rEnYo2bsrV5jQPYSVvUfXt-6tM-QYauCAs6jQ2NrDxnedcmfM3dks4zy359UTnD-5T1lKmdJLFAX5ZasU2omjsNvHWoeItk23VWvyd8cnR2tRpy_nD7RplQ',
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfX5YsN8udCrtaNCY1UOVOvo9wJaZM6F2KZb26sLQf5UCIY4xHNvcBGi_CxJ8lpqup22CjcHIMfNx0GZa2v64C1jh_IU77hQG-z6z3eHLXPvFD1IqXZ8kdYDdY6BQNtSlcPZtHvrH0mD4R60HaMJYizOEjFIiLj8yHMUVKKrAa93N4DMoB1NESlPuviJ9PiT_0FiEngERCN2gZhBlXROTXCVtbIfTMrr6Uimn1JGyQ4MQmtsP9OKoW1A',
    title: 'SMOOTH TRANSITIONS'
  },
  {
    id: 'ps-3',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXu3WnfvGlaWfTu9adtcsMrqPmZTaRkcdhXBavPl1tTc5cOI0T4nYJiuz0dCZFzoW1Nt_DghfVMvWJYnlQmCzzoeb9I9u4PeSYd9DEdTDvATxmCvVZ6_ZHVE4BCsuXx3D8xyRmf9ru8hrx99tqS9ZC3wPr5teTYmNEuahc_c7qWK9WiVrL2PvUbGSXwWVEDbkFHi8KmkfQYTpZ-4RiR4CPqsLA_9buSA9DzC15Cm3zuuW3WRIo59ayY_CQ',
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1Z9Mq7v71MWSgk1-aNXxdoLV6hhOPuXUrs3FRgKuCvhJx0LoVeADttwg5-vd-F2aHzsc9zZdLfc43h_iyKoegRAm_uiBcyMyi-aoQdxQc67mmzGYPTZsba5v-8tXilN0LuYxvsZ-0Jr_VLsl0LXwjeC34Pw3B6S01rYamr34VJL9gcZXUuSJomUzTi1Wtw9c9aJJSfRaX1izeb3B5au5c3GmVTR8og5hqHSRRumU6S4aOOoh1gAW8tw',
    title: 'HIGH SOCIAL ENGAGEMENT'
  }
];
