'use client'

import { Label } from '@repo/design-system/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@repo/design-system/components/ui/select'
import { languages } from '@repo/internationalization'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

export const LanguageSwitcher = () => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  const switchLanguage = (locale: string) => {
    const defaultLocale = 'en'
    let newPathname = pathname

    // Case 1: If current locale is default and missing from the URL
    if (
      !pathname.startsWith(`/${params.locale}`) &&
      params.locale === defaultLocale
    ) {
      // Add the default locale to the beginning to normalize
      newPathname = `/${params.locale}${pathname}`
    }

    // Replace current locale with the selected one
    newPathname = newPathname.replace(`/${params.locale}`, `/${locale}`)
    console.log(newPathname)

    router.push(newPathname)
  }

  const [selectedLanguage, setSelectedLanguage] = useState(
    (params.locale as string) || 'en'
  )

  const handleSelectChange = (value: string) => {
    setSelectedLanguage(value)
    switchLanguage(value)
  }

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="language-selector" className="sr-only">
        Language
      </Label>
      <Select value={selectedLanguage} onValueChange={handleSelectChange}>
        <SelectTrigger
          id="language-selector"
          className="justify-start *:data-[slot=select-value]:w-12"
        >
          <span className="text-muted-foreground hidden sm:block">
            Select a language:
          </span>
          <span className="text-muted-foreground block sm:hidden">
            Language
          </span>
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectGroup>
            <SelectLabel>Default</SelectLabel>
            {languages.map((language) => (
              <SelectItem key={language.label} value={language.value}>
                {`${language.icon} ${language.label} (${language.locale})`}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
