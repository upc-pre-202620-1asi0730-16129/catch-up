const logoApiUrl = import.meta.env.VITE_LOGO_API_URL;
const apiKey = import.meta.env.VITE_LOGO_PUBLISHABLE_API_KEY;

/**
 * Infrastructure helper for building Logo.dev image URLs.
 *
 * @remarks
 * Encapsulates the logic for constructing URLs to retrieve source logos
 * from the Logo.dev external service.
 */
export class LogoDevApi {
    /**
     * Constructs a logo URL based on the news source's website host.
     *
     * @param {{url: import('@/shared/domain/model/url.js').Url}} source - An object containing the website URL of the source.
     * @returns {string} The fully qualified URL to the source's logo image.
     */
    getUrlToLogo = source => `${logoApiUrl}/${new URL(source.url.toString()).host}?token=${apiKey}`;
}