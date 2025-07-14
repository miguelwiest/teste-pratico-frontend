import React from 'react';
import logo from '../../../assets/Logo.svg';
import * as G from '../../styles/global.ts'
import {Outlet} from "react-router";

export const Sidebar: React.FC = () => {
    return (
        <main style={{height: '100%'}}>
            <G.Card
                padding="16px 24px"
                borderRadius="0"
            >
                <img src={logo} alt="logo__icon" height={34} width={91}/>
            </G.Card>
            <Outlet/>
        </main>
    );
}