"use client"

import Image from 'next/image';
import { memo } from "react";
import { NavbarProps } from "../../types/type";

import ActiveUser from './Users/ActiveUser';

import React from 'react'

export const Navbar = ({ activeElement }: NavbarProps) => {
    return (
        <nav className='flex select-none items-center justify-between gap-4 bg-primary-black px-2 text-white'>
            <Image src="/assets/logo.svg" alt="FigPro Logo" width={58} height={20} />
            <ActiveUser />
        </nav>
    )
}


export default memo(Navbar, (prevProps, nextProps) =>
    prevProps.activeElement === nextProps.activeElement)
