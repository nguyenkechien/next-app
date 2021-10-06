import type { NextPage } from 'next';

interface Props {
  username?: string;
}

const UserDetail: NextPage<Props> = () => {
  return <div>abc</div>;
};

export async function getServerSideProps(ctx: any) {
  console.log(`server`, ctx.query);
  return { props: { ...ctx.query } };
}

export default UserDetail;
