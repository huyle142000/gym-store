
import LayoutsAdmin from '@/components/admin/LayoutsAdmin'
// import { useTranslation } from '@/utils/i18next'
import { Box } from '@mui/material'
import React from 'react'

type Props = {}

const AdminPage = async ({ params: { lang } }: any) => {
  return (
    <Box>
      <LayoutsAdmin  />
    </Box>
  )
}

export default AdminPage