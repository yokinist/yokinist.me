import { useEffect } from 'react';
import BLOG from '~/blog.config';

type Props = {
  issueTerm?: string;
  layout?: 'fullWidth';
};

const Utterances: React.VFC<Props> = ({ issueTerm, layout }) => {
  useEffect(() => {
    const theme = BLOG.appearance === 'light' ? 'github-light' : 'github-dark';
    const script = document.createElement('script');
    const anchor = document.getElementById('comments');
    script.setAttribute('src', 'https://utteranc.es/client.js');
    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute('async', 'true');
    script.setAttribute('repo', BLOG.comment.utterancesConfig.repo);
    issueTerm && script.setAttribute('issue-term', issueTerm);
    script.setAttribute('theme', theme);
    anchor?.appendChild(script);
    return () => {
      if (anchor?.innerHTML) anchor.innerHTML = '';
    };
  });
  return (
    <>
      <div id="comments" className={layout && layout === 'fullWidth' ? '' : 'md:-ml-16'}>
        <div className="utterances-frame"></div>
      </div>
    </>
  );
};

export default Utterances;
