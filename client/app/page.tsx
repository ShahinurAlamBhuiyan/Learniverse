'use client'
import Heading from '@/app/utils/Heading'
import React, { FC, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Route/Hero'

interface Props { }

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Heading
        title="Learniverse"
        description="Learniverse is a platform for students to learn and get help from teachers."
        keywords='Programming, MERN, Redux, Development, Machine Learning'
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <Hero />
    </div>
  )
}

export default Page