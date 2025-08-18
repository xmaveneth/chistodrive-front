import Navbar from '../molecules/home/navbar';

type PolicyLayoutProps = {
    heading: string;
    sections: TextSectionProps[];
};

export default function PolicyLayout({ heading, sections }: PolicyLayoutProps) {
    return (
        <section className="primary-px primary-py">
            <Navbar className="bg-white/10 mb-5 md:mb-9 lg:mb-12" />

            <header className="border border-white/30 rounded-lg py-5.5 md:py-11">
                <h1
                    className="font-rockstar text-center text-balance text-2xl md:text-4xl lg:max-w-8/10 lg:mx-auto"
                    dangerouslySetInnerHTML={{ __html: heading }}
                ></h1>
            </header>

            <article className="my-6 md:my-8 lg:my-12 space-y-6 md:space-y-8">
                {sections.map((section, idx) => (
                    <TextSection
                        key={`section-${idx}`}
                        title={section.title}
                        paragraphs={section.paragraphs}
                    />
                ))}
            </article>
        </section>
    );
}

type TextSectionProps = {
    title: string;
    paragraphs: string[];
};

export function TextSection({ title, paragraphs }: TextSectionProps) {
    return (
        <div className="text-sm text-white/70">
            <h2 className="text-xl mb-3 text-white">{title}</h2>

            {paragraphs.map((p, idx) => (
                <p key={`paragraph-${idx}`}>{p}</p>
            ))}
        </div>
    );
}
