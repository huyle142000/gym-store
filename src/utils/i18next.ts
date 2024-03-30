// export const fallbackLng = 'vi'
// export const languages = [fallbackLng, 'en']
// export const defaultNS = 'translation'
// export const cookieName = 'i18next'

// export function getOptions(lng = fallbackLng, ns = defaultNS) {
//     return {
//         // debug: true,
//         supportedLngs: languages,
//         fallbackLng,
//         lng,
//         fallbackNS: defaultNS,
//         defaultNS,
//         ns
//     }
// }

// import { createInstance } from 'i18next'
// import resourcesToBackend from 'i18next-resources-to-backend'
// import { initReactI18next } from 'react-i18next/initReactI18next'

// const initI18next = async (lng: string | undefined, ns: string | undefined) => {
//     const i18nInstance = createInstance()
//     await i18nInstance
//         .use(initReactI18next)
//         .use(resourcesToBackend((language: any, namespace: any) => {
//             return import(`../../public/dictionaries/${language}/${namespace}.json`)
//         }))
//         .init(getOptions(lng, ns))
//     return i18nInstance
// }

// export async function useTranslation(lng: any, ns?: any, options: any = {}) {
//     const i18nextInstance = await initI18next(lng, ns)
//     return {
//         t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options?.keyPrefix),
//         i18n: i18nextInstance
//     }
// }