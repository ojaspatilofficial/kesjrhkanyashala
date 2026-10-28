
import SectionTitle from '../components/shared/SectionTitle';

interface GenericPageProps {
  title: string;
  subtitle: string;
  content?: React.ReactNode;
}

const GenericPage: React.FC<GenericPageProps> = ({ title, subtitle, content }) => {
  return (
    <div className="section-padding min-h-[70vh]">
      <div className="container-custom">
        <SectionTitle title={title} subtitle={subtitle} />
        <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12 border border-slate-100">
          {content || (
            <div className="text-center py-20 text-slate-500">
              <div className="inline-block p-4 rounded-full bg-slate-50 mb-4">
                <svg className="w-12 h-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-serif text-slate-600 mb-2">Content Being Updated</h3>
              <p>This section is currently being updated for the new academic year.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenericPage;
