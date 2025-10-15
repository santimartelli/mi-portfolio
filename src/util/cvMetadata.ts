export type CvLocale = 'es' | 'en';

const CV_METADATA = {
  es: {
    fileName: 'Santiago_Martelli_CV_Esp.pdf',
    sizeBytes: 54175,
    lastUpdate: 'Oct 2025',
  },
  en: {
    fileName: 'Santiago_Martelli_CV_Eng.pdf',
    sizeBytes: 60397,
    lastUpdate: 'Oct 2025',
  },
} as const satisfies Record<CvLocale, { fileName: string; sizeBytes: number; lastUpdate: string }>;

const formatFileSize = (bytes: number): string => {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const k = 1024;
  const unitIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), units.length - 1);
  const value = bytes / Math.pow(k, unitIndex);
  const decimals = value < 100 && unitIndex > 0 ? 1 : 0;
  const formatted = decimals > 0 ? value.toFixed(decimals) : value.toFixed(0);
  return `${parseFloat(formatted)} ${units[unitIndex]}`;
};

const buildPublicPath = (fileName: string): string => {
  const base = import.meta.env.BASE_URL ?? '/';
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const normalizedPath = fileName.startsWith('/') ? fileName.slice(1) : fileName;
  return `${normalizedBase}/${normalizedPath}`;
};

export const getCvMetadata = (locale: CvLocale) => {
  const meta = CV_METADATA[locale];
  return {
    locale,
    href: buildPublicPath(meta.fileName),
    downloadName: meta.fileName,
    size: formatFileSize(meta.sizeBytes),
    lastUpdate: meta.lastUpdate,
  };
};

export const getOrderedCvMetadata = (locale: CvLocale) => {
  const order: CvLocale[] = locale === 'es' ? ['es', 'en'] : ['en', 'es'];
  return order.map((key) => getCvMetadata(key));
};
