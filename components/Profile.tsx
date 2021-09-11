import Layout from '@/layouts/layout'

type Props = Omit<React.ComponentProps<typeof Layout>, 'fullWidth'>

const Profile: React.VFC<Props> = ({ post, blockMap, emailHash }) => {
  return (
    <div>
      <Layout
        blockMap={blockMap}
        post={post}
        emailHash={emailHash}
        fullWidth={false}
        onlyContents
      />
      <hr className="border-gray-200 dark:border-gray-600 mb-8 w-2/5" />
    </div>
  )
}

export default Profile
