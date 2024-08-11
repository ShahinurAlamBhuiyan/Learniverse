'use client'
import Heading from '@/utils/Heading'
import React, { FC, useState } from 'react'

interface Props { }

const Page: FC<Props> = (props) => {
  return (
    <div>
      <Heading
        title="Learniverse"
        description="Learniverse is a platform for students to learn and get help from teachers."
        keywords='Programming, MERN, Redux, Development, Machine Learning'
      />
    </div>
  )
}

export default Page