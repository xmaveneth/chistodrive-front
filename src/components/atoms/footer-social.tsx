type FooterSocialProps = {
    html: string | TrustedHTML;
    url: string;
};
export default function FooterSocial({ html, url }: FooterSocialProps) {
    return (
        <a
            href={url}
            target="_blank"
            className="flex items-center justify-center border shrink-0 size-8 rounded-full border-white/20 transition-colors duration-200 ease-in hover:bg-btn-bg/20"
            dangerouslySetInnerHTML={{ __html: html }}
        ></a>
    );
}
