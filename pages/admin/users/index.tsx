import { GetServerSideProps } from 'next'
import { Layout } from '../../../components/layout/Layout'
import { NextPageWithLayout } from '../../../interfaces/layout'
import { ParentActions } from '../../../components/ParentActions/ParentActions'
import { user } from '@prisma/client'
import { ReactElement } from 'react'
import { getSession } from 'next-auth/react'
import { db } from '../../../db'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const users = await db.user.findMany({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      identification_number: true,
      avatar_image: true,
      role_id: true,
      status: true,
    },
  })

  const parents = users.filter((user) => user.role_id !== '2')

  return {
    props: {
      users: parents,
    },
  }
}

const List: NextPageWithLayout<{ users: user[] }> = ({ users }) => {
  return (
    <section>
      <h2 className="dark:text-gray-300 font-bold text-lg md:text-[25px] mb-5 md:mb-[37px]">
        Apoderado
      </h2>
      <ul>
        {users.map((user) => (
          <ParentActions key={user.id} user={user} />
        ))}
      </ul>
    </section>
  )
}

export default List

List.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="Apoderados" headTitle="Apoderados">
      {page}
    </Layout>
  )
}
