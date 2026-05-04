import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractYouTubeVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url)

    if (parsedUrl.hostname === 'youtu.be') {
      return parsedUrl.pathname.slice(1) || null
    }

    if (parsedUrl.hostname.includes('youtube.com')) {
      const videoIdFromQuery = parsedUrl.searchParams.get('v')
      if (videoIdFromQuery) return videoIdFromQuery

      const pathSegments = parsedUrl.pathname.split('/').filter(Boolean)
      const supportedPrefixes = ['embed', 'shorts']
      if (pathSegments.length >= 2 && supportedPrefixes.includes(pathSegments[0])) {
        return pathSegments[1]
      }
    }

    return null
  } catch {
    return null
  }
}

export function getYouTubeThumbnailUrl(url: string): string {
  const videoId = extractYouTubeVideoId(url)
  if (!videoId) {
    return 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop'
  }

  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}

export function getYouTubeEmbedUrl(url: string): string | null {
  const videoId = extractYouTubeVideoId(url)
  if (!videoId) return null

  return `https://www.youtube.com/embed/${videoId}`
}
