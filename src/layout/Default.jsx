import React from 'react'
import styled from 'styled-components'
import Sidebar from '../components/SideBar'

const Default = ({ children }) => {
    return (
        <>
            <DefaultLayoutWrapper>
                <Sidebar />
                {children}
            </DefaultLayoutWrapper>
        </>
    )
}

export default Default

const DefaultLayoutWrapper = styled.section`
    width: 100vw;
    height: 100vh;
    display: flex;
`