// React
import React from 'react';
import {Outlet} from "react-router";

// Global Styles
import * as G from '../../styles/global.ts'

// Icons
import logo from '../../../assets/Logo.svg';

export const Sidebar: React.FC = () => {
    return (
        <main style={{height: '100%'}}>
            <G.Card
                $padding="16px 24px"
                $borderRadius="0"
            >
                <img src={logo} alt="logo__icon" height={34} width={91}/>
            </G.Card>
            <Outlet/>
        </main>
    );
}