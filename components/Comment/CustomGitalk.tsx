import type Gitalk from 'gitalk';
// @ts-expect-error no-type
import type GitalkComponentType from 'gitalk/dist/gitalk-component';

const GitalkComponent = require('gitalk/dist/gitalk-component') as typeof GitalkComponentType;

type Props = {
  options: Gitalk.GitalkOptions;
};

const CustomGitalk: React.VFC<Props> = (props) => <GitalkComponent {...props} />;

export default CustomGitalk;
