import type { LessonContent } from "@/data/nova-college";

type Props = {
  content: LessonContent;
  title: string;
};

export function CollegeLessonContent({ content, title }: Props) {
  return (
    <article className="space-y-8">
      {content.sections.map((section, index) => (
        <div key={section.heading}>
          <section className="nova-glass-card p-6">
            <h2 className="text-lg font-bold text-white">{section.heading}</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-nova-cyan-light/90">
              {section.body}
            </p>
          </section>
          {content.visuals?.map(
            (visual) =>
              visual.afterSection === index && (
                <div
                  key={`${visual.type}-${visual.title}`}
                  className="mt-4 rounded-xl border border-nova-cyan/20 bg-nova-cyan/5 p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-nova-cyan">
                    {visual.title ?? "Visual de apoyo"}
                  </p>
                  {visual.caption && (
                    <p className="mt-2 text-sm text-nova-cyan-light/70">{visual.caption}</p>
                  )}
                  <p className="mt-2 font-mono text-[10px] text-white/40">{visual.type}</p>
                </div>
              ),
          )}
        </div>
      ))}

      <section className="nova-glass-island border-nova-cyan/20 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-nova-cyan">
          Resumen
        </h2>
        <p className="mt-3 text-sm text-nova-cyan-light/90">{content.summary}</p>
      </section>

      <section className="nova-glass-island border-nova-orange/20 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-nova-orange">
          Empleabilidad
        </h2>
        <p className="mt-3 text-sm text-nova-cyan-light/90">{content.careerInsight}</p>
      </section>

      {content.glossary.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-bold text-white">Glosario — {title}</h2>
          <dl className="grid gap-3 sm:grid-cols-2">
            {content.glossary.map((term) => (
              <div key={term.term} className="nova-glass-card p-4">
                <dt className="font-semibold text-nova-cyan-light">{term.term}</dt>
                <dd className="mt-1 text-sm text-nova-cyan-light/75">{term.definition}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {content.references.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-bold text-white">Referencias</h2>
          <ul className="space-y-2">
            {content.references.map((ref) => (
              <li key={ref.url}>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-nova-cyan hover:underline"
                >
                  {ref.title}
                  {ref.author ? ` — ${ref.author}` : ""} ↗
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
