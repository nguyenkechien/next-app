import type { NextPage } from "next";

const UserDetail: NextPage = ({ ...props }) => {
  console.log(props);
  return (
    <div >

    </div>
  )
}

export async function getServerSideProps(ctx: any) {
  console.log(`server`, ctx.query);
  return { props: { ...ctx.query } }
}

export default UserDetail;