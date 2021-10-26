import 'gitalk/dist/gitalk.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import type { ReactCusdis as ReactCusdisType } from 'react-cusdis';
import BLOG from '~/blog.config';
import { fetchCusdisLang } from '~/lib/i18n/cusdisLang';
import { Post } from '~/types';

const GitalkComponent = dynamic(
  () => {
    return import('~/components/Comment/CustomGitalk');
  },
  { ssr: false },
);

const UtterancesComponent = dynamic(
  () => {
    return import('~/components/Comment/Utterances');
  },
  { ssr: false },
);

const CusdisComponent = dynamic(
  () => {
    return import('react-cusdis').then((m) => m.ReactCusdis);
  },
  { ssr: false },
) as typeof ReactCusdisType;

type Props = {
  post: Post;
};

export const Comments: React.VFC<Props> = ({ post }) => {
  const router = useRouter();
  return (
    <div>
      {BLOG.comment && BLOG.comment.provider === 'gitalk' && (
        <GitalkComponent
          options={{
            id: post.id,
            title: post.title,
            clientID: BLOG.comment.gitalkConfig.clientID,
            clientSecret: BLOG.comment.gitalkConfig.clientSecret,
            repo: BLOG.comment.gitalkConfig.repo,
            owner: BLOG.comment.gitalkConfig.owner,
            admin: BLOG.comment.gitalkConfig.admin,
            distractionFreeMode: BLOG.comment.gitalkConfig.distractionFreeMode,
          }}
        />
      )}
      {BLOG.comment && BLOG.comment.provider === 'utterances' && <UtterancesComponent issueTerm={post.id} />}
      {BLOG.comment && BLOG.comment.provider === 'cusdis' && (
        <CusdisComponent
          lang={fetchCusdisLang() ?? 'en'}
          attrs={{
            host: BLOG.comment.cusdisConfig.host,
            appId: BLOG.comment.cusdisConfig.appId,
            pageId: post.id,
            pageTitle: post.title,
            pageUrl: BLOG.link + router.asPath,
            theme: BLOG.appearance,
          }}
        />
      )}
    </div>
  );
};
